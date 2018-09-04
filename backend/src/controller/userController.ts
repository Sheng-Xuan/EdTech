import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from "../entity/User";
/**
 * @apiDefine UserGroup /user
 * CRUD api for users.
 */

/**
 * @api {GET} /v1/user/:id GET user by ID
 * @apiGroup UserGroup
 * @apiParam {Number} id User's unique ID
 * @apiSuccess {String} email email address
 * @apiSuccess {String} userName user name
 * @apiSuccess {Boolean} isAdmin Is this user a admin user
 * @
 */
export async function getUserById(request: Request, response: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(request.params.id);
    if (!user) {
        response.status(404).send("User not exist");
        return;
    }
    response.send({
        email: user.email,
        userName: user.userName,
        isAdmin: user.isAdmin
    });
}