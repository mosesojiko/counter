/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();

const User = require('../models/userModel.js');
const data = require('../data.js');
const { generateToken } = require('../utils/generateToken.js');

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

//Login router

userRouter.post('/login', expressAsyncHandler( async(req, res) => {
    const user = await User.findOne({email: req.body.email});

    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.status(201).json({
                message: "Login successful",
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            });
            return
        }
    }
    res.status(401).json({message: "Invalid email or password."})
}))


module.exports =  userRouter;