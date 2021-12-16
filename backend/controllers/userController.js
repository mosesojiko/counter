/* eslint-disable no-undef */
const expressAsyncHandler = require("express-async-handler");

const User = require("../models/userModel.js");

//search for chat users
const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
//except the logged in user, return every other match
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
    
});

module.exports = { allUsers };
