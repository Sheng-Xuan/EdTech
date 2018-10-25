import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Image } from '../entity/Image';
import { Tool } from '../entity/Tool';
import { UserTokenData } from '../model/userTokenData';
import * as fs from 'fs';
import { Review } from '../entity/Review';
import * as uuid from 'uuid/v1';

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
      'author.username'
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
      author: review.author
    });
  }
}
