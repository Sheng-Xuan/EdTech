import * as bcrypt from 'bcrypt';
import ms = require('ms');
import jwt = require('jsonwebtoken');
import { Request } from 'express';
import { User } from '../entity/User';

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, 10);

export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => bcrypt.compare(password, hash);

export const generateAccessToken = async (user: User): Promise<string> => {
  const token = {
    id: user.userId,
    email: user.email,
    expires: +new Date() + ms('7 days')
  };
  return await jwt.sign(token, process.env.JWT_SECRET);
};

export const verifyAccessToken = async (accessToken: string): Promise<Object> => {
  try {
    const tokenData = await jwt.verify(accessToken, process.env.JWT_SECRET);
    if (tokenData['expires'] < +new Date()) {
      throw new Error('EXPIRED_ACCESS_TOKEN');
    }
    return tokenData;
  } catch (e) {
    throw e;
  }
};

export const extractAccessToken = (req: Request): string =>
  typeof req.headers.authorization === 'string'
    ? req.headers.authorization.split('Bearer ')[1]
    : '';
