/* eslint-disable no-undef */
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');
const { isAuth } = require('../utils/isAuth.js');
const { isAdmin } = require('../utils/isAdmin.js');
var nodemailer = require('nodemailer');


const orderRouter = express.Router();

//router to get history of orders
orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id});
    res.json(orders)
}))

orderRouter.get('/admin', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ updatedAt: -1 })
    if (orders) {
        res.json(orders)
    }
}))



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
            deliveryFee: req.body.deliveryFee,
            buyerService: req.body.buyerService,
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


//send notification when an order is paid/made
orderRouter.post('/ordernotification/:id', expressAsyncHandler(async (req, res) => {
  // text: `http://localhost:5000/api/v1/user/reset-password/${user._id}/${token}

  const order = await Order.findById(req.params.id);
  if (order) {

    const link = `https://www.mosganda.com/api/v1/order/${order._id}`
    //send notification link to the user's email
    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: process.env.MAIL_USERNAME,
    //     pass: process.env.MAIL_PASSWORD,
    //     clientId: process.env.OAUTH_CLIENTID,
    //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //     refreshToken: process.env.OAUTH_REFRESH_TOKEN
    //   }
    // });
    let transporter = nodemailer.createTransport({
  host: process.env.CUSTOMIZED_MAIL_HOST,
  secure: true,
  port: 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

    let mailOptions = {
      from: "moses@mosganda.com",
      to: req.body.email,
        subject: 'Order Summary',
      html: `  <p> Hi! ${order.shippingAddress.fullName.split(' ')[0]} </p>
       <h2 style="color:#fff; color:green; text-align:center;padding:10px;">Your Order Summary</h2>
               <p>${order.createdAt}, ${order.totalPrice.toFixed(2)}}
               <a href=${link} style="text-align:center; background-color: #1c86ee; color:white;text-decoration:none"; margin:"5px">View</a>
               
            `,
    //   text: 'Hi from your Mosganda project'
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
        res.json({
          message: "Order summary sent to your email.",
        })
      }
    });
    
  
    
  } 
    
  
}))


module.exports = orderRouter;
