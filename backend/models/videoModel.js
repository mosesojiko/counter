// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    title: { type: String, required: true },
    video: { type: String},
    source: { type: String },
    videoFilePath:{type:String}
}, {
    timestamps: true
})

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;