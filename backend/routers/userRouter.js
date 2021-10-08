/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();

const User = require('../models/userModel.js');
const data = require('../data.js');
const { generateToken } = require('../utils/generateToken.js');
const { isAuth } = require('../utils/isAuth.js')

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
        const token = generateToken(user);
        if(bcrypt.compareSync(req.body.password, user.password)){
            
            res.status(201).json({
                message: "Login successful",
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token
            });
            return
        }
    }
    res.status(401).json({message: "Invalid email or password."})
}))

// register router
userRouter.post('/register', expressAsyncHandler( async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();
    res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        token: generateToken(createdUser)
    })
}))

//route for user details
userRouter.get('/:id', expressAsyncHandler( async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user)
    }else{
        res.status(404).send({message: "User Not Found"})
    }
}))

//route to update a user
userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        })
    }
}))

module.exports =  userRouter;