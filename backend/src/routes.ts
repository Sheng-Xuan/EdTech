import {
  getUserById,
  updatePassword,
  getAllUsers,
  updateUserGroupById,
  updateUserStatusById
} from './controller/userController';
import { registerUser, login, verifyEmail, getResetPasswordCode, checkResetPasswordCode, resetPassword } from './controller/authController';
import * as dotenv from 'dotenv';
import { uploadImage } from './controller/imageController';
import {
  createTool,
  getTool,
  getMyRating,
  postMyRating,
  getReviewsByToolId,
  getRecommendedTools,
  searchTool,
  deleteToolById,
  getAllTools,
  updateToolStatusById,
  getToolsByUserId,
  updateToolRecommendedById,
  getTopToolsByCategory
} from './controller/toolController';
import { getCategories } from './controller/categoryController';
import {
  getToolComments,
  postToolComment,
  getReviewComments,
  postReviewComment
} from './controller/commentController';
import { publishReview, getReviewById, getReviewsByUserId, getNewReviews, getReviewsFlow, putReviewVisit } from './controller/reviewController';

dotenv.config();
const apiVersion = process.env.API_VERSION;
/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: apiVersion + '/register',
    method: 'post',
    action: registerUser,
    auth: false
  },
  {
    path: apiVersion + '/login',
    method: 'post',
    action: login,
    auth: false
  },
  {
    path: apiVersion + '/user/:id',
    method: 'get',
    action: getUserById,
    auth: true
  },
  {
    path: apiVersion + '/user/password',
    method: 'put',
    action: updatePassword,
    auth: true
  },
  {
    path: apiVersion + '/image',
    method: 'post',
    action: uploadImage,
    auth: true
  },
  {
    path: apiVersion + '/tool/create',
    method: 'post',
    action: createTool,
    auth: true
  },
  {
    path: apiVersion + '/categories',
    method: 'get',
    action: getCategories,
    auth: false
  },
  {
    path: apiVersion + '/tool/:id',
    method: 'get',
    action: getTool,
    auth: false
  },
  {
    path: apiVersion + '/tool/myrating/:toolId',
    method: 'get',
    action: getMyRating,
    auth: true
  },
  {
    path: apiVersion + '/tool/search/:category/:keyword',
    method: 'get',
    action: searchTool,
    auth: false
  },
  {
    path: apiVersion + '/tools/recommended',
    method: 'get',
    action: getRecommendedTools,
    auth: false
  },
  {
    path: apiVersion + '/tool/myrating/',
    method: 'post',
    action: postMyRating,
    auth: true
  },
  {
    path: apiVersion + '/tool/comments/:toolId',
    method: 'get',
    action: getToolComments,
    auth: false
  },
  {
    path: apiVersion + '/tool/comment/',
    method: 'post',
    action: postToolComment,
    auth: true
  },
  {
    path: apiVersion + '/review/create/:toolId',
    method: 'post',
    action: publishReview,
    auth: true
  },
  {
    path: apiVersion + '/reviews/new',
    method: 'get',
    action: getNewReviews,
    auth: false
  },
  {
    path: apiVersion + '/review/:reviewId',
    method: 'get',
    action: getReviewById,
    auth: false
  },
  {
    path: apiVersion + '/review/comments/:reviewId',
    method: 'get',
    action: getReviewComments,
    auth: false
  },
  {
    path: apiVersion + '/review/comment/',
    method: 'post',
    action: postReviewComment,
    auth: true
  },
  {
    path: apiVersion + '/tool/reviews/:toolId',
    method: 'get',
    action: getReviewsByToolId,
    auth: false
  },
  {
    path: apiVersion + '/tool/:toolId',
    method: 'delete',
    action: deleteToolById,
    auth: true
  },
  {
    path: apiVersion + '/users',
    method: 'get',
    action: getAllUsers,
    auth: true
  },
  {
    path: apiVersion + '/tools',
    method: 'get',
    action: getAllTools,
    auth: true
  },
  {
    path: apiVersion + '/user/group',
    method: 'put',
    action: updateUserGroupById,
    auth: true 
  },
  {
    path: apiVersion + '/user/status',
    method: 'put',
    action: updateUserStatusById,
    auth: true 
  },
  {
    path: apiVersion + '/tool/status',
    method: 'put',
    action: updateToolStatusById,
    auth: true
  },
  {
    path: apiVersion + '/verification',
    method: 'post',
    action: verifyEmail,
    auth: false
  },
  {
    path: apiVersion + '/tools/:id',
    method: 'get',
    action: getToolsByUserId,
    auth: true
  },
  {
    path: apiVersion + '/reviews/:userId',
    method: 'get',
    action: getReviewsByUserId,
    auth: true
  },
  {
    path: apiVersion + '/forgotpassword/code',
    method: 'post',
    action: getResetPasswordCode,
    auth: false
  },
  {
    path: apiVersion + '/forgotpassword/verification',
    method: 'post',
    action: checkResetPasswordCode,
    auth: false
  },
  {
    path: apiVersion + '/forgotpassword/newpassword',
    method: 'post',
    action: resetPassword,
    auth: false
  },
  {
    path: apiVersion + '/tool/recommended',
    method: 'put',
    action: updateToolRecommendedById,
    auth: true
  },
  {
    path: apiVersion + '/tools/top/:category',
    method: 'get',
    action: getTopToolsByCategory,
    auth: false
  },
  {
    path: apiVersion + '/reviews/flow/:offset',
    method: 'get',
    action: getReviewsFlow,
    auth: false
  },
  {
    path: apiVersion + '/reviews/visit/:reviewId',
    method: 'put',
    action: putReviewVisit,
    auth: false
  }
];
