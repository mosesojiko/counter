/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const storeRouter = express.Router();

const Mosgandastore = require('../models/storeModel.js');
//const Product = require('../models/productModel.js');
//const User = require("../models/userModel.js");
const { isAuth } = require('../utils/isAuth.js');
const { isAdmin } = require('../utils/isAdmin.js');


//get all stores that are posted
storeRouter.get('/', expressAsyncHandler( async(req, res) =>{
    const stores = await Mosgandastore.find({isPosted: true}).sort({ updatedAt: -1 });
    if(!stores) {
       return res.status(404).json({message:"No store has been posted here."})
    }
    res.json(stores);
}))


//search for stores by name or category
storeRouter.get('/search', expressAsyncHandler(async (req, res) => {
    const searchStore = await Mosgandastore.find(
        {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
      ],
      isPosted:true
      }
      );
  if (searchStore) {
    res.json(searchStore)
  }
}))

//storelist for admin
//search for stores by name or category
storeRouter.get('/searchforadmin', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const searchStore = await Mosgandastore.find(
        {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { category: { $regex: req.query.search, $options: "i" } },
      ],
      isPosted:true
      }
      );
  if (searchStore) {
    res.json(searchStore)
  }
}))

//get all stores for admin
storeRouter.get('/admin', isAuth, isAdmin, expressAsyncHandler( async(req, res) =>{
    const stores = await Mosgandastore.find({}).sort({ updatedAt: -1 });
    if(!stores) {
       return res.status(404).json({message:"No store has been posted here."})
    }
    res.json(stores);
}))

//find store created by a user
storeRouter.get('/userstore', isAuth, expressAsyncHandler(async(req, res)=>{
    const userStore = await Mosgandastore.findOne({user: req.user._id});
    if(userStore) {
        return res.json(userStore)
       }else{
           res.send("Owner store not found.")
       }
}))

//create a store 
storeRouter.post('/createstore', isAuth, expressAsyncHandler( async(req, res) =>{
    const { name, address, category, city, state, country, description, deliveryCapacity, image, creatorId, creatorName, creatorEmail, creatorPhone, creatorImage, businessName } =
        req.body;

        const store = new Mosgandastore({
          name,
            address,
          category,
          city,
          state,
          country,
          description,
            image,
          deliveryCapacity,
          creatorId,
          creatorName,
          creatorEmail,
          creatorPhone,
          creatorImage,
          businessName,
          user: req.user._id,
        });
        const createdStore = await store.save();
        res.json({
          _id: createdStore._id,
          name: createdStore.name,
            address: createdStore.address,
          category: createdStore.category,
          city: createdStore.city,
          state: createdStore.state,
          country: createdStore.country,
          description: createdStore.description,
            image: createdStore.image,
          deliveryCapacity: createdStore.deliveryCapacity,
          creatorId: createdStore.creatorId,
          creatorName: createdStore.creatorName,
          creatorEmail: createdStore.creatorEmail,
          creatorPhone: createdStore.creatorPhone,
            creatorImage: createdStore.creatorImage,
          businessName: createdStore.businessName,
            user: req.user._id,
        });
        
}))

//get store details, single store and its product for non logged in user
storeRouter.get('/:id', expressAsyncHandler( async(req, res)=>{
    const singleStore = await Mosgandastore.findById(req.params.id);
    //const products = await Product.find({productStore:req.params.id})
    
    if(singleStore){
        return res.json({
            singleStore,
           
        });
    }else{
        res.status(404).json({
            message: `Store with id: ${req.params.id} not found.`
        })
    }
}));

//get store for non user using business name
// storeRouter.get('/bizname', expressAsyncHandler(async (req, res) => {
//     const bizname = await Mosgandastore.findOne({ businessName: req.body.name });
//     if (bizname) {
//         return res.json({
//             bizname
//         })
//     } else {
//         res.status(404).json({
//             message: "Store Not Found"
//         })
//     }
// }))

//update a store
storeRouter.put('/editstore', isAuth, expressAsyncHandler( async(req, res) => {
    const store = await Mosgandastore.findById(req.body.id);
    if(store) {
        store.name = req.body.name || store.name;
        store.address = req.body.address || store.address;
        store.category = req.body.category || store.category;
        store.city = req.body.city || store.city;
        store.state = req.body.state || store.state;
        store.country = req.body.country || store.country;
        store.description = req.body.description || store.description;
        store.image = req.body.image || store.image;
         store.deliveryCapacity = req.body.deliveryCapacity || store.deliveryCapacity;
        store.creatorId = req.body.creatorId || store.creatorId,
        store.creatorName = req.body.creatorName || store.creatorName,
        store.creatorEmail = req.body.creatorEmail || store.creatorEmail,
        store.creatorPhone = req.body.creatorPhone || store.creatorPhone,
        store.creatorImage = req.body.creatorImage || store.creatorImage
        user = req.user._id
    }
    const editedStore = await store.save();
    res.json(editedStore)
}))


//update a store to be posted
storeRouter.put('/poststore', isAuth, expressAsyncHandler( async(req,res) =>{
    const store = await Mosgandastore.findById(req.body.id);
    if(store){
        store.isPosted = true;
    }
    const updatedStore = await store.save();
        res.json(updatedStore)
}))

//update a store to be unposted
storeRouter.put('/unpoststore', isAuth, expressAsyncHandler( async(req,res) =>{
    const store = await Mosgandastore.findById(req.body.id);
    if(store){
        store.isPosted = false;
    }
    const updatedStore = await store.save();
        res.json(updatedStore)
}))

//block a user's store
storeRouter.put('/banned', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const store = await Mosgandastore.findOne({user:req.body.id});
    if (store) {
        store.isBanned = true
    }
    const bannedStore = await store.save()
    res.json(bannedStore)
}))

//unblock a user's store
storeRouter.put('/unbanned', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const store = await Mosgandastore.findOne({user:req.body.id});
    if (store) {
        store.isBanned = false
    }
    const bannedStore = await store.save()
    res.json(bannedStore)
}))


//close your store when not available
storeRouter.put('/closestore', isAuth, expressAsyncHandler(async (req, res) => {
    const userstore = await Mosgandastore.findOne({ user: req.user._id });
    if (userstore) {
        userstore.isClosed = true
        userstore.toBeOpened = req.body.toBeOpened || userstore.toBeOpened
        userstore.isPosted = false
    }

    const closedstore = await userstore.save()
    res.json(closedstore)
}))

//open store when available
storeRouter.put('/openstore', isAuth, expressAsyncHandler(async (req, res) => {
    const store = await Mosgandastore.findById(req.body.id);
    if (store) {
        store.isClosed = false
    }
    const openedstore = await store.save()
    res.json(openedstore)
}))


module.exports = storeRouter;

