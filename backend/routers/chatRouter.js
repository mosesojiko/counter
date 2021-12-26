/* eslint-disable no-undef */
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controllers/chatController.js");
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
// chatRouter.get('/every', expressAsyncHandler(async (req, res) => {
//     const chat = await Chat.find({})
//     res.json(chat)
// }))

chatRouter.get('/findnotification', isAuth, expressAsyncHandler(async (req, res) => {
  try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } }, notification:true })
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

  // const chatNotification = await Chat.find({users: { $elemMatch: { $eq: req.user._id } }, notification:true})
  // if (chatNotification) {
  //   res.json(chatNotification)
  // } else {
  //   res.json({message:"not found"})
  // }
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

//Create group chat
chatRouter.post('/group', isAuth, createGroupChat);

//rename group
chatRouter.put("/rename", isAuth, renameGroup);

//remove a user from group
chatRouter.put('/groupremove', isAuth, removeFromGroup)

//add someone to group
chatRouter.put('/groupadd', isAuth, addToGroup)

//edit chat for notification to be true
chatRouter.put('/notification', isAuth, expressAsyncHandler( async(req,res) =>{
    const chat = await Chat.findById(req.body.id);
    if(chat){
        chat.notification = true;
    }
    const notifiedChat = await chat.save();
        res.json(notifiedChat)
}))


//edit chat for notification to be false
chatRouter.put('/unnotification', isAuth, expressAsyncHandler( async(req,res) =>{
    const chat = await Chat.findById(req.body.id);
    if(chat){
        chat.notification = false;
    }
    const unNotifiedChat = await chat.save();
        res.json(unNotifiedChat)
}))



module.exports = chatRouter