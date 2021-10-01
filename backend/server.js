/* eslint-disable no-undef */
const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRouter  = require('./routers/userRouter.js');
const productRouter = require('./routers/productRouter.js');
const orderRouter = require('./routers/orderRouter.js');

dotenv.config();
const app = express();

//Connect to mongoDb
mongoose.connect(process.env.MONGODB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//express middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter)



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