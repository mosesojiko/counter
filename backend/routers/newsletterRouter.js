/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');

const newsletterRouter = express.Router();

const Newsletter = require('../models/newsletterModel.js');
const { isAuth } = require('../utils/isAuth.js');
const { isAdmin } = require('../utils/isAdmin.js');


//create a newsletter
newsletterRouter.post('/create', expressAsyncHandler( async(req, res) => {
    const myNewsletter = new Newsletter({
        newsEmail: req.body.newsEmail,
    })
    //check if email already exist
    const checkEmail = await Newsletter.findOne({ newsEmail: req.body.newsEmail });
    if (checkEmail) {
        res.json({ message: "Subscribed already." })
        return
    }
        const createNewsletter = await myNewsletter.save();
        res.json(createNewsletter)
}))


//router to get list of newsletters emails
newsletterRouter.get('/', isAuth, isAdmin,  expressAsyncHandler(async(req, res)=>{
    const newsletters = await Newsletter.find({}).sort({ updatedAt: -1 });
    if (newsletters) {
         res.json(newsletters)
     }
}))


module.exports = newsletterRouter;