/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const feedbackRouter = express.Router();

const Feedback = require('../models/feedbackModel.js');

//create a feedback
feedbackRouter.post('/', expressAsyncHandler(async (req, res) => {
    const feedback = new Feedback({
        name: req.body.name,
        message: req.body.message
    })
    const createFeedback = await feedback.save()
    res.json(createFeedback);
}))

//get feedback
feedbackRouter.get('/', expressAsyncHandler(async (req, res) => {
    const myFeedbacks = await Feedback.find({}).sort({ updatedAt: -1 })
    if (myFeedbacks) {
        res.json(myFeedbacks)
    }
}))


module.exports = feedbackRouter;