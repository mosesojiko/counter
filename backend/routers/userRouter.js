/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();
var nodemailer = require('nodemailer');

const User = require('../models/userModel.js');
const { generateToken } = require('../utils/generateToken.js');
const { isAuth } = require('../utils/isAuth.js');
const { allUsers } = require('../controllers/userController.js');
const { isAdmin } = require('../utils/isAdmin.js');


// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)




// register router
userRouter.post('/register', expressAsyncHandler( async(req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
        image: req.body.image,
      terms:req.body.terms
    });

    //check if user exist with the same email
    const existingUser = await User.findOne({email: req.body.email});
    if(existingUser){
        return res.status(500).json({ message: "Email already used by another user" });
    }

    const createdUser = await user.save();
    //send verification link to the user's email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    let mailOptions = {
      from: "contact@mosganda.com",
      to: req.body.email,
        subject: 'Account Activation Link',
       html: `  <h1 style="color:#fff; color:green; text-align:center;padding:10px;">Account Verification</h1>
                <h2 style="margin:10px">Please click on the link below to activate your account</h2>
                <a href="http://localhost:3000/login" style="text-align:center; background-color: green; padding:10px; font-size:20px; color:white; margin:20px 10px;text-decoration:none">Verify</a>
            `,
    //   text: 'Hi from your Mosganda project'
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    
    res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        isBanned: createdUser.isBanned,
        isActive: createdUser.isActive,
        image: createdUser.image,
        terms: createdUser.terms,
        status: createdUser.status,
        token: generateToken(createdUser)
    })
}))

//search for users
userRouter.get('/search', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  const searchUser = await User.find(
          { name: { $regex: req.query.search, $options: "i" }, _id: { $ne: req.user._id } },
  );
  if (searchUser) {
    res.json(searchUser)
  }
}))



//get all users for admin
userRouter.get('/find', isAuth, isAdmin, expressAsyncHandler( async(req, res)=> {
    const findUsers = await User.find({});
    if (findUsers) {
        res.json(findUsers);
    }

}));

// //find chat users
// userRouter.get('/chat', isAuth, expressAsyncHandler(async (req, res) => {
//     const users = await User.find({name: { $regex: req.query.search, $options: "i" }});
//     res.json(users)
   
// }))

userRouter.get('/', isAuth, allUsers)
//Login router

userRouter.post('/login', expressAsyncHandler( async(req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (user) {
        if (user.isBanned) {
        res.status(401).json({ message: "You are blocked." })
        return
    }
        const token = generateToken(user);
        if(bcrypt.compareSync(req.body.password, user.password)){
            
            res.status(201).json({
                message: "Login successful",
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                address: user.address,
                isBanned: user.isBanned,
                isActive: user.isActive,
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
        user.address = req.body.address || user.address;
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
          isBanned: updatedUser.isBanned,
          isActive: updatedUser.isActive,
          phone: updatedUser.phone,
          address: updatedUser.address,
          image: updatedUser.image,
          token: generateToken(updatedUser),
        });
    }
}))


//update a user that created a store
userRouter.put('/createstore', isAuth, expressAsyncHandler( async(req,res) =>{
    const user = await User.findById(req.body.user);
    if(user){
        user.isSeller = true;
    }
    const updatedUser = await user.save();
  res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isSeller: updatedUser.isSeller,
          isBanned: updatedUser.isBanned,
          isActive: updatedUser.isActive,
          phone: updatedUser.phone,
          address: updatedUser.address,
          image: updatedUser.image,
          token: generateToken(updatedUser)
  })
}))

//block a user
userRouter.put('/banned', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
        user.isBanned = true
    }
    const bannedUser = await user.save()
    res.json(bannedUser)
}))

//unblock a user
userRouter.put('/unbanned', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    if (user) {
        user.isBanned = false
    }
    const bannedUser = await user.save()
    res.json(bannedUser)
}))


//login with google


// userRouter.post("/auth/google", async (req, res) => {
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID
//     });
//     const { name, email, picture } = ticket.getPayload();
//     const user = await User.upsert({
//          where: { email: email },
//          update: { name, picture },
//         create: { name, email, picture }
//     })
    
//     res.status(201)
//     res.json(user)
// })

//send link to reset password
userRouter.post('/forgotpassword', expressAsyncHandler(async (req, res) => {
  // text: `http://localhost:5000/api/v1/user/reset-password/${user._id}/${token}

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ message: `No user with email: ${req.body.email} in our database.` })
  } else {
    const link = `http://localhost:3000/resetpassword/${user._id}`
    //send reset link to the user's email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    let mailOptions = {
      from: "contact@mosganda.com",
      to: req.body.email,
        subject: 'Password Reset',
       html: `  <h2 style="color:#fff; color:green; text-align:center;padding:10px;">Mosganda -- Forgot password</h2>
                <h3 style="margin:10px">Please click on the link below to reset your password.</h3>
                <a href=${link} style="text-align:center; background-color: #1c86ee; padding:10px; font-size:20px; color:white; margin:20px 10px;text-decoration:none">Reset Link</a>
                <p style="margin:10px">If you do not know about this message, then someone is trying to hack your account. Kindly, ignore and delete this message.</p>
            `,
    //   text: 'Hi from your Mosganda project'
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
        res.json({
          message: "Password reset link has been sent to your email.",
        })
      }
    });
    
  }
  
}))

//get a new password
userRouter.put('/resetpassword/:id', expressAsyncHandler((async (req, res) => {

   const user = await User.findById(req.params.id);
  if (user) {
     user.password = bcrypt.hashSync(req.body.password, 8) || user.password
  }

  const updatedUser = await user.save();
  res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isSeller: updatedUser.isSeller,
          isBanned: updatedUser.isBanned,
          isActive: updatedUser.isActive,
          phone: updatedUser.phone,
          address: updatedUser.address,
          image: updatedUser.image,
         token: generateToken(updatedUser)
  })
})))


module.exports =  userRouter;