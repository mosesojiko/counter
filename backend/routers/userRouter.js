/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();

const User = require('../models/userModel.js');
const { generateToken } = require('../utils/generateToken.js');
const { isAuth } = require('../utils/isAuth.js');




// register router
userRouter.post('/register', expressAsyncHandler( async(req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      image: req.body.image 
    });
    const existingUser = await User.findOne({email: req.body.email});
    if(existingUser){
        res.status(500).json({message: "Email already used by another user"});
        return
    }

    const createdUser = await user.save();
    res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        image: createdUser.image,
        token: generateToken(createdUser)
    })
}))



//get users
userRouter.get('/find', expressAsyncHandler( async(req, res)=> {
    const findUsers = await User.find({});
    res.json(findUsers);

}));

//find chat users
userRouter.get('/chat', isAuth, expressAsyncHandler(async (req, res) => {
    const users = await User.find({name: { $regex: req.query.search, $options: "i" }});
    res.json(users)
   
}))

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
                businessEmail: user.businessEmail,
                phone: user.phone,
                image: user.image,
                token
            });
            return
        }
    }
    res.status(401).json({message: "Invalid email or password."})
}))


//route for user details
userRouter.get('/:id', isAuth, expressAsyncHandler( async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        res.json(user)
    }else{
        res.status(404).send({message: "User Not Found"})
    }
}))


//route to update a user
userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.businessEmail = req.body.businessEmail || user.businessEmail;
        user.image = req.body.image || user.image;
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: updatedUser.isSeller,
            phone: updatedUser.phone,
            businessEmail: updatedUser.businessEmail,
            image: updatedUser.image,
            
        })
    }
}))


//update a user that created a store
userRouter.put('/createstore', isAuth, expressAsyncHandler( async(req,res) =>{
    const user = await User.findById(req.body.user);
    if(user){
        user.isSeller = true;
    }
    const updatedUser = await user.save();
        res.json(updatedUser)
}))

module.exports =  userRouter;