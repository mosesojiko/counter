/* eslint-disable no-undef */
const mongoose = require ('mongoose');

const storeSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
    city: {type: String},
    description: {type: String},
    image: {type: String},
}, {
    timestamps: true
});

const Mosgandastore = mongoose.model('Mosgandastore', storeSchema);
// eslint-disable-next-line no-undef
module.exports = Mosgandastore;