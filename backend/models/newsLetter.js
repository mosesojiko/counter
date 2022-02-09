// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const newsLetterSchema = mongoose.Schema({
     email: { type: String, required: true, unique: true },
}, {
    timestamps: true
})

const newsLetter = mongoose.model('Newsletter', newsLetterSchema);

module.exports = newsLetter;