import express from 'express';
import productCtrl from '../controllers/product.contoller.js';

const router = express.Router();

// GET all products
router.get('/api/products', productCtrl.getAllProducts);

// GET a product by ID
router.get('/api/products/:id', productCtrl.getProductById);

// POST - Add a new product
router.post('/api/products', productCtrl.createProduct);

// PUT - Update a product by ID
router.put('/api/products/:id', productCtrl.updateProduct);

// DELETE - Remove a product by ID
router.delete('/api/products/:id', productCtrl.deleteProduct);

// DELETE - Remove all products
router.delete('/api/products', productCtrl.deleteAllProducts);

// GET products by name
router.get('/api/products?name=', productCtrl.findProductsByName);

export default router;
