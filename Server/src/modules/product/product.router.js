import { addProduct, deleteProduct, getProduct, updateProduct } from './product.controller.js';
import express from 'express';
const router = express.Router();

// add products
router.post('/product', addProduct);

//update product
router.put('/product/:id', updateProduct);

//delete product
router.delete('/product/:id', deleteProduct);

// search with query
router.get('/product', getProduct);

export default router;

