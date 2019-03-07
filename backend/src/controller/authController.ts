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
import { sendUserVerification, sendForgotPassword } from '../util/emailService';
import uuid = require('uuid/v1');
import { ResetPasswordCode } from '../entity/ResetPasswordCode';

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
  user.verificationCode = uuid();
  user.status = 1;
  await userRepository.save(user).catch(error => {
    response.status(300).send({ error: error.message });
    return;
  });
  // Will not send email in test mode
  if (process.env.NODE_ENV !== 'test') {
    sendUserVerification(email, user.verificationCode, username);
  }
  response.status(200).json({ message: 'OK' });
  return;
}

/**
 * @api {POST} /v1/login Login
 * @apiGroup Authentication
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParam {Boolean} remember
 * @apiSuccess (200) {json} jwt:"xxxxx"
 * @apiError (401) {Object} error: Email and password not matched
 */
export async function login(request: Request, response: Response) {
  const password = request.body.password;
  const email = request.body.email;
  const remember = request.body.remember;
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ email: email });
  if (!user) {
    response.status(401).json({ error: 'Email and password not matched' });
    return;
  }
  const isCorrect = await validatePassword(password, user.passwordHash);
  if (isCorrect) {
    const json = {
      token: await generateAccessToken(user, remember),
      userId: user.userId,
      email: user.email,
      username: user.username
    };
    if (user.status !== 0) {
      response.status(403).json({ error: 'Your account is not activated.' });
    } else {
      response.status(200).json(json);
    }
  } else {
    response.status(401).json({ error: 'Email and password not matched' });
  }
}

/**
 * @api {POST} /v1/forgotpassword/code Request server to send reset password code to email
 * @apiGroup Authentication
 * @apiParam {String} email
 * @apiSuccess (200)
 * @apiError (401) {Object} error
 */
export async function getResetPasswordCode(request: Request, response: Response) {
  const email = request.body.email;
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ email: email });
  if (!user) {
    response.status(401).json({ error: 'Email is not registered' });
    return;
  }
  const codeRepository = getRepository(ResetPasswordCode);
  let code = new ResetPasswordCode();
  code.email = email;
  code.code = uuid().substring(0, 8)
  code.key = uuid();
  await codeRepository.save(code);
  sendForgotPassword(email, code.code);
  response.status(200).json({ message: 'Code has sent to your email.' });
}

/**
 * @api {POST} /v1/forgotpassword/verification Compare the code stored and user given
 * @apiGroup Authentication
 * @apiParam {String} email
 * @apiParam {String} code
 * @apiSuccess (200) {Object} key
 * @apiError (401) {Object} error
 */
export async function checkResetPasswordCode(request: Request, response: Response) {
  const email = request.body.email;
  const verificationCode = request.body.code;
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ email: email });
  if (!user) {
    response.status(401).json({ error: 'Failed, please check your email and code' });
    return;
  }
  const codeRepository = getRepository(ResetPasswordCode);
  let code = await codeRepository.findOne({ email: email, code: verificationCode });
  if (!code) {
    response.status(401).json({ error: 'Failed, please check your email and code' });
    return;
  } else {
    const now = Date.now();
    const saved = new Date(code.createTime).getTime();
    console.log(now, saved);
    // Expire time is 10 minutes
    if (now - saved > 600000) {
      await codeRepository.delete(code);
      response.status(401).json({ error: 'Code is expired, please request a new code again' });
      return;
    }
    response.status(200).json({key: code.key});
    return;
  }
}

/**
 * @api {POST} /v1/forgotpassword/newpassword Set new password
 * @apiGroup Authentication
 * @apiParam {String} password
 * @apiParam {String} key
 * @apiParam {String} email
 * @apiSuccess (200)
 * @apiError (401) {Object} error
 */
export async function resetPassword(request: Request, response: Response) {
  const email = request.body.email;
  const key = request.body.key;
  const password = request.body.password
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ email: email });
  if (!user) {
    response.status(401).json({ error: 'Something is wrong, please retry' });
    return;
  }
  const codeRepository = getRepository(ResetPasswordCode);
  let code = await codeRepository.findOne({ email: email, key: key });
  if (!code) {
    response.status(401).json({ error: 'Something is wrong, please retry' });
    return;
  } else {
    const now = Date.now();
    const saved = new Date(code.createTime).getTime();
    // Expire time for this step is 15 minutes
    if (now - saved > 900000) {
      await codeRepository.delete(code);
      response.status(401).json({ error: 'Session is expired, please request a new code again' });
      return;
    }
    user.passwordHash = await hashPassword(password);
    userRepository.save(user);
    response.status(200).json({message: 'OK'});
    codeRepository.delete(code);
    return;
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

export async function verifyEmail(request: Request, response: Response) {
  const code = request.body.code;
  const email = request.body.email;
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({ verificationCode: code });
  if (user && user.status === 1 && user.email === email) {
    user.status = 0;
    await userRepository.save(user);
    response.status(200).json({ message: 'OK' });
  } else {
    response.status(404).json({ message: 'not found' });
  }
}
