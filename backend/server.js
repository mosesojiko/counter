/* eslint-disable no-undef */
const express = require('express')
const dotenv = require('dotenv');

const data = require('./data.js');

dotenv.config();
const app = express();

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
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Serve as http://localhost:${port}`)
})