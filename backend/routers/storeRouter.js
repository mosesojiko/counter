/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const storeRouter = express.Router();

const Mosgandastore = require('../models/storeModel.js');
const { isAuth } = require('../utils/isAuth.js');


//get all stores
storeRouter.get('/', expressAsyncHandler( async(req, res) =>{
    const stores = await Mosgandastore.find({});
    res.json(stores);
}))


storeRouter.get('/userstore', isAuth, expressAsyncHandler(async(req, res)=>{
    const userStore = await Mosgandastore.findOne({user: req.user._id});
    if(userStore) {
        res.json(userStore)
       }else{
           res.send("Owner store not found.")
       }
}))

//create a store 
storeRouter.post('/createstore', isAuth, expressAsyncHandler( async(req, res) =>{
    const { name, address, city, description, image, 
        storeCreatorId, storeCreatorName, storeCreatorPhone, 
        storeCreatorEmail, storeCreatorImage } =
    req.body;

    const store = new Mosgandastore({
        name, address, city, description, image, storeCreatorId,
        storeCreatorName, storeCreatorPhone, 
        storeCreatorEmail, storeCreatorImage, user: req.user._id
    });
    const createdStore = await store.save();
    res.json({
        _id: createdStore._id,
        name: createdStore.name,
        address: createdStore.address,
        city: createdStore.city,
        description: createdStore.description,
        image: createdStore.image,
        storeCreatorId: createdStore.storeCreatorId,
        storeCreatorName: createdStore.storeCreatorName,
        storeCreatorPhone: createdStore.storeCreatorPhone,
        storeCreatorEmail: createdStore.storeCreatorEmail,
        storeCreatorImage: createdStore.storeCreatorImage,
        user: req.user._id,
        
    })
  
}))

//get store details, single store
storeRouter.get('/:id', expressAsyncHandler( async(req, res)=>{
    const singleStore = await Mosgandastore.findById(req.params.id);
    if(singleStore){
        res.json(singleStore);
    }else{
        res.status(404).json({
            message: `Store with id: ${req.params.id} not found.`
        })
    }
}));


module.exports = storeRouter;