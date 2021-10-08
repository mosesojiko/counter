/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const productRouter = express.Router();

const Product = require('../models/productModel.js');

//get all products
productRouter.get('/', expressAsyncHandler( async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

//create a product
productRouter.post('/create', expressAsyncHandler( async(req, res) => {
    
    const { name, price, category, image, countInStock, brand, rating, numReviews, description } =
    req.body;

    const product = new Product({
        name, price, category, image, countInStock, brand, rating, numReviews, description 
    });
    const createProduct = await product.save();
    res.json({
        _id: createProduct._id,
        name: createProduct.name,
        category: createProduct.category,
        image: createProduct.image,
        description: createProduct.description,
        countInStock: createProduct.countInStock,
        brand: createProduct.brand,
        rating: createProduct.rating,
        numReviews: createProduct.numReviews
    })
    res.json({createProduct});
}))

//get single product or product details
productRouter.get('/:id', expressAsyncHandler( async(req, res)=>{
    const singleProduct = await Product.findById(req.params.id);
    if(singleProduct){
        res.json(singleProduct);
    }else{
        res.status(404).json({
            message: `Product with id: ${req.params.id} not found.`
        })
    }
}))


module.exports = productRouter;