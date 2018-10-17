import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserTokenData } from '../model/userTokenData';
import { Image } from '../entity/Image';
import { Tool } from '../entity/Tool';
import * as fs from 'fs';
import { Category } from '../entity/Category';
import { Rating } from '../entity/Rating';

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
  tool.categories = categories;
  // Check if category exists
  for (let i in category) {
    const cat = await cateRepository.findOne(category[i]);
    if (cat) {
      tool.categories.push(cat);
    }
  }
  await toolRepository.save(tool);
  let newTool = await toolRepository.findOne({ name: name });
  response.status(200).json({
    toolId: newTool.toolId
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
  const ratingRepository = getRepository(Rating);
  let ratingAndCount = await ratingRepository
    .createQueryBuilder('rating')
    .select('AVG(rating.score)', 'averageScore')
    .addSelect('COUNT(*)', 'count')
    .where('rating.toolId = :toolId', { toolId: tool.toolId })
    .getRawOne();
  if (ratingAndCount['averageScore']) {
    tool['rating'] = ratingAndCount['averageScore'];
  }
  if (ratingAndCount['count']) {
    tool['ratingCount'] = ratingAndCount['count'];
  }
  response.status(200).json(tool);
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
  let myRating = await ratingRepository.findOne({
    userId: userInfo.id,
    toolId: request.body.toolId
  });
  if (!myRating) {
    myRating = new Rating();
    myRating.toolId = request.body.toolId;
    myRating.userId = userInfo.id;
    myRating.score = request.body.score;
    await ratingRepository.save(myRating);
  } else {
    myRating.score = request.body.score;
    await ratingRepository.save(myRating);
  }
  response.status(200).json({ message: 'OK' });
}
