import { getRepository } from 'typeorm';
import { Category } from '../entity/Category';
import { Request, Response } from 'express';
import { UserTokenData } from '../model/userTokenData';
import { User } from '../entity/User';

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
	const catRepo = getRepository(Category);
	let allCategories = await catRepo.find();
	if (!allCategories) {
		response.status(400).json({ error: 'No category is found' });
		return;
	}
	response.status(200).json(
		allCategories.map(category => {
			return { id: category.categoryId, name: category.name };
		})
	);
	return;
}

/**
 * @api {GET} /v1/categories-with-count Get all categories with tool count (Admin API)
 * @apiGroup Category
 * @apiSuccess (200) {Array} Array of categoryObjects
 * @apiError (400) {Object} error No category found
 */
export async function getCategoriesWithCount(
	request: Request,
	response: Response
) {
	const userInfo: UserTokenData = response.locals.userInfo;
	const userRepository = await getRepository(User);
	let user = await userRepository.findOne({ userId: userInfo.id });
	if (!user || !user.isAdmin) {
		response.status(401).json({ error: 'Unauthorized' });
	} else {
    const catRepo = getRepository(Category);
    let allCategories = await catRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect("category.tools", "tools")
      .orderBy('category.categoryId')
      .getMany();
    if (!allCategories) {
      response.status(400).json({ error: 'No category is found' });
      return;
    }
    response.status(200).json(
      allCategories.map(cat => {
        return { id: cat.categoryId, name: cat.name, count: cat.tools.length }
      })
    );
	}
}

/**
 * @api {POST} /v1/category Add a category (Admin API)
 * @apiGroup Category
 * @apiParam Category Name
 * @apiSuccess (200) {Json} ok
 * @apiError (400) {Json} error
 */
export async function addCategory(request: Request, response: Response) {
	const cateRepo = getRepository(Category);
	const userInfo: UserTokenData = response.locals.userInfo;
	const userRepository = await getRepository(User);
	let user = await userRepository.findOne({ userId: userInfo.id });
	if (!user || !user.isAdmin) {
		response.status(401).json({ error: 'Unauthorized' });
	} else {
		const catName = request.body.name;
		let cat = await cateRepo.findOne({ name: catName });
		if (cat) {
			response.status(400).json({ error: 'Category exists' });
		} else {
			await cateRepo.save({ name: catName });
			response.status(200).json({ message: 'OK' });
		}
	}
}

/**
 * @api {DELETE} /v1/category Delete a category (Admin API)
 * @apiGroup Category
 * @apiParam Category Id
 * @apiSuccess (200) {Json} ok
 * @apiError (400) {Json} error
 */
export async function deleteCategory(request: Request, response: Response) {
	const cateRepo = getRepository(Category);
	const userInfo: UserTokenData = response.locals.userInfo;
	const userRepository = await getRepository(User);
	let user = await userRepository.findOne({ userId: userInfo.id });
	if (!user || !user.isAdmin) {
		response.status(401).json({ error: 'Unauthorized' });
	} else {
		const catId = request.params.id;
		let cat = await cateRepo
			.createQueryBuilder('category')
			.where('category.categoryId = :id', { id: catId })
			.leftJoin('category.tools', 'tools')
			.getOne();
		if (!cat) {
			response.status(400).json({ error: 'Category not found' });
		} else if (cat.tools) {
			response
				.status(400)
				.json({ error: 'Cannot delete category with tools count > 0' });
		} else {
			await cateRepo.delete(catId);
			response.status(200).json({ message: 'OK' });
		}
	}
}

// Only use this function when the db is empty
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
