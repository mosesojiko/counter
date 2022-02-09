/* eslint-disable no-undef */
const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, reqired: true},
        image: {type: String, required: true},
        price: { type: Number, required: true },
        free: { type: Number },
        sameCity: { type: Number },
        sameState: { type: Number },
        nationWide: { type: Number },
        deliveryCost: { type: Number },
        service: { type: Number },
        storeId: {type: String},
        storeName: {type: String},
        storeAddress: {type: String},
        storeCity: { type: String },
        storeState: {type: String},
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
        landmark: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        phone: { type: String, required: true },
        deliveryFee: {type:Number}
    },
    paymentMethod: { type: String, required: true },
    deliveryFee: { type: Number },
     buyerService: {type: Number},
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
    email: {type: String},
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