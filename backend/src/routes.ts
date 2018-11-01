import { getUserById, updatePassword } from "./controller/userController";
import { registerUser, login } from "./controller/authController";
import * as dotenv from 'dotenv';
import { uploadImage } from "./controller/imageController";
import { createTool, getTool, getMyRating, postMyRating, getReviewsByToolId, getRecommandedTools, searchTool } from "./controller/toolController";
import { getCategories } from "./controller/categoryController";
import { getToolComments, postToolComment, getReviewComments, postReviewComment } from "./controller/commentController";
import { publishReview, getReviewById } from "./controller/reviewController";

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
    },
    {
        path: apiVersion + "/categories",
        method: "get",
        action: getCategories,
        auth: false
    },
    {
        path: apiVersion + "/tool/:id",
        method: "get",
        action: getTool,
        auth: false
    },
    {
        path: apiVersion + "/tool/myrating/:toolId",
        method: "get",
        action: getMyRating,
        auth: true
    },
    {
        path: apiVersion + "/tool/search/:category/:keyword",
        method: "get",
        action: searchTool,
        auth: false
    },
    {
        path: apiVersion + "/tools/recommanded",
        method: "get",
        action: getRecommandedTools,
        auth: false
    },
    {
        path: apiVersion + "/tool/myrating/",
        method: "post",
        action: postMyRating,
        auth: true
    },
    {
        path: apiVersion + "/tool/comments/:toolId",
        method: "get",
        action: getToolComments,
        auth: false
    },
    {
        path: apiVersion + "/tool/comment/",
        method: "post",
        action: postToolComment,
        auth: true
    },
    {
        path: apiVersion + "/review/create/:toolId",
        method: "post",
        action: publishReview,
        auth: true
    },
    {
        path: apiVersion + "/review/:reviewId",
        method: "get",
        action: getReviewById,
        auth: false
    },
    {
        path: apiVersion + "/review/comments/:reviewId",
        method: "get",
        action: getReviewComments,
        auth: false
    },
    {
        path: apiVersion + "/review/comment/",
        method: "post",
        action: postReviewComment,
        auth: true
    },
    {
        path: apiVersion + "/tool/reviews/:toolId",
        method: "get",
        action: getReviewsByToolId,
        auth: false
    }
];