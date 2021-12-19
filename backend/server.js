/* eslint-disable no-undef */
const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
//const chats = require('./data/data.js')

const userRouter  = require('./routers/userRouter.js');
const productRouter = require('./routers/productRouter.js');
const orderRouter = require('./routers/orderRouter.js');
const storeRouter = require('./routers/storeRouter.js');
const widthdrawRouter = require('./routers/widthdrawRouter.js')
const chatRouter = require('./routers/chatRouter.js');
const messageRouter = require('./routers/messageRouter.js');

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
//for file uploads
app.use('/uploads', express.static('uploads'))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/store', storeRouter)
app.use('/api/v1/widthdraw', widthdrawRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/message', messageRouter)

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

// //chat apis
// app.get('/api/v1/chat', (req, res) => {
//     res.json(chats)
// })

// app.get('/api/v1/chat/:id', (req, res) => {
//     //console.log(req.params.id)
//     const singleChat = chats.find(x => x._id === req.params.id);
//     res.json(singleChat)
// })

//to show errors
app.use((err, req, res, next) =>{
    res.status(500).json({
        message: err.message
    })
    next()
})
const port = process.env.PORT || 5000

//making use of socket
const server = app.listen(port, () => {
    console.log(`Serve as http://localhost:${port}`)
})

const io = require('socket.io')(server, {
    pingTimeout: 60000, //goes off after waiting for 60 second if user didn't send message
    cors: {
        origin: "http://localhost:3000",
    }
})

// //create a connection
io.on('connection', (socket) => {
    console.log('connected to socket io');
    //everytime a user opens the app, he should be connected to his own socket
    socket.on('setup', (userData) => { 
        socket.join(userData._id);//to be replaced by userInfo from frontend
        //create a room for that user
        console.log(userData._id)
        socket.emit('connected')
    })

//     //joining a chat, the room will be the chat id in the frontend
    socket.on('join chat', (room) => {
        socket.join(room)
        console.log(`User join room ${room}`)
    })

    //socket for typing
    //when inside a room, emit this typing event
    socket.on('typing', (room) => socket.in(room).emit('typing'));

    //do the same for stop typing
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//     //track new message
    socket.on('new message', (newMessageRecieved) => {
        //check the chat that the message belongs to
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log("chat.users not defined")
        //if there are users, send the message only to the other users, not the sender
        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return // i am not to recieve it
            socket.in(user._id).emit("message recieved", newMessageRecieved)
            //we will check which user the newMessageRecieved object belongs to in the frontend
        })
    })

//     //off the socket
    socket.off("setup", () => {
        console.log("User disconnected")
        socket.leave(userData._id)
    })
 })


  