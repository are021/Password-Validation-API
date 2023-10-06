require('dotenv').config();

const port = 8080;

const express = require('express');
const jwt = require('jsonwebtoken');
const authentication = require('./server');

const app = express();


app.use(express.json());

// Websocket Setup
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({server:server});

server.listen(port);

const posts = [
    {
        username : "admin",
    }
]

/**
 * Get User Session
 */
app.get('/users', authentication.authenticate_token, (req, res) => {
    // verify the user in
    res.json(posts.filter(post => post.username === req.user.name))
});






