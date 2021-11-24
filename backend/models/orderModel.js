/* eslint-disable no-undef */
const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, reqired: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        storeId: {type: String},
        storeName: {type: String},
        storeAddress: {type: String},
        storeCity: {type: String},
        storeCountry: {type: String},
        sellerName: {type: String},
        sellerEmail: {type: String},
        sellerPhone: {type: String},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
        },
    },],
    shippingAddress: {
        fullName: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod: {type: String, required: true},
    paymentResult: {
        id: String,
        update_time: { type: Date},
        name: String,
        email: String,
        amount: Number,
        phone: String,
    },
    itemsPrice: {type: Number, required:true},
    shippingPrice: {type: Number, required:true},
    totalPrice: {type: Number, required:true},
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},
},
{
    timestamps: true,
}
);

const Order = mongoose.model("Order", orderShema)

module.exports = Order;