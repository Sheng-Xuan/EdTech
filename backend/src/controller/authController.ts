import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import {
  validatePassword,
  generateAccessToken,
  extractAccessToken,
  verifyAccessToken,
  hashPassword
} from '../util/authUtils';

/**
 * @apiDefine Authentication
 * Authentication related calls.
 */

/**
 * @api {POST} /v1/register Register a new user
 * @apiGroup Authentication
 * @apiParam {String} username
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccess (200) {String} OK registration was successful
 * @apiError (300) {Object} error Error with database
 * @apiError (400) {Object} error Duplicate email
 */
export async function registerUser(request: Request, response: Response) {
  const username = request.body.username;
  const password = request.body.password;
  const email = request.body.email;
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ email: email });
  if (user) {
    response.status(400).json({ error: 'Email has been registered' });
    return;
  }
  user = new User();
  user.email = email;
  user.isAdmin = false;
  user.passwordHash = await hashPassword(password);
  user.username = username;
  await userRepository.save(user).catch(error => {
    response.status(300).send({ error: error.message });
    return;
  });
  response.status(200).json({ message: 'OK' });
  return;
}

/**
 * @api {POST} /v1/login Login
 * @apiGroup Authentication
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccess (200) {json} jwt:"xxxxx"
 * @apiError (401) {Object} error: Email and password not matched
 */
export async function login(request: Request, response: Response) {
  const password = request.body.password;
  const email = request.body.email;
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ email: email });
  if (!user) {
    response.status(401).send({ error: 'Email and password not matched' });
    return;
  }
  try {
    await validatePassword(password, user.passwordHash);
    const json = {
      token: await generateAccessToken(user),
      userId: user.userId,
      email: user.email,
      username: user.username
    };
    response.status(200).json(json);
  } catch (e) {
    console.log(e);
    response.status(401).json({ error: 'Email and password not matched' });
  }
}

export async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const accessToken = extractAccessToken(request);
    const userInfo = await verifyAccessToken(accessToken);
    // Add userInfo to the response, to be used in next steps
    response.locals.userInfo = userInfo;
    next();
  } catch (e) {
    response.status(401).json({ error: 'Unauthorized' });
  }
}
