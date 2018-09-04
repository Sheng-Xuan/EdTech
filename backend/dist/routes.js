"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("./controller/userController");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: "/v1/user/:id",
        method: "get",
        action: userController_1.getUserById
    }
];
