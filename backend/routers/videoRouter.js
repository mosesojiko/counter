/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');

const videoRouter = express.Router();

const Video = require('../models/videoModel.js');
//const { isAuth } = require('../utils/isAuth.js');
//const { isAdmin } = require('../utils/isAdmin.js');


//create a video
videoRouter.post('/', expressAsyncHandler(async (req, res) => {
    const createVideo = new Video({
        title: req.body.title,
        video: req.body.video,
        source: req.body.source,
        videoFilePath: req.body.videoFilePath
    })

    const createdVideo = await createVideo.save();
    res.json(createdVideo);
}))

//get video
videoRouter.get('/', expressAsyncHandler(async (req, res) => {
    const video = await Video.find({}).sort({ updatedAt: -1 });
    if (video) {
        res.json(video)
    }
}))

module.exports = videoRouter;