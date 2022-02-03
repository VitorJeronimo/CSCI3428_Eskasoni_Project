const players = require('../users/players');
const rooms = require('./rooms');

const defaultGameState = {
    currentLetter: {},
    currentLetter: [],
    gameDuration: 120,
    gameStarted: false
}

class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join_lobby', ({ name, room }) => this.addPlayer(name, room));
        socket.on('start_game', () => this.startGame());
        socket.on('disconnect', () => this.disconnect());
    }

    addPlayer(playerName, roomID) {
        players.createPlayer(this.socket.id, playerName, roomID);
        rooms.addPlayerToRoom(roomID, this.socket.id);
        console.log(players.playersList)   //DELETE THIS WHEN YOU'RE DONE 
        this.socket.join(roomID);
    }

    startGame() {
    // Get info of the player that emitted the event
        //const player = Player.getCurrentPlayer(socket.id);
        //const room = Room.getCurrentRoom(player.roomName);
        
        // Only allow the game to start if the player is the room admin
        //if (player === room.admin) {
            //room.updateRoom();
            //room.startGame();
            //io.to(room.roomName).emit("update_client", room.gameState);
        //}
    }

    disconnect() {
        console.log(`disconnected...`);
        const roomID = players.getRoomIdFromPlayer(this.socket.id);

        rooms.removePlayerFromRoom(roomID, this.socket.id)
        players.deletePlayer(this.socket.id)

        console.log(players.playersList) //DELETE WHEN YOU'RE DONE
    }
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
