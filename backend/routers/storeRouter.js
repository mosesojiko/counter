/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const storeRouter = express.Router();

const Mosgandastore = require('../models/storeModel.js');


//get all stores
storeRouter.get('/', expressAsyncHandler( async(req, res) =>{
    const stores = await Mosgandastore.find({});
    res.json(stores);
}))

//create a store 
storeRouter.post('/createstore', expressAsyncHandler( async(req, res) =>{
    const { name, address, city, description, image } =
    req.body;

    const store = new Mosgandastore({
        name, address, city, description, image,
    });
    const createdStore = await store.save();
    res.json({
        _id: createdStore._id,
        name: createdStore.name,
        address: createdStore.address,
        city: createdStore.city,
        description: createdStore.description,
        image: createdStore.image
        
    })
  
}))


module.exports = storeRouter;