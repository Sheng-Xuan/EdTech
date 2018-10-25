import { Request, Response } from 'express-serve-static-core';

import { UserTokenData } from '../model/userTokenData';

import { getRepository } from 'typeorm';

import { ToolComment } from '../entity/ToolComment';
import { User } from '../entity/User';
import { Tool } from '../entity/Tool';
import { Review } from '../entity/Review';
import { ReviewComment } from '../entity/ReviewComment';

/**
 * @apiDefine Comment
 * Comment related calls.
 */

/**
 * @api {POST} /v1/tool/comment/ Post comment to a tool
 * @apiGroup Comment
 * @apiParam {number} toolId tool id
 * @apiParam {number} comment comment content
 * @apiSuccess {json} message OK
 * @apiError {json} error error
 */
export async function postToolComment(request: Request, response: Response) {
  const userInfo: UserTokenData = response.locals.userInfo;
  const commentController = getRepository(ToolComment);
  const userController = getRepository(User);
  const toolController = getRepository(Tool);
  let user = await userController.findOne(userInfo.id);
  let tool = await toolController.findOne(request.body.toolId);
  if (user && tool) {
    const newComment = new ToolComment();
    newComment.author = user;
    newComment.content = request.body.comment;
    newComment.tool = tool;
    await commentController.save(newComment);
    response.status(200).json({ message: 'OK' });
  } else {
    response.status(400).json({ error: 'Invalid tool or user' });
  }
}

/**
 * @api {POST} /v1/review/comment/ Post comment to a tool
 * @apiGroup Comment
 * @apiParam {number} reviewId review id
 * @apiParam {number} comment comment content
 * @apiSuccess {json} message OK
 * @apiError {json} error error
 */
export async function postReviewComment(request: Request, response: Response) {
    const userInfo: UserTokenData = response.locals.userInfo;
    const commentController = getRepository(ReviewComment);
    const userController = getRepository(User);
    const reviewController = getRepository(Review);
    let user = await userController.findOne(userInfo.id);
    let review = await reviewController.findOne(request.body.commentId);
    if (user && review) {
      const newComment = new ReviewComment();
      newComment.author = user;
      newComment.content = request.body.comment;
      newComment.review = review;
      await commentController.save(newComment);
      response.status(200).json({ message: 'OK' });
    } else {
      response.status(400).json({ error: 'Invalid tool or user' });
    }
  }

/**
 * @api {GET} /v1/tool/comments/:toolId GET comments to a tool
 * @apiGroup Comment
 * @apiParam {number} toolId tool id
 * @apiSuccess {array} comments
 * @apiError {json} error error
 */
export async function getToolComments(request: Request, response: Response) {
  const commentController = getRepository(ToolComment);
  const toolController = getRepository(Tool);
  let tool = await toolController.findOne(request.params.toolId);
  if (tool) {
    let comments = await commentController
    .createQueryBuilder('comment')
    .select(['comment.content', 'comment.createTime', 'author.username'])
    .innerJoin('comment.author', 'author')
    .where({tool: tool})
    .getMany();
    response.status(200).json(comments);
  } else {
    response.status(400).json({ error: 'Invalid tool' });
  }
}

/**
 * @api {GET} /v1/review/comments/:reviewId GET comments to a review
 * @apiGroup Comment
 * @apiParam {number} reviewId review id
 * @apiSuccess {array} comments
 * @apiError {json} error error
 */
export async function getReviewComments(request: Request, response: Response) {
    const commentController = getRepository(ReviewComment);
    const reviewComtroller = getRepository(Review);
    let review = await reviewComtroller.findOne(request.params.reviewId);
    if (review) {
      let comments = await commentController
      .createQueryBuilder('comment')
      .select(['comment.content', 'comment.createTime', 'author.username'])
      .innerJoin('comment.author', 'author')
      .where({review: review})
      .getMany();
      response.status(200).json(comments);
    } else {
      response.status(400).json({ error: 'Invalid tool' });
    }
  }
