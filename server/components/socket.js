const Lobby = require('./lobby');

class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join_lobby', ({ username, lobbyId }) => this.addPlayer(username, lobbyId));
        socket.on('gamestate_update_request', () => this.updateClientGamestate());
        socket.on('disconnect', () => this.disconnect());
    };

    addPlayer(username, lobbyId) {
        let lobby = null;
        if (!Lobby.hasLobbyWithId(lobbyId)) {
            lobby = Lobby.createLobby(lobbyId);
        } else {
            lobby = Lobby.getLobbyById(lobbyId);
        } 

        lobby.addPlayerToLobby(this.socket.id, username);
    };

    updateClientGamestate() {
        console.log(`Client with ID ${this.socket.id} requested gamestate update`);
        // Lobby: update lobby game state
        // Lobby: send gamestate obj to the client
    }

    disconnect() {
        const lobby = Lobby.getLobbyByPlayerId(this.socket.id);
        lobby.removePlayerFromLobby(this.socket.id);
    };
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
