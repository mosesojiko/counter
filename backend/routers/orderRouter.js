/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');
const { isAuth } = require('../utils/isAuth.js');


const orderRouter = express.Router();

//router to get history of orders
orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id});
    res.json(orders)
}))

/
//get customer orders
// orderRouter.get('/customerorders', isAuth, expressAsyncHandler( async(req, res) =>{
//     const customerorders = await Order.find({email: req.body.userEmail});
//     if(customerorders) {
//       res.json(customerorders);
//     }else{
//         res.json({message: "Order not found."})
//     }
// }))

//update order after delivery
orderRouter.put('/delivered', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.body.id);
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
    }

    const deliveredOrder = await order.save()
    res.json(deliveredOrder)
}))

// Create an order
orderRouter.post('/', isAuth, expressAsyncHandler( async(req, res) =>{
    //check if order items contains order or not
    if(req.body.orderItems.length === 0) {
        res.status(400).json({message: 'Basket is empty'})
    }else{
        //to get information about the user that created this order, define a middleware called isAuth in utils folder
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            email: req.body.sellerEmail,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).json({
            message: "Your order has been created successfully",
            order: createdOrder
        })
    }
}));

//get details of a specific order
orderRouter.get('/:id', isAuth, expressAsyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        return res.json(order);
    }else {
        res.status(404).send({message: "Order not found."})
    }
}))

//update order after payment
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async(req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true,
        order.paidAt = Date.now();
        order.sellerEmail = req.body.sellerEmail;
        order.paymentResult = {
            id: req.body.id,
            update_time: Date.now(),
            email: req.body.email,
            phone: req.body.phone,
            name: req.body.name,
            amount: req.body.amount
        };
       

        const updatedOrder = await order.save();
        return res.status(201).json({
            message: "Order paid",
            order: updatedOrder
        })
    }else{
        res.status(404).json({message: "Order Not Found."})
    }
}))



module.exports = orderRouter;
