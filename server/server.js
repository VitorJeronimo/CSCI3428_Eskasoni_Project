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

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    /**
     * Author: Gillom McNeil & Vitor Jeronimo
     *
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
        const player = players.createPlayer(socket.id, userName, roomName);
        players.playersList.push(player);       

        // If the room with the specified name does not exist, create it,
        // set the first player to join to be the admin, and add them to 
        // the list of players in the room.
        // Otherwise, just add the player to the list of players in the room.
        if (!rooms.roomsList.some(room => room.roomName === roomName)) {
            const room = rooms.createRoom(roomName, player, [player]);
            rooms.roomsList.push(room);

            console.log(`Room created: ${room.roomName},    Admin: ${room.admin.userName}`);
        }
        else {
            const room = rooms.getCurrentRoom(roomName);
            room.playersList.push(player);
            
            console.log(`Room updated: ${room.roomName},    Joined: ${player.userName}`);
            console.log(room.playersList);  //DELETE
        }
        socket.join(roomName);
    });

    /**
     * Handles the "request_client_update" event emitted by the client.
     * 
     * TODO: write the documentation for this event handler
     */
    socket.on("request_client_update", () => {
        updateClient(socket.id, "player");
    })

    /**
     * Handles the "start_game" event emitted by the client.
     * 
     * NOTE: THIS PART OF THE CODE IS GOING UNDER MODIFICATIONS. 
     */
    socket.on("start_game", () => {
        rooms.updateRoom(room);
        updateClient(socket.id, "room");
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

    /**
     * TODO: write the documentation for the function
     * 
     * The "update_client" event sends all the required game state information to 
     * the joining client to ensure that all players in a room have the same game
     * @param {string} id 
     * @param {string} destination  
     */
    function updateClient(id, destination) {
        try {
            const player = players.getCurrentPlayer(id);
            const gameState = rooms.getCurrentRoom(player.roomName);
            if (destination === "player") {
                socket.emit("update_client", gameState);
            }
            else if (destination === "room") {
                io.to(player.roomName).emit("update_client", gameState);
            }
        } 
        catch (nullPlayerError) {
            console.log(nullPlayerError);
            socket.emit("redirect_to_login");
        }
    }
});

//===== SERVER ====================================================================================
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// When there are no players in a room, remove the room from the list
// When the admin leaves a room, the player that joined after them is the new admin
// Store user's username and room id in session storage
// Only the admin should be able to start the game
