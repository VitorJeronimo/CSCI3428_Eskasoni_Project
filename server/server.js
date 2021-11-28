//===== IMPORTS ===================================================================================
// Required imports
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Local imports
const { playersOnServer, Player } = require("./modules/players");
const { roomsOnServer, Room } = require("./modules/rooms");

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
     * @author Gillom McNeil 
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
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
        const player = new Player(socket.id, userName, roomName);
        
        // If a player with the same socket ID already exists in the list, 
        // remove them to avoid duplicates
        const index = playersOnServer.findIndex(player => player.id === socket.id);
        if (index !== -1) {
            playersOnServer.splice(index, 1);
        }
        playersOnServer.push(player);       

        // If the room with the specified name does not exist, create it,
        // set the first player to join to be the admin, and add them to 
        // the list of players in the room.
        // Otherwise, just add the player to the list of players in the room.
        if (!roomsOnServer.some(room => room.roomName === roomName)) {
            const room = new Room(roomName, player, [player]);
            roomsOnServer.push(room);

            console.log(`Room created: ${room.roomName},    Admin: ${room.admin.userName}`);
            console.log();//DELETE
        }
        else {
            const room = Room.getCurrentRoom(roomName);
            room.playersList.push(player);

            console.log(`Room updated: ${room.roomName},    Joined: ${player.userName}`);
            console.log(room.playersList);  //DELETE
            console.log(`Room ${room.roomName} admin: ${room.admin.userName}`); //DELETE
            console.log();//DELETE
        }
        socket.join(roomName);
    });

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Handles the "request_client_update" event emitted by the client.
     *
     * Emits an "update_client" event, which sends the required game state 
     * information to the joining client to ensure that all players in a room 
     * have the same game state.
     */
    socket.on("request_client_update", () => {
        try {
            const player = Player.getCurrentPlayer(socket.id);
            const room = Room.getCurrentRoom(player.roomName);

            console.log(`request_client_update: player -> ${player.userName}, room -> ${room.roomName}`);//DELETE
            console.log();//DELETE
            socket.emit("update_client", room.gameState);
        } catch (nullPlayerError) {
            console.log(nullPlayerError);
            socket.emit("redirect_to_login");
        }
    });

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Handles the "start_game" event emitted by the client.
     */
    socket.on("start_game", () => {
        // Get info of the player that emitted the event
        const player = Player.getCurrentPlayer(socket.id);
        console.log(`start_game: player -> ${player.userName}`);//DELETE
        const room = Room.getCurrentRoom(player.roomName);
      
        console.log(`start_game: player -> ${player.userName}, room -> ${room.roomName}`);//DELETE
        console.log();//DELETE
        // Only allow the game to start if the player is the room admin
        if (player === room.admin) {
            room.updateRoom();
            io.to(room.roomName).emit("update_client", room.gameState);
        }
    });

    /**
     *  @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     *  Handles the "start_voting" event emitted by the client.
     */
    socket.on("start_voting", () => {
        const player = Player.getCurrentPlayer(socket.id);
        const room = Room.getCurrentRoom(player.roomName);

        // Send the current round information to all players
        // in the current room
        io.to(room.roomName).emit("display_round_results", room);
    });

    /**
     * @author Gillom McNeil
     *
     * IN PROGRESS
     */
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Handles the "disconnect" event emitted by the client.
     * 
     * Removes player from the players list in the server.
     */
    socket.on("disconnect", () => {
        // Get the room name of the player that's disconnecting
        const player = Player.getCurrentPlayer(socket.id);
        const room = Room.getCurrentRoom(player.roomName);

        console.log(`disconnect: player -> ${player.userName}, room -> ${room.roomName}`);//DELETE
        console.log();//DELETE
        // Remove the player from the players list in and disconnect them
        // from the server.
        room.removePlayer(socket.id);
        Player.playerDisconnects(socket.id);
        socket.leave(player.roomName);

        playersOnServer.forEach((player, index) => {
            console.log(`${index}. Player -> ${player.userName}, ID -> ${player.id}`);
        })

        console.log("User disconnected", socket.id);
    });
});

//===== SERVER ====================================================================================
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// TODO Store user's username and room id in session storage
