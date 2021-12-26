/* eslint-disable no-undef */
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
//const bcrypt = require("bcryptjs");
const messageRouter = express.Router();

const Chat = require("../models/chatModel.js");
const User = require("../models/userModel.js");
const Message = require('../models/messageModel.js')
//const { generateToken } = require("../utils/generateToken.js");
const { isAuth } = require("../utils/isAuth.js");


// create a message
messageRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body
    if (!content || !chatId) {
        return res.status(400).json({message: "Invalid data passed into request."})
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }
    try {
        let message = await Message.create(newMessage);
        //populate the instance of mongoose class, not directly been populated
        message = await message.populate("sender", "name image");
        //also populate everything in chat
        message = await message.populate("chat");
        //also populate users in a chat
        message = await User.populate(message, {
          path: "chat.users",
          select: "name email image",
        });

        //findbyId and update the chat with the latest message
        await Chat.findByIdAndUpdate(req.body.chatId, {
          latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}))

//get all the messages for a particular chat
messageRouter.get('/:chatId', isAuth, expressAsyncHandler(async (req, res) => {
    const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name image email").populate("chat");
    res.json(messages)
}))

messageRouter.get('/', expressAsyncHandler(async (req, res) => {
    const m = await Message.find({})
    if (m) {
        res.json(m)
    }
}))


module.exports = messageRouter;