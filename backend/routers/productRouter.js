/* eslint-disable no-undef */
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const productRouter = express.Router();

const Product = require("../models/productModel.js");
const { isAuth } = require("../utils/isAuth.js");

//create a product
productRouter.post(
  "/create",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      name,
      price,
      category,
      numberInStore,
      image,
      countInStock,
      brand,
      description,
      sellerName,
      sellerEmail,
      sellerId,
      sellerPhone,
      productStore,
    } = req.body;

    const product = new Product({
      name,
      price,
      category,
      numberInStore,
      image,
      countInStock,
      brand,
      description,
      sellerName,
      sellerEmail,
      sellerId,
      sellerPhone,
      productStore,
      user: req.user._id,
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
    });
  })
);

//get product for update
productRouter.get(
    "/update/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      } else {
        return res.status(404).json({
          message: `Product with id: ${req.params.id} not found.`,
        });
      }
    })
);

//get product for delete
productRouter.get(
  "/delete/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productToDelete = await Product.findById(req.params.id);
    if (productToDelete) {
      return res.json(productToDelete);
    } else {
      return res.status(404).json({
        message: `Product with id: ${req.params.id} not found.`,
      });
    }
  })
);


//get all user products
productRouter.get(
    "/user",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userProducts = await Product.find({ user: req.user._id });
    res.json(userProducts);
  })
);

//get all products
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//get single product or product details
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const singleProduct = await Product.findById(req.params.id);
    if (singleProduct) {
      return res.json(singleProduct);
    } else {
      return res.status(404).json({
        message: `Product with id: ${req.params.id} not found.`,
      });
    }
  })
);

//update a product
productRouter.put(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.id);
    if (product) {
      (product.name = req.body.name || product.name),
      (product.price = req.body.price || product.price),
        (product.category = req.body.category || product.category),
        (product.numberInStore =
          req.body.numberInStore || product.numberInStore),
        (product.image = req.body.image || product.image),
        (product.description = req.body.description || product.description),
        (product.countInStock = req.body.countInStock || product.countInStock),
        (product.brand = req.body.brand || product.brand),
        (product.sellerName = req.body.sellerName || product.sellerName),
        (product.sellerEmail = req.body.sellerEmail || product.sellerEmail),
        (product.sellerId = req.body.sellerId || product.sellerId),
        (product.sellerPhone = req.body.sellerPhone || product.sellerPhone),
        (product.productStore = req.body.productStore || product.productStore),
        (user = req.user._id);
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  })
);

productRouter.delete('/delete/:id', isAuth, (req, res) =>{
  Product.findByIdAndDelete(req.params.id)
  .then(data =>{
      if(!data){
          res.status(404).json({message: `Cannot delete product with id: ${id}, maybe id is wrong.`})
      }else{
          res.send("Product was deleted successfully.")
      }
  })
  .catch(err =>{
      res.status(500).json({
          message: err.message || `Could not delete product with id ${id}.`
      })
  })
})

//delete a user with specified id
// exports.delete = (req, res) =>{
//   const id = req.params.id;
//   UserDb.findByIdAndDelete(id)
//   .then(data =>{
//       if(!data){
//           res.status(404).json({message: `Cannot delete user with id: ${id}, maybe id is wrong.`})
//       }else{
//           res.send("User was deleted successfully.")
//       }
//   })
//   .catch(err =>{
//       res.status(500).json({
//           message: err.message || `Could not delete user with id ${id}.`
//       })
//   })
  
// }
module.exports = productRouter;
