require('dotenv').config();

const port = 8080;

const express = require('express');
const jwt = require('jsonwebtoken');
const generate = require('./server');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const connect = async () => {
    try {
        const db = await mongoose.connection;
        console.log("Connected to mongo db");
    }catch (err) {
        console.log(err);
    }
}
connect();


app.use(express.json());


// Websocket Setup
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({server:server});

server.listen(port);

// User Routes

const userRouter = require('./routes/user');
app.use('/user', userRouter);



// /**
//  * User Login Validation
//  * endpoint = '/login'
//  */
// app.post('/login', (req, res) => {
//     // Authenticate User using some cryptography

//     const username = req.body.username;
//     const user = { name : username };
//     const access_token = generate.generateAccessToken(user);
//     res.json({ access_token : access_token });
// })


/**
 * Initialize WS Connection
 */
wss.on('connection', (ws) =>{
    ws.send("Client Has Connected");
    ws.on('message', (msg) =>{
        console.log(msg.toString());
    })
});




