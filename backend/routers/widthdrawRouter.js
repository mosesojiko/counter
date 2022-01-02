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
        productId: req.body.productId,
        requestedAt: Date.now(),
        user: req.user._id
    })
    const createWidthdraw = await widthdraw.save();
    res.json(createWidthdraw)
}))


//router to get history of widthdrawals
widthdrawRouter.get('/mywidthdrawals', isAuth, expressAsyncHandler(async(req, res)=>{
    const myWidthdrawals = await Widthdraw.find({user: req.user._id});
    if (myWidthdrawals) {
        res.json(myWidthdrawals)
    }
}))

// widthdrawRouter.get('/', isAuth, expressAsyncHandler(async (req, res) => {
//     const w = await Widthdraw.find({user:req.user._id})
//     res.json(w)
// }))

module.exports = widthdrawRouter