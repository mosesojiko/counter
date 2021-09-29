/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const productRouter = express.Router();

const data = require('../data.js');
const Product = require('../models/productModel.js');

//get all products
productRouter.get('/', expressAsyncHandler( async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

//create a product
productRouter.get('/create', expressAsyncHandler( async(req, res) => {
    const createProduct = await Product.insertMany(data.products);
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