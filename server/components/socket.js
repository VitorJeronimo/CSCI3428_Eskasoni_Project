const Lobby = require('./lobby');

class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join_lobby', ({ username, lobbyId }) => this.addPlayer(username, lobbyId));
        socket.on('gamestate_update_request', () => this.updateClientGamestate());
        socket.on('disconnect', () => this.disconnect());
    };

    /**
     * Adds player to a lobby that matches the Lobby ID given at login.
     * If there is no lobby with the given ID, it creates a new one.
     * @param {string}  username - username provided by the player at login.
     * @param {string}  lobbyId  - lobby ID provided by the player at login.
     */
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

    /**
     * Removes player from their corresponding lobby as soon as they
     * disconnect from the server.
     */ 
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
