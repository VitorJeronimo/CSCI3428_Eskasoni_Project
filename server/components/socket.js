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
        const player = Player.createNewPlayer(this.socket.id, username);
        let lobby = null;

        if (!Lobby.hasLobbyWithId(lobbyId)) {
            lobby = Lobby.createLobby(lobbyId);
        } else {
            lobby = Lobby.getLobbyById(lobbyId);
        } 

        lobby.addPlayerToLobby(player);
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
