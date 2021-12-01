/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const widthdrawRouter = express.Router();

const Widthdraw = require('../models/widthdrawModel.js');
const { isAuth } = require('../utils/isAuth.js');

//create a widthdraw 
widthdrawRouter.post('/create', isAuth, expressAsyncHandler( async(req, res) => {
    const widthdraw = new Widthdraw({
        accountName: req.body.accountName,
        accountNumber: req.body.accountNumber,
        bank: req.body.bank,
        amount: req.body.amount,
        email: req.body.email,
        phone: req.body.phone,
        requestedAt: Date.now()
    })
    const createWidthdraw = await widthdraw.save();
    res.json(createWidthdraw)
}))


//router to get history of widthdrawals
widthdrawRouter.get('/findwidthdrawals', isAuth, expressAsyncHandler(async(req, res)=>{
    const widths = await Widthdraw.find({user: req.user._id});
    res.json(widths)
}))


module.exports = widthdrawRouter