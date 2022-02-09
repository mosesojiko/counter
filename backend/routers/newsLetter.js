/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');

const newsletterRouter = express.Router();

const Newsletter = require('../models/newsLetter.js');
const { isAuth } = require('../utils/isAuth.js');
const { isAdmin } = require('../utils/isAdmin.js');


//create a newsletter
newsletterRouter.post('/', expressAsyncHandler( async(req, res) => {
    const myNewsletter = new Newsletter({
        email: req.body.newsEmail,
    })
    const findEmail = Newsletter.findOne({ email: req.body.newsEmail });
    if (findEmail) {
        res.json("Subscribed already")
        return
    }
    else {
        const createNewsletter = await myNewsletter.save();
        res.json(createNewsletter)
        return
    }
}))


//router to get list of newsletters emails
newsletterRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const newsletters = await Newsletter.find({}).sort({ updatedAt: -1 });
    if (newsletters) {
         res.json(newsletters)
     }
}))


module.exports = newsletterRouter;