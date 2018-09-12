import { getUserById, updatePassword } from "./controller/userController";
import { registerUser, login } from "./controller/authController";

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
        path: apiVersion + "/v1/user/password",
        method: "put",
        action: updatePassword,
        auth: true
    }
];