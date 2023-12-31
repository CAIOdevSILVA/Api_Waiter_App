import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
	try {
		const { icon, name } = req.body;

		if(!name){
			res.status(400).json({
				error: 'name is required'
			});
		}

		await Category.create({ icon, name });

		res.status(201).send(`Categoria ${name} foi criada!`);
	} catch (error) {
		res.sendStatus(500);
	}
}
