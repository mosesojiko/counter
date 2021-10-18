// eslint-disable-next-line no-undef
const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    numberInStore: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    countInStock: {type: Number, required: true},
    rating: {type: Number, required: true},
    numReviews: {type: Number, required: true},
    isPosted: {type: Boolean, default: false},
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
// eslint-disable-next-line no-undef
module.exports = Product;