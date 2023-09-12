import { Request, Response } from 'express';

import  { Product } from '../../models/Product';

export async function listProductsByCategories(req: Request, res: Response) {
	try {
		const category = req.params.categoryId;
		const products = await Product.find().where('category').equals(category);

		res.json(products);
	} catch (error) {
		res.sendStatus(500);
	}
}
