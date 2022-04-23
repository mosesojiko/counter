/* eslint-disable no-undef */
const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema(
    {
        newsEmail: { type: String, required: true, },
    },
  {
    timestamps: true,
  }
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema)
// eslint-disable-next-line no-undef
module.exports = Newsletter;