import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductsByCategories } from './app/useCases/categories/listProductsByCategories';
import { createOrder } from './app/useCases/orders/createOrder';
import { listOrders } from './app/useCases/orders/listOrders';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { deleteOrder } from './app/useCases/orders/deleteOrder';

export const router = Router();

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, '..', 'uploads'));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	})
});

//List Categories
router.get('/categories', listCategories);

//Create Category
router.post('/categories', createCategory);

//List Products
router.get('/products', listProducts);

//Create Products
router.post('/products', upload.single('image'), createProduct);

//Get Product by Category
router.get('/categories/:categoryId/products', listProductsByCategories);

//List Order
router.get('/orders', listOrders);

//Create Orders
router.post('/orders', createOrder);

//Change Orders Status
router.patch('/orders/:orderId', changeOrderStatus);

//Delete/Cancel Order
router.delete('/orders/:orderId', deleteOrder);
