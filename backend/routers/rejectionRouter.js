/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const rejectionRouter = express.Router();

const Reject = require('../models/rejectionModel.js');
const { isAuth } = require('../utils/isAuth.js');
const { isAdmin } = require('../utils/isAdmin.js');

//create a rejection 
rejectionRouter.post('/', isAuth, expressAsyncHandler( async(req, res) => {
    const reject = new Reject({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        orderId: req.body.orderId,
        complain: req.body.complain,
        complainedAt: Date.now()
    })
    const createRejection = await reject.save();
    res.json(createRejection)
}))


//router to get list of rejection
rejectionRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const rejects = await Reject.find({}).sort({ updatedAt: -1 });
    if (rejects) {
         res.json(rejects)
     }
}))


module.exports = rejectionRouter