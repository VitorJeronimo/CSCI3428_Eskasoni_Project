const Player = require('./player');

class Lobby {
    static activeLobbies = new Map();
    static playerToLobbyMapping = new Map();

    constructor(lobbyId) {
        this.lobbyId = lobbyId;
        this.players = new Map();
        this.lobbyAdmin = null;
    }

    addPlayerToLobby(player) {
        if (!this.lobbyAdmin) {
            this.lobbyAdmin = player;
        }

        const playerId = player.getPlayerId();

        this.players.set(playerId, player);
        Lobby.playerToLobbyMapping.set(playerId, this.lobbyId)
    }

    static createLobby(lobbyId) {
        const newLobby = new Lobby(lobbyId);
        Lobby.activeLobbies.set(lobbyId, newLobby);

        return newLobby;
    }

    static hasLobbyWithId(lobbyId) {
        return Lobby.activeLobbies.has(lobbyId);
    }

    static getLobbyById(lobbyId) {
        if (!Lobby.activeLobbies.has(lobbyId)) {
            //TODO: implement custom error
            console.log(`ERROR: no lobby with ID ${lobbyId}`);
        }

        return Lobby.activeLobbies.get(lobbyId);
    }

}

module.exports = Lobby;
