const players = require('../users/players');

const rooms = new Map();

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
        const newPlayer = players.createPlayer(socket.id, playerName, roomID);

        if (rooms.has(roomID)) {
            const room = rooms.get(roomID);
            const playersList = room.playersList;
            playersList.set(socket.id, newPlayer);
        }
        else {
            const playersList = new Map();
            newPlayer.isAdmin = true;
            playersList.set(socket.id, newPlayer);

            const newRoom = {
                admin: newPlayer,
                playersList: playersList,
                gameState: defaultGameState
            }

            rooms.set(roomID, newRoom);
            socket.emit('hide_buttons');
        }
        
        players.set(socket.id, newPlayer)
        socket.join(roomID);
    }

    startGame() {
    // Get info of the player that emitted the event
        const player = Player.getCurrentPlayer(socket.id);
        const room = Room.getCurrentRoom(player.roomName);
        
        // Only allow the game to start if the player is the room admin
        if (player === room.admin) {
            room.updateRoom();
            room.startGame();
            io.to(room.roomName).emit("update_client", room.gameState);
        }
    }

    disconnect() {
        // TODO: implement "disconnect" method
        console.log('disconnected');
        players.delete(this.socket.id);
        console.log(players)
    }
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
