// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for products
router.get('/', productController.getAllProducts); 
router.get('/add', productController.renderAddProductForm); 
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct); 
router.patch('/:id', productController.partialUpdateProduct); 
router.delete('/:id', productController.deleteProduct); 
router.get('/:id/edit', productController.renderEditProductForm);
router.put('/:id', productController.updateProduct);

module.exports = router;