import { Request, Response } from 'express';
import { getRepository, Like, Equal } from 'typeorm';
import { User } from '../entity/User';
import { UserTokenData } from '../model/userTokenData';
import { Image } from '../entity/Image';
import { Tool } from '../entity/Tool';
import * as fs from 'fs';
import { Category } from '../entity/Category';
import { Rating } from '../entity/Rating';
import { Review } from '../entity/Review';
import { ReviewComment } from '../entity/ReviewComment';

/**
 * @apiDefine Tool
 * Tool related calls.
 */

/**
 * @api {POST} /v1/tool/create Create a tool
 * @apiGroup Tool
 * @apiParam {string} name name of the tool
 * @apiParam {string} description description of the tool
 * @apiParam {string[]} images array of image names
 * @apiSuccess {number} toolId created tool's id
 * @apiError (400) {json} error
 */
export async function createTool(request: Request, response: Response) {
  const userRepository = getRepository(User);
  const imageRepository = getRepository(Image);
  const toolRepository = getRepository(Tool);
  const cateRepository = getRepository(Category);
  const userInfo: UserTokenData = response.locals.userInfo;
  let user = await userRepository.findOne({ userId: userInfo.id });
  if (!user) {
    response.status(400).json({ error: 'Invalid user, please re-login' });
    return;
  }
  const name = request.body.name;
  const description = request.body.description;
  const imageNames = request.body.images;
  const category = request.body.category;
  const website = request.body.website;
  // Handle duplicate names
  let existTool = await toolRepository.findOne({ name: name });
  if (existTool) {
    response
      .status(400)
      .send({ error: 'Tool name is registered, please use another name.' });
    return;
  }
  const tool = new Tool();
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
  let categories: Category[] = [];
  tool.name = name;
  tool.description = description;
  tool.author = user;
  tool.images = images;
  tool.website = website;
  tool.categories = categories;
  // Check if category exists
  for (let i in category) {
    const cat = await cateRepository.findOne(category[i]);
    if (cat) {
      tool.categories.push(cat);
    }
  }
  await toolRepository
    .save(tool)
    .then(tool => {
      response.status(200).json({
        toolId: tool.toolId
      });
    })
    .catch(err => {
      response.status(400).json({
        error: 'Publish tool failed'
      });
    });
  return;
}

/**
 * @api {POST} /v1/tool/:id Get a tool
 * @apiGroup Tool
 * @apiParam {number} id tool id
 * @apiSuccess {json} tool object
 * @apiError (400) {json} error
 */
export async function getTool(request: Request, response: Response) {
  const toolRepository = getRepository(Tool);
  let tool = await toolRepository.findOne(request.params.id, {
    relations: ['categories', 'images']
  });
  if (!tool) {
    response.status(400).json({ error: 'Tool not found' });
    return;
  }
  response.status(200).json(tool);
}

/**
 * @api {GET} /v1/tool/search/:category/:keyword Get a tool
 * @apiGroup Tool
 * @apiParam {number} category tool category, 0 indicates all.
 * @apiParam {number} keyword key word to search
 * @apiSuccess {json} tool object list
 * @apiError (400) {json} error
 */
export async function searchTool(request: Request, response: Response) {
  const toolRepository = getRepository(Tool);
  const category = request.params.category;
  const keyword = request.params.keyword;
  let tools;
  if (category == 0) {
    tools = await getRepository(Tool)
      .createQueryBuilder('tool')
      .leftJoinAndSelect('tool.categories', 'category')
      .leftJoinAndSelect('tool.images', 'images')
      .where('LOWER(tool.name) like :name', {
        name: `%${keyword.toLowerCase()}%`
      })
      .getMany();
  } else {
    // Find tools with keyword and category
    tools = await getRepository(Tool)
      .createQueryBuilder('tool')
      .leftJoinAndSelect('tool.categories', 'category')
      .where('LOWER(tool.name) like :name', {
        name: `%${keyword.toLowerCase()}%`
      })
      .andWhere('category.categoryId = :id', { id: category })
      .getMany();
    // Join images and categories
    tools = await getRepository(Tool).findByIds(tools.map(_ => _.toolId), {
      relations: ['images', 'categories']
    });
  }
  response.status(200).json(tools);
}

/**
 * @api {GET} /v1/tools/recommanded Get recommanded tool list
 * @apiGroup Tool
 * @apiSuccess {json} tool objects list
 * @apiError (400) {json} error
 */
export async function getRecommandedTools(
  request: Request,
  response: Response
) {
  const toolRepository = getRepository(Tool);
  let tools = await toolRepository.find({
    relations: ['categories', 'images']
  });
  if (!tools) {
    response.status(400).json({ error: 'Tool not found' });
    return;
  }
  response.status(200).json(tools);
}

/**
 * @api {GET} /v1/tool/myrating/:toolId Get rating of the request owner
 * @apiGroup Tool
 * @apiParam {number} toolId tool id
 * @apiSuccess {number} rating user's rating, if no rating return 0
 */
export async function getMyRating(request: Request, response: Response) {
  const userInfo: UserTokenData = response.locals.userInfo;
  const ratingRepository = getRepository(Rating);
  let myRating = await ratingRepository.findOne({
    userId: userInfo.id,
    toolId: request.params.toolId
  });
  if (!myRating) {
    response.status(200).send('0');
  } else {
    response.status(200).send(myRating);
  }
}

/**
 * @api {POST} /v1/tool/myrating/ Post rating of the request owner
 * @apiGroup Tool
 * @apiParam {number} toolId tool id
 * @apiParam {number} score 1-5
 * @apiSuccess {string} OK
 * @apiError {json} error
 */
export async function postMyRating(request: Request, response: Response) {
  const userInfo: UserTokenData = response.locals.userInfo;
  const ratingRepository = getRepository(Rating);
  const toolRepository = getRepository(Tool);
  let myRating = await ratingRepository.findOne({
    userId: userInfo.id,
    toolId: request.body.toolId
  });
  let tool = await toolRepository.findOne({
    toolId: request.body.toolId
  });
  if (!myRating) {
    myRating = new Rating();
    myRating.toolId = request.body.toolId;
    myRating.userId = userInfo.id;
    myRating.score = request.body.score;
    await ratingRepository.save(myRating);
    // Update rate count
    tool.rateCount += 1;
    if (tool.averageRating) {
      // Incremental average
      tool.averageRating =
        tool.averageRating +
        (myRating.score - tool.averageRating) / tool.rateCount;
    } else {
      // It is the only count
      tool.averageRating = myRating.score;
    }
    await toolRepository.save(tool);
  } else {
    let oldRating = myRating.score;
    myRating.score = request.body.score;
    await ratingRepository.save(myRating);
    // Update tool average score
    tool.averageRating =
      tool.averageRating + (myRating.score - oldRating) / tool.rateCount;
    await toolRepository.save(tool);
  }
  response.status(200).json({ message: 'OK' });
}

/**
 * @api {GET} /v1/tool/reviews/:toolId Retrive reviews under tool with toolId
 * @apiGroup Tool
 * @apiParam {number} toolId id of the tool
 * @apiSuccess {json} reviewList
 * @apiError (400) {json} error
 */
export async function getReviewsByToolId(request: Request, response: Response) {
  const reviewController = getRepository(Review);
  const toolController = getRepository(Tool);
  let tool = await toolController.findOne(request.params.toolId);
  if (tool) {
    let reviews = await reviewController
      .createQueryBuilder('review')
      .select([
        'review.title',
        'review.createTime',
        'review.reviewId',
        'author.username'
      ])
      .innerJoin('review.author', 'author')
      .where({ tool: tool })
      .getMany();
    response.status(200).json(reviews);
  } else {
    response.status(400).json({ error: 'Invalid tool' });
  }
}
