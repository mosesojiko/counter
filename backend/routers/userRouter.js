/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const userRouter = express.Router();

const User = require('../models/userModel.js');
const data = require('../data.js');

userRouter.get('/seed', expressAsyncHandler( async(req, res)=> {
    const createUsers = await User.insertMany(data.users);
    res.json(createUsers);

}));

module.exports =  userRouter;