import { Request, Response } from 'express-serve-static-core';
import { getRepository, getManager } from 'typeorm';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { Tool } from '../entity/Tool';
import { UserTokenData } from '../model/userTokenData';
import * as fs from 'fs';
import { Review } from '../entity/Review';
import * as uuid from 'uuid/v1';
import { ReviewVisit } from '../entity/ReviewVisit';

/**
 * @apiDefine Review
 * Review related calls.
 */

/**
 * @api {POST} /v1/review/create/:toolId Create a review under Tool:toolId
 * @apiGroup Review
 * @apiParam {string} title title of the review
 * @apiParam {string} content content of the review in html
 * @apiParam {string[]} images array of image names contained in the review
 * @apiSuccess {number} reviewId created review's id
 * @apiError (400) {json} error
 */
export async function publishReview(request: Request, response: Response) {
  const userRepository = getRepository(User);
  const imageRepository = getRepository(Image);
  const toolRepository = getRepository(Tool);
  const reviewRepository = getRepository(Review);
  const userInfo: UserTokenData = response.locals.userInfo;
  let user = await userRepository.findOne({ userId: userInfo.id });
  if (!user) {
    response.status(400).json({ error: 'Invalid user, please re-login' });
    return;
  }
  const toolId = request.params.toolId;
  // Check if tool exists
  let tool = await toolRepository.findOne({ toolId: toolId });
  if (!tool) {
    response.status(400).json({ error: 'Tool not found, please check' });
    return;
  }
  const title = request.body.title;
  const content = request.body.content;
  const pureText = request.body.pureText;
  // Save content as html file on disk
  const fileName = 'review-' + uuid() + '.html';
  try {
    fs.appendFileSync(process.cwd() + '/uploads/reviews/' + fileName, content);
    console.log(fileName + 'created');
  } catch (err) {
    console.error(err);
    response.status(400).json({ error: 'Publish review failed' });
    return;
  }
  const imageNames = request.body.images;
  const review = new Review();
  let images: Image[] = [];
  // Add uploaded images to db
  for (let name of imageNames) {
    if (fs.existsSync(process.cwd() + '/uploads/images/' + name)) {
      const image = new Image();
      image.isTempFile = false;
      image.localFileName = name;
      image.uploader = user;
      await imageRepository.save(image);
      images.push(image);
    } else {
      console.log('image not found ' + name);
    }
  }
  review.title = title;
  review.fileName = fileName;
  review.author = user;
  review.tool = tool;
  review.images = images;
  review.sample = pureText;
  await reviewRepository
    .save(review)
    .then(review => {
      response.status(200).json({
        reviewId: review.reviewId
      });
    })
    .catch(err => {
      response.status(400).json({ error: 'Publish review failed' });
    });
  return;
}

/**
 * @api {GET} /v1/review/:reviewId Retrive a review with reviewId
 * @apiGroup Review
 * @apiParam {number} reviewId id of the review
 * @apiSuccess {json} html content of the review
 * @apiError (400) {json} error
 */
export async function getReviewById(request: Request, response: Response) {
  const reviewRepository = getRepository(Review);
  const reviewId = request.params.reviewId;
  let review = await reviewRepository
    .createQueryBuilder('review')
    .select([
      'review.fileName',
      'review.title',
      'review.createTime',
      'author.username',
      'review.visits'
    ])
    .innerJoin('review.author', 'author')
    .where({ reviewId: reviewId })
    .getOne();
  if (!review) {
    response.status(400).json({ error: 'review now found' });
    return;
  }
  let content;
  if (fs.existsSync(process.cwd() + '/uploads/reviews/' + review.fileName)) {
    const content = fs.readFileSync(
      process.cwd() + '/uploads/reviews/' + review.fileName,
      'utf8'
    );
    response.status(200).json({
      title: review.title,
      html: content,
      time: review.createTime,
      author: review.author,
      visits: review.visits
    });
  }
}

/**
 * @api {GET} /v1/reviews/:userId Retrive reviews written by a user
 * @apiGroup Review
 * @apiParam {number} userId id of the author
 * @apiSuccess {json} list of reviews info
 * @apiError (400) {json} error
 */
export async function getReviewsByUserId(request: Request, response: Response) {
  const userInfo: UserTokenData = response.locals.userInfo;
  if (!userInfo.id === request.params.userId) {
    response.status(401).json({ error: 'Unauthorized' });
  } else {
    let user = await getRepository(User).findOne({ userId: userInfo.id });
    const reviewRepository = getRepository(Review);
    if (!user) {
      response.status(401).json({ error: 'Author not found' });
    } else {
      let reviews = await reviewRepository.find({
        relations: ['tool'],
        select: ['reviewId', 'title', 'createTime'],
        where: { author: user }
      });
      response.status(200).json(reviews);
    }
  }
}

/**
 * @api {GET} /v1/reviews/new Retrieve new reviews
 * @apiGroup Review
 * @apiSuccess {json} list of reviews info
 * @apiError (400) {json} error
 */
export async function getNewReviews(request: Request, response: Response) {
  const reviewRepository = getRepository(Review);
  const reviews = await reviewRepository.createQueryBuilder('review')
  .take(10)
  .leftJoinAndSelect('review.images', 'images')
  .leftJoinAndSelect('review.tool', 'tool')
  .leftJoinAndSelect('tool.images', 'toolImage')
  .loadRelationCountAndMap('review.commentCount', 'review.comments')
  .orderBy('review.createTime', 'DESC')
  .getMany();
  response.status(200).json(reviews);
}

/**
 * @api {GET} /v1/reviews/flow/:offset Retrieve review flow
 * @apiGroup Review
 * @apiParam offset offset of data
 * @apiSuccess {json} list of reviews info
 * @apiError (400) {json} error
 */
export async function getReviewsFlow(request: Request, response: Response) {
  const offset = request.params.offset;
  const reviewRepository = getRepository(Review);
  const reviews = await reviewRepository.createQueryBuilder('review')
  .take(8)
  .leftJoinAndSelect('review.images', 'images')
  .leftJoinAndSelect('review.tool', 'tool')
  .leftJoinAndSelect('tool.images', 'toolImage')
  .loadRelationCountAndMap('review.commentCount', 'review.comments')
  .orderBy('review.visits', 'DESC')
  .skip(offset)
  .cache(10000)
  .getMany();
  response.status(200).json(reviews);
}

/**
 * @api {GET} /v1/reviews/visit/:reviewId Increment count for visit on a review
 * @apiGroup Review
 * @apiParam reviewId
 * @apiSuccess {json} list of reviews info
 * @apiError (400) {json} error
 */
export async function putReviewVisit(request: Request, response: Response) {
  const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  if (ip) {
    const reviewId = request.params.reviewId;
    const ip = request.ip.split(':').pop();
    const visitRepository = getRepository(ReviewVisit);
    const reviewRepository = getRepository(Review);
    const count = await visitRepository.count({
      where: [
        { visitorIP: ip, reviewId: reviewId}
      ]
    });
    // Each ip can increment view up to 5 times
    if (count < 5) {
      const visit = new ReviewVisit()
      visit.visitorIP = ip;
      visit.reviewId = reviewId;
      await visitRepository.save(visit);
      await reviewRepository.increment({reviewId: reviewId}, "visits", 1);
    }
  }
}