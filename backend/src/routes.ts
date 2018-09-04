import { getUserById } from "./controller/userController";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/v1/user/:id",
        method: "get",
        action: getUserById
    }
];