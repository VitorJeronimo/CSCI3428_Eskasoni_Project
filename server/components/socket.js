const Lobby = require('./lobby');
const Player = require('./player');

class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join_lobby', ({ username, lobbyId }) => this.addPlayer(username, lobbyId));
        socket.on('disconnect', () => this.disconnect());
    };

    addPlayer(username, lobbyId) {
        console.log(username, lobbyId); // DELETE
        const player = Player.createNewPlayer(this.socket.id, username);

        if (!Lobby.hasLobbyWithId(lobbyId)) {
            Lobby.createLobby(lobbyId);
        } 
        Lobby.addPlayerToLobby(player, lobbyId);
    };

    disconnect() {
        console.log(`${this.socket.id} disconnected...`)
    };
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
