/* eslint-disable no-undef */
const mongoose = require('mongoose');

const rejectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    orderId: { type: String, required: true },
    email: { type: String, required: true },
    complain: { type: String, required: true },
    complainedAt: { type: Date },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Reject = mongoose.model('Reject', rejectionSchema)
// eslint-disable-next-line no-undef
module.exports = Reject;