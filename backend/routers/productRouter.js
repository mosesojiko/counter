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
      image,
      countInStock,
      brand,
      description,
      sellerName,
      sellerEmail,
      sellerId,
      sellerPhone,
      productStoreId,
      storeName,
      storeAddress,
      storeCity,
      storeCountry,
    } = req.body;

    const product = new Product({
      name,
      price,
      category,
      image,
      countInStock,
      brand,
      description,
      sellerName,
      sellerEmail,
      sellerId,
      sellerPhone,
      productStoreId,
      storeName,
      storeAddress,
      storeCity,
      storeCountry,
      user: req.user._id,
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
      sellerName: createProduct.sellerName,
      sellerEmail: createProduct.sellerEmail,
      sellerId: createProduct.sellerId,
      sellerPhone: createProduct.sellerPhone,
      productStoreId: createProduct.productStoreId,
      storeName,
      storeAddress,
      storeCity,
      storeCountry,
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


//find paid/sold items
productRouter.get('/soldproducts', isAuth, expressAsyncHandler(async(req, res) => {
  const soldItems = await Product.find({user: req.user._id, isPaid:true}).sort({ updatedAt: -1 });
  if(soldItems){
      
      return res.json(soldItems)
    
  }else{
    return res.status(404).json({message: "There are no sold products at the moment"})
  }
}))


//find ordered items
productRouter.get('/orderedproducts', isAuth, expressAsyncHandler(async(req, res) => {
  const orderedItems = await Product.find({user: req.user._id, isOrdered:true, isPaid:false}).sort({ updatedAt: -1 });
  if(orderedItems){
      
      return res.json(orderedItems)
    
  }else{
    return res.status(404).json({message: "There are no ordered products at the moment"})
  }
}))

//get all user products
productRouter.get(
    "/user",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const userProducts = await Product.find({ user: req.user._id, isPaid:false }).sort({ updatedAt: -1 });
    res.json(userProducts);
  })
);

//get user products for non logged in user
productRouter.get('/nonuser/:id', expressAsyncHandler(async (req, res) => {
  const nonuserProducts = await Product.find({ productStoreId: req.params.id }).sort({ updatedAt: -1 });
  if (nonuserProducts) {
    res.json(nonuserProducts)
  }
}))

//get all products
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({isPosted: true, isPaid: false}).sort({ updatedAt: -1 });
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
        (product.image = req.body.image || product.image),
        (product.description = req.body.description || product.description),
        (product.countInStock = req.body.countInStock || product.countInStock),
        (product.brand = req.body.brand || product.brand),
        (product.sellerName = req.body.sellerName || product.sellerName),
        (product.sellerEmail = req.body.sellerEmail || product.sellerEmail),
        (product.sellerId = req.body.sellerId || product.sellerId),
        (product.sellerPhone = req.body.sellerPhone || product.sellerPhone),
        (product.productStoreId = req.body.productStoreId || product.productStoreId),
        (product.storeName = req.body.storeName || product.storeName),
        (product.storeAddress = req.body.storeAddress || product.storeAddress),
        (product.storeCity = req.body.storeCity || product.storeCity),
        (product.storeCountry = req.body.storeCountry || product.storeCountry),
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


//update a product to be posted
productRouter.put('/postproduct', isAuth, expressAsyncHandler( async(req,res) =>{
  const product = await Product.findById(req.body.id);
  if(product){
      product.isPosted = true;
  }
  const postedProduct = await product.save();
      res.json(postedProduct)
}))

//update a product to be unposted
productRouter.put('/unpostproduct', isAuth, expressAsyncHandler( async(req,res) =>{
  const product = await Product.findById(req.body.id);
  if(product){
      product.isPosted = false;
  }
  const unPostedProduct = await product.save();
      res.json(unPostedProduct)
}))

//update a product when it is ordered
productRouter.put('/placeorder', expressAsyncHandler( async(req, res) => {
  const product = await Product.findById(req.body.id);
  if(product) {
    product.isOrdered = true;
    product.buyerName = req.body.buyerName;
    product.buyerPhone = req.body.buyerPhone;
    product.buyerAddress = req.body.buyerAddress;
    product.buyerId = req.body.buyerId;
  }
  const orderedProduct = await product.save();
  res.json(orderedProduct);
}))

//update a product when it is paid for
productRouter.put('/paidproducts', expressAsyncHandler( async(req, res) => {
  const product = await Product.findById(req.body.id);
  if(product) {
    product.isPaid = true;
    product.isPosted = false;
    product.isPaidAt = Date.now()
    product.buyerEmail = req.body.buyerEmail
    product.orderId = req.body.orderId
  }
  const paidProduct = await product.save();
  res.json(paidProduct);
}))

//update a product when it is delivered
productRouter.put('/isdelivered', expressAsyncHandler( async(req, res) => {
  const product = await Product.findById(req.body.id);
  if(product) {
    product.isDelivered = true;
    product.isDeliveredAt = Date.now()
  }
  const deliveredProduct = await product.save();
  res.json(deliveredProduct);
}))



module.exports = productRouter;
