//===== IMPORTS ===================================================================================
// Required imports
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Local imports
const players = require("./modules/players");
const rooms = require("./modules/rooms");

//===== SERVER SETUP ==============================================================================

// Server setup
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

//===== EVENT HANDLING ============================================================================

// TODO: update room on reload

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    /**
     * Handles the "join_room" event emitted by the client. 
     * 
     * It creates a new player object and adds it to the list of players in 
     * the server. 
     * 
     * Furthermore, if there is no room with the Room ID provided by 
     * the user, creates a new room, sets the player as the admin of 
     * that room, and adds the room to the list of rooms in the server.
     * 
     * @param {string} userName Username provided by the user at login
     * @param {string} roomName Room ID provided by the user at login
     */
    socket.on("join_room", ({ userName, roomName }) => {
        const player = players.addPlayer(socket.id, userName, roomName);

        // If the room with the specified name does not exist, create it and
        // set the first player to join to be the admin
        if (!rooms.roomsList.some(room => room.roomName === roomName)) {
            rooms.createRoom(roomName, player);
        }
        const { gameDuration, currentLetter, currentCategories } = rooms.getCurrentRoom(player.roomName);
        
        socket.join(roomName);
        // The "update_client" event sends all the required game state information to 
        // the joining client to ensure that all players in a room have the same game
        socket.emit("update_client", gameDuration, currentLetter, currentCategories);

        console.log(`User with ID: ${player.id} joined room: ${player.roomName}`);
    });

    /**
     * Handles the "start_game" event emitted by the client.
     * 
     * NOTE: THIS PART OF THE CODE IS GOING UNDER MODIFICATIONS. 
     */
    socket.on("start_game", () => {
        // Get info of the player that emitted the event
        const player = players.getCurrentPlayer(socket.id);
        const room = rooms.getCurrentRoom(player.roomName);
      
        // Only allow the game to start if the player is the room admin
        if (player === room.admin) {
            rooms.updateRoom(room)
            io.to(room.roomName).emit(
            "update_client", 
            room.gameDuration, 
            room.currentLetter, 
            room.currentCategories
            );
        }
    });

    /**
     * IN PROGRESS
     */
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    /**
     * Handles the "disconnect" event emitted by the client.
     * 
     * Removes player from the players list in the server.
     */
    socket.on("disconnect", () => {
        // Get the room name of the player that's disconnecting
        const player = players.getCurrentPlayer(socket.id);

        // Remove the player from the players list in and disconnect them
        // from the server.
        players.playerDisconnects(player);
        socket.leave(player.roomName);

        console.log("User disconnected", socket.id);
    });
});

//===== SERVER ====================================================================================
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
