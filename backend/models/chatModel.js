// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  notification: { type: Boolean, default: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
    {
        timestamps:true
    }
);

const Chat = mongoose.model("Chat", chatSchema);

// eslint-disable-next-line no-undef
module.exports = Chat