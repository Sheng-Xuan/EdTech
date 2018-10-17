import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';
import { Request, Response } from 'express';

/**
 * @apiDefine Category
 * Authentication related calls.
 */

/**
 * @api {GET} /v1/categories Get all categories
 * @apiGroup Category
 * @apiSuccess (200) {Array} Array of categoryObjects
 * @apiError (400) {Object} error No category found
 */
export async function getCategories(request: Request, response: Response) {
    const cateRepo = getRepository(Category);
    let allCategories = await cateRepo.find();
    if (!allCategories) {
      response.status(400).json({ error: 'No category is found' });
      return;
    }
    response.status(200).json(allCategories.map(category => {
        return {id: category.categoryId, name: category.name};
    }));
    return;
  }

  export async function initCategories() {
    const cateRepo = getRepository(Category);
    // Predefined categories
    const categories = [
      'Productivity',
      'Entertainment',
      'Communication',
      'Visualization',
      'Examination',
      'Utility'
    ];
    for (let index in categories) {
      let category = await cateRepo.findOne({ name: categories[index] });
      if (!category) {
        await cateRepo.save({ name: categories[index] });
      }
    }
  }
