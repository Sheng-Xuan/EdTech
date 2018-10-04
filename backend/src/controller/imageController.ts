import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserTokenData } from '../model/userTokenData';
import { Image } from '../entity/Image';

/**
 * @apiDefine Image
 * Image related calls.
 */

/**
 * @api {POST} /v1/image Upload a image to the server
 * @apiGroup Upload
 * @apiSuccess {String} url relative url of uploaded image
 * @apiSuccess {String} fileName new file name
 * @apiError (400) {json} error
 */
export async function uploadImage(request: Request, response: Response) {
  const userRepository = getRepository(User);
  const imageRepository = getRepository(Image);
  const userInfo : UserTokenData = response.locals.userInfo;
  let user = await userRepository.findOne({ userId: userInfo.id });
  if (!user) {
    response.status(400).json({ error: 'Invalid user, please re-login' });
    return;
  }
  if (!request.file) {
    response.status(400).json({ error: 'File not found' });
    return;
  }
  response.status(200).json({ 
      url: '/files/' + request.file.filename,
      fileName: request.file.filename,
     });
  return;
}
