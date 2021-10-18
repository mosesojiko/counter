/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const storeRouter = express.Router();

const Mosgandastore = require('../models/storeModel.js');
const { isAuth } = require('../utils/isAuth.js');


//get all stores that are posted
storeRouter.get('/', expressAsyncHandler( async(req, res) =>{
    const stores = await Mosgandastore.find({isPosted: true});
    if(!stores) {
        res.status(404).json({message:"No store has been posted here."})
        return
    }
    res.json(stores);
}))

//find store created by a user
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
    const { name, address, city, state, country, description, image } =
    req.body;

    const store = new Mosgandastore({
        name, address, city, state, country, description, image, user: req.user._id
    });
    const createdStore = await store.save();
    res.json({
        _id: createdStore._id,
        name: createdStore.name,
        address: createdStore.address,
        city: createdStore.city,
        state: createdStore.state,
        country: createdStore.country,
        description: createdStore.description,
        image: createdStore.image,
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

//update a store
storeRouter.put('/editstore', isAuth, expressAsyncHandler( async(req, res) => {
    const store = await Mosgandastore.findById(req.body.id);
    if(store) {
        store.name = req.body.name || store.name;
        store.address = req.body.address || store.address;
        store.city = req.body.city || store.city;
        store.state = req.body.state || store.state;
        store.country = req.body.country || store.country;
        store.description = req.body.description || store.description;
        store.image = req.body.image || store.image;
        user = req.user._id
    }
    const editedStore = await store.save();
    res.json(editedStore)
}))


//update a user that created a store
storeRouter.put('/userstore', isAuth, expressAsyncHandler( async(req,res) =>{
    const store = await Mosgandastore.findById(req.body.id);
    if(store){
        store.isPosted = true;
    }
    const updatedStore = await save.save();
        res.json(updatedStore)
}))
module.exports = storeRouter;