require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const startLobby = require('./components/lobby/lobby');

const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin : ORIGIN,
        methods: ['GET', 'POST']
    }
});

if (process.env.NODE_ENV !== 'development') {
    app.use(cors());
}

startLobby(io);
//startChat(io);

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));
