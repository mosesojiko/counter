/* eslint-disable no-undef */
const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const data = require('./data.js');
const userRouter  = require('./routers/userRouter.js');

dotenv.config();
const app = express();

//Connect to mongoDb
mongoose.connect(process.env.MONGODB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//express middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/user', userRouter)

//api to get single product
app.get('/api/v1/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if(product) {
        res.send(product)
    }else{
        res.status(404).send({ message: "Product not found" })
    }
})

//get all products
app.get('/api/v1/products', (req, res) =>{
    res.send(data.products)
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