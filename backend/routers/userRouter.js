/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const userRouter = express.Router();

const User = require('../models/userModel.js');
const data = require('../data.js');

//create user
userRouter.get('/', expressAsyncHandler( async(req, res)=> {
    const createUsers = await User.insertMany(data.users);
    res.json(createUsers);

}));

//get users
userRouter.get('/find', expressAsyncHandler( async(req, res)=> {
    const findUsers = await User.find({});
    res.json(findUsers);

}));


module.exports =  userRouter;