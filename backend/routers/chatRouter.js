/* eslint-disable no-undef */
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
//const bcrypt = require("bcryptjs");
const chatRouter = express.Router();

const Chat = require("../models/chatModel.js");
const User = require("../models/userModel.js");
//const { generateToken } = require("../utils/generateToken.js");
const { isAuth } = require("../utils/isAuth.js");


// create chat
chatRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;

    // if (!userId) {
    //     res.status(400).json({message: "Chat not found."})
    // }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password")
        .populate("latestMessage");
    
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name image email",
    });

    if (isChat.length > 0) {
      res.json(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
}))

// get chats from a particular user
chatRouter.get('/', isAuth, expressAsyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
          .then(async (results) => {
            results = await User.populate(results, {
              path: "latestMessage.sender",
              select: "name image email",
            });
            res.status(200).send(results);
          });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}))


module.exports = chatRouter