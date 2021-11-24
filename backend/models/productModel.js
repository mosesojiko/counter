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
    isPosted: {type: Boolean, default: false},
    isSold: {type: Boolean, default: false},
    isOrdered: {type: Boolean, default: false},
    isPaid: {type: Boolean, default: false},
    sellerName: {type: String},
    sellerEmail: {type: String},
    sellerId: {type: String},
    sellerPhone: {type: String},
    productStoreId: {type: String},
    storeName: {type: String},
    storeAddress: {type: String},
    storeCity: {type: String},
    storeCountry: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    storeDetails: {
        store: {type: mongoose.Schema.Types.ObjectId, 
        ref: "Mosgandastore",
        },
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
// eslint-disable-next-line no-undef
module.exports = Product;