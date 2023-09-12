
import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
	try {
		const { category, name, description, price, ingredients } = req.body;
		const imagePath = req.file?.filename;

		const product = await Product.create({
			category,
			name,
			description,
			price: Number(price),
			ingredients: ingredients ? JSON.parse(ingredients) : [],
			imagePath
		});

		res.status(201).json(product);
	} catch (error) {
		res.send(error);
	}
}
