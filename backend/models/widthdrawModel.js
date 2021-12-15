/* eslint-disable no-undef */
const mongoose = require('mongoose');

const widthdrawSchema = new mongoose.Schema(
  {
    accountName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    bank: { type: String, required: true },
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    isPaidAt: { type: Boolean, default: false },
    requestedAt: { type: Date },
    phone: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Widthdraw = mongoose.model('Widthdraw', widthdrawSchema)
// eslint-disable-next-line no-undef
module.exports = Widthdraw;