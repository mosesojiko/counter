/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const productRouter = express.Router();

const Product = require('../models/productModel.js');
const { isAuth } = require('../utils/isAuth.js');

//create a product
productRouter.post('/create', isAuth, expressAsyncHandler( async(req, res) => {
    
    const { name, price, category, numberInStore, image, countInStock, brand, description, sellerName, sellerEmail, sellerId, sellerPhone, productStore } =
    req.body;

    const product = new Product({
        name, price, category, numberInStore, image, countInStock, brand, description, sellerName, sellerEmail, sellerId, sellerPhone, productStore, user: req.user._id
    });
    // const uniqueNumber = await Product.findOne({numberInStore: req.body.numberInStore});
    // if(uniqueNumber){
    //    return res.status(400).json({message: "Number in store already exist. Two product cannot have the same number in store."})
    
    // }
    const createProduct = await product.save();
    res.json({
        _id: createProduct._id,
        name: createProduct.name,
        category: createProduct.category,
        numberInStore: createProduct.numberInStore,
        image: createProduct.image,
        description: createProduct.description,
        countInStock: createProduct.countInStock,
        brand: createProduct.brand,
        sellerName: createProduct.sellerName,
        sellerEmail: createProduct.sellerEmail,
        sellerId: createProduct.sellerId,
        sellerPhone: createProduct.sellerPhone,
        productStore: createProduct.productStore,
        user: req.user._id,
    })
}))

//get all user products
productRouter.get('/user', isAuth, expressAsyncHandler( async(req, res) => {
    const userProducts = await Product.find({user: req.user._id});
    res.json(userProducts);
}))

//get all products
productRouter.get('/', expressAsyncHandler( async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

//get single product or product details
productRouter.get('/:id', expressAsyncHandler( async(req, res)=>{
    const singleProduct = await Product.findById(req.params.id);
    if(singleProduct){
       return res.json(singleProduct);
    }else{
       return res.status(404).json({
            message: `Product with id: ${req.params.id} not found.`
        })
    }
}))



module.exports = productRouter;