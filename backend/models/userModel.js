// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    isSeller: {type: Boolean, default: false},
    phone: {type: String},
    businessEmail: {type: String},
    image: {type: String},
    storeDetails: {
        name: {type: String},
        address: {type: String},
        city: {type: String},
        description:{type: String},
        imageUrl:{type: String},
        country: {type: String},
        userStore: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mosgandastores', 
        },
    },
},
{
    timestamps:true
}
);

const User = mongoose.model('User', userSchema)
// eslint-disable-next-line no-undef
module.exports = User;