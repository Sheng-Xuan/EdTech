import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { hashPassword, validatePassword } from "../util/authUtils";
import { UserTokenData } from "../model/userTokenData";
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
        response.status(404).send("User not exist");
        return;
    }
    response.send({
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
    });
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
    const userInfo : UserTokenData = response.locals.userInfo;
    const oldPassword = request.body.oldPassword;
    const newPassword = request.body.newPassword;
    const user = await userRepository.findOne(userInfo.id);
    if (!user) {
        response.status(404).send("User not exist");
        return;
    }
    if (user.email !== userInfo.email) {
        response.status(401).send("Unauthorized");
        return;
    }
    let isCorrectPassword = await validatePassword(oldPassword, user.passwordHash);
    if (!isCorrectPassword) {
        response.status(401).send("Current password is wrong");
        return;
    }
    user.passwordHash = await hashPassword(newPassword);
    await userRepository.save(user);
    response.send("OK");
}