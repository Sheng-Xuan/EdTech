import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { hashPassword, validatePassword } from '../util/authUtils';
import { UserTokenData } from '../model/userTokenData';
/**
 * @apiDefine UserGroup /user
 * CRUD api for users.
 */

/**
 * @api {GET} /v1/user/:id GET user by ID
 * @apiGroup UserGroup
 * @apiParam {Number} id User's unique ID
 * @apiSuccess {String} email email address
 * @apiSuccess {String} username user name
 * @apiSuccess {Boolean} isAdmin Is this user a admin user
 */
export async function getUserById(request: Request, response: Response) {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(request.params.id);
  if (!user) {
    response.status(404).send('User not exist');
    return;
  }
  response.send({
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin
  });
}

/**
 * @api {GET} /v1/users/ GET all users (admin api)
 * @apiGroup UserGroup
 * @apiSuccess {json} users all users
 */
export async function getAllUsers(request: Request, response: Response) {
  const userInfo: UserTokenData = response.locals.userInfo;
  let user = await getRepository(User).findOne({ userId: userInfo.id });
  if (!user || !user.isAdmin) {
    response.status(401).json({ error: 'Unauthorized' });
  } else {
    let users = await getRepository(User).find({
      select: [
        'userId',
        'status',
        'email',
        'username',
        'isAdmin',
        'registerTime'
      ],
      order: {
        userId: 'ASC'
      }
    });
    response.status(200).json(users);
  }
}

/**
 * @api {PUT} /v1/user/group Update a user's group (admin api)
 * @apiGroup UserGroup
 * @apiParam userId
 * @apiParam isAdmin
 * @apiSuccess {json} OK
 */
export async function updateUserGroupById(
  request: Request,
  response: Response
) {
  const userInfo: UserTokenData = response.locals.userInfo;
  const userRepository = await getRepository(User);
  let user = await userRepository.findOne({ userId: userInfo.id });
  if (!user || !user.isAdmin) {
    response.status(401).json({ error: 'Unauthorized' });
  } else {
    const newGroup = request.body.isAdmin;
    const userId = request.body.userId;
    let user = await userRepository.findOne(userId);
    if (user) {
      user.isAdmin = newGroup;
      await userRepository.save(user).catch(err => {
        console.error(err);
        response.status(400).json({ message: 'error' });
      });
      response.status(200).json({ message: 'OK' });
    } else {
      response.status(400).json({ message: 'user does not exist' });
    }
  }
}

/**
 * @api {PUT} /v1/user/status Update a user's status (admin api)
 * @apiGroup UserGroup
 * @apiParam userId
 * @apiParam status
 * @apiSuccess {json} OK
 */
export async function updateUserStatusById(
  request: Request,
  response: Response
) {
  const userInfo: UserTokenData = response.locals.userInfo;
  const userRepository = await getRepository(User);
  let user = await userRepository.findOne({ userId: userInfo.id });
  if (!user || !user.isAdmin) {
    response.status(401).json({ error: 'Unauthorized' });
  } else {
    const newStatus = request.body.status;
    const userId = request.body.userId;
    let user = await userRepository.findOne(userId);
    if (user) {
      user.status = newStatus;
      await userRepository.save(user).catch(err => {
        console.error(err);
        response.status(400).json({ error: 'error' });
      });
      response.status(200).json({ message: 'OK' });
    } else {
      response.status(400).json({ error: 'user does not exist' });
    }
  }
}

/**
 * @api {PUT} /v1/user/password Update user's password
 * @apiGroup UserGroup
 * @apiParam {String} newPassword User's new password
 * @apiParam {String} oldPassword User's old password
 * @apiSuccess {String} status OK
 */
export async function updatePassword(request: Request, response: Response) {
  const userRepository = getRepository(User);
  const userInfo: UserTokenData = response.locals.userInfo;
  const oldPassword = request.body.oldPassword;
  const newPassword = request.body.newPassword;
  const user = await userRepository.findOne(userInfo.id);
  if (!user) {
    response.status(404).send('User not exist');
    return;
  }
  if (user.email !== userInfo.email) {
    response.status(401).send('Unauthorized');
    return;
  }
  let isCorrectPassword = await validatePassword(
    oldPassword,
    user.passwordHash
  );
  if (!isCorrectPassword) {
    response.status(401).send('Current password is wrong');
    return;
  }
  user.passwordHash = await hashPassword(newPassword);
  await userRepository.save(user);
  response.send('OK');
}
