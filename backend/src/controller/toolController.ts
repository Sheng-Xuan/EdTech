import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserTokenData } from '../model/userTokenData';
import { Image } from '../entity/Image';
import { Tool } from '../entity/Tool';
import * as fs from 'fs';

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
  let existTool = await toolRepository.findOne({ name: name });
  if (existTool) {
    response
      .status(400)
      .send({ error: 'Tool name is registered, please use another name.' });
    return;
  }
  const tool = new Tool();
  let images:Image[] = [];
  for (let name of imageNames) {
    if (fs.existsSync(process.cwd() + '/uploads/' + name)) {
      const image = new Image();
      image.isTempFile = false;
      image.localFileName = name;
      image.uploader = user;
      await imageRepository.save(image);
      images.push(image);
    }else {
      console.log("image not found " + name);
    }
  }
  tool.name = name;
  tool.description = description;
  tool.author = user;
  tool.images = images;
  await toolRepository.save(tool);
  let newTool = await toolRepository.findOne({ name: name });
  response.status(200).json({
    toolId: newTool.toolId
  });
  return;
}
