const Player = require('./player');

class Lobby {
    static activeLobbies = new Map();
    static playerToLobbyMapping = new Map();

    constructor(lobbyId) {
        this.lobbyId = lobbyId;
        this.players = [];
    }

    getLobbyAdmin() {
        if (this.players.length === 0) {
            return null;
        }
        return this.players[0];
    }

    addPlayerToLobby(player) {
        this.players.push(player)

        const playerId = player.getPlayerId();
        Lobby.playerToLobbyMapping.set(playerId, this.lobbyId)
    }
    
    removePlayerFromLobby(playerId) {
        const index = this.players.findIndex(player => player.getPlayerId() === playerId);

        if (index === -1) {
            // TODO: implement custom error
            console.log(`ERROR: ${playerId} not found in ${this.lobbyId}`)
            return
        }

        this.players.splice(index, 1);
        Lobby.playerToLobbyMapping.delete(playerId);
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
            return
        }
        return Lobby.activeLobbies.get(lobbyId);
    }

    static getLobbyByPlayerId(playerId) {
        const lobbyId = Lobby.playerToLobbyMapping.get(playerId);
        return Lobby.activeLobbies.get(lobbyId);
    }
}

module.exports = Lobby;
