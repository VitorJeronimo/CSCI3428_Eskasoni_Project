const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Local imports
const {
  players,
  addPlayer,
  getCurrentPlayer,
  getPlayersList,
  playerDisconnects
} = require("./modules/players")
const {
  rooms,
  createRoom,
  getCurrentRoom,
  updateRoom
} = require("./modules/rooms")

const app = express();
const PORT = 5000;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// TODO update room on reload

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", ({ userName, roomName }) => {
        const player = addPlayer(socket.id, userName, roomName);

        // If the room with the specified name does not exist, create it and
        // set the first player to join to be the admin
        if (!rooms.some(room => room.roomName === roomName)) {
            createRoom(roomName, player);
            console.log(`${userName} is the admin of room ${roomName}`);  // DELETE THIS
        }
        const { gameDuration, currentLetter, currentCategories } = getCurrentRoom(player.roomName);
        console.log(`info: ${gameDuration}, ${currentLetter}, ${currentCategories}`)

        socket.join(roomName);
        socket.emit("update_client", gameDuration, currentLetter, currentCategories);

        console.log(`User with ID: ${player.id} joined room: ${player.roomName}`);
    });
    socket.on("start_game", () => {
      const player = getCurrentPlayer(socket.id);
      const { 
        admin, 
        roomName, 
        gameDuration, 
        currentLetter, 
        currentCategories} = getCurrentRoom(player.roomName);
      
        console.log(`admin: ${admin.userName}`) // DELETE THIS

      if (player === admin) {
        io.to(roomName).emit("update_client", gameDuration, currentLetter, currentCategories);
        console.log(`Game started by user ${getCurrentPlayer(socket.id).userName}`)  // DELETE THIS
      }
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        playerDisconnects(socket.id)

        console.log("User disconnected", socket.id);
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
