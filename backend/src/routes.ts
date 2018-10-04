import { getUserById, updatePassword } from "./controller/userController";
import { registerUser, login } from "./controller/authController";
import * as dotenv from 'dotenv';
import { uploadImage } from "./controller/imageController";
import { createTool } from "./controller/toolController";

dotenv.config();
const apiVersion = process.env.API_VERSION;
/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: apiVersion + "/register",
        method: "post",
        action: registerUser,
        auth: false
    },
    {
        path: apiVersion + "/login",
        method: "post",
        action: login,
        auth: false
    },
    {
        path: apiVersion + "/user/:id",
        method: "get",
        action: getUserById,
        auth: true
    },
    {
        path: apiVersion + "/user/password",
        method: "put",
        action: updatePassword,
        auth: true
    },
    {
        path: apiVersion + "/image",
        method: "post",
        action: uploadImage,
        auth: true,
    },
    {
        path: apiVersion + "/tool/create",
        method: "post",
        action: createTool,
        auth: true
    }
];