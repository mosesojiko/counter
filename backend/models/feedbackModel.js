/* eslint-disable no-undef */
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema)
// eslint-disable-next-line no-undef
module.exports = Feedback;