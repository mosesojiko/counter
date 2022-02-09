/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const withdrawRouter = express.Router();

const Withdraw = require('../models/withdrawModel.js');
const { isAuth } = require('../utils/isAuth.js');
const { isAdmin } = require('../utils/isAdmin.js');

//create a widthdraw 
withdrawRouter.post('/create', isAuth, expressAsyncHandler( async(req, res) => {
    const withdraw = new Withdraw({
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
    const createWithdraw = await withdraw.save();
    res.json(createWithdraw)
}))


//router to get history of widthdrawals
withdrawRouter.get('/mywithdrawals', isAuth, expressAsyncHandler(async(req, res)=>{
    const myWithdrawals = await Withdraw.find({user: req.user._id}).sort({ updatedAt: -1 });
    if (myWithdrawals) {
        res.json(myWithdrawals)
    }
}))

withdrawRouter.get('/admin', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const w = await Withdraw.find({}).sort({ updatedAt: -1 })
    if (w) {
        res.json(w)
    }
}))

withdrawRouter.put('/ispaid', expressAsyncHandler( async(req, res) => {
  const withs = await Withdraw.findById(req.body.id);
  if(withs) {
    withs.isPaid = true;
    withs.isPaidAt = Date.now()
  }
  const paidWithdraw = await withs.save();
  res.json(paidWithdraw);
}))



module.exports = withdrawRouter