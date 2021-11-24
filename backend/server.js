/* eslint-disable no-undef */
const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter  = require('./routers/userRouter.js');
const productRouter = require('./routers/productRouter.js');
const orderRouter = require('./routers/orderRouter.js');
const storeRouter = require('./routers/storeRouter.js');

dotenv.config();
const app = express();

//Connect to mongoDb
// mongoose.connect(process.env.MONGODB_CONNECT,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, ()=>{
//     console.log("Connected to local db")
// })
//connect to db
mongoose.connect(process.env.CONNECT_TO_DB,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('connected to db')
})



//express middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//for file uploads
app.use('/uploads', express.static('uploads'))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/store', storeRouter)

// //api for paypay
// app.get('/api/v1/config/paypal', (req, res) =>{
//     // eslint-disable-next-line no-undef
//     res.send(process.env.PAYPAL_CLIENT_ID || 'sb') //sb stands for sandbox
// })

//api for paystack key
app.get('/api/v1/config/paystack', (req, res) =>{
    // eslint-disable-next-line no-undef
    res.json(process.env.PAYSTACK_PUBLIC_KEY) //sb stands for sandbox
})

app.get('/', (req, res)=>{
    res.send("Server is ready");
})

//to show errors
app.use((err, req, res, next) =>{
    res.status(500).json({
        message: err.message
    })
    next()
})
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Serve as http://localhost:${port}`)
})