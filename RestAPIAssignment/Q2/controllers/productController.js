const Product = require('../models/productModel');

const renderAddProductForm = (req, res) => {
    res.render('addProduct');
};

const createProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
};
const getAllProducts = async (req, res) => {

    const products = await Product.find();
    res.json(products);

};

const getProductById = async (req, res) => {

    const product = await Product.findById(req.params.id);
    res.json(product);


};

const updateProduct = async (req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
};

const partialUpdateProduct = async (req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.json({ message: 'Product not found' });
    res.json(product);

};

 const renderEditProductForm = async (req, res) => {
   
        const product = await Product.findById(req.params.id);
        res.render('editProduct', { product });
    
};

const deleteProduct = async (req, res) => {

     await Product.findByIdAndDelete(req.params.id);
};

module.exports = {renderEditProductForm, renderAddProductForm, createProduct, getAllProducts, getProductById, updateProduct, partialUpdateProduct, deleteProduct }