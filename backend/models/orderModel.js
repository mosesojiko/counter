import mongooses from 'mongoose';

const orderShema = new mongooses.Schema({
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, reqired: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        product: {
            type: mongooses.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
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
    itemsPrice: {type: Number, required:true},
    shippingPrice: {type: Number, required:true},
    taxPrice: {type: Number, required:true},
    totalPrice: {type: Number, required:true},
    user: {
        type: mongooses.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
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

const Order = mongooses.model("Order", orderShema)

export default Order;