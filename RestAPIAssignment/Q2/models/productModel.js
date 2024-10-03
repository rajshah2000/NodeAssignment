// models/productModel.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/onlineShopping')
.then(() => console.log('Connected to Db!'));

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:  String,
    price:Number,
    description:  String ,
    category:  String ,
    stock: { type: Number, default: 0 }
});

// Create product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;