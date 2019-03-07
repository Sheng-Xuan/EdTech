import * as bcrypt from 'bcryptjs';
import ms = require('ms');
import jwt = require('jsonwebtoken');
import { Request } from 'express';
import { User } from '../entity/User';
import { UserTokenData } from '../model/userTokenData';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => bcrypt.compare(password, hash);

export const generateAccessToken = async (user: User, remember: Boolean): Promise<string> => {
  const token : UserTokenData = {
    id: user.userId,
    email: user.email,
    expireTime: remember? +new Date() + ms('7 days') : +new Date() + ms('2 hours')
  };
  return await jwt.sign(token, process.env.JWT_SECRET);
};

export const verifyAccessToken = async (accessToken: string): Promise<UserTokenData> => {
  try {
    const tokenData  = await jwt.verify(accessToken, process.env.JWT_SECRET);
    const userTokenData : UserTokenData = {
      id : tokenData['id'],
      email: tokenData['email'],
      expireTime: tokenData['expireTime']
    }
    if (userTokenData.expireTime < +new Date()) {
      throw new Error('EXPIRED_ACCESS_TOKEN');
    }
    return userTokenData;
  } catch (e) {
    throw e;
  }
};

export const extractAccessToken = (req: Request): string =>
  typeof req.headers.authorization === 'string'
    ? req.headers.authorization.split('Bearer ')[1]
    : '';
