const Player = require('./player');

class Lobby {
    static activeLobbies = new Map();
    static playerToLobbyMapping = new Map();

    constructor() {
        this.players = new Map();
        this.lobbyAdmin = null;
    }

    static addPlayerToLobby(player, lobbyId) {
        const lobby = Lobby.activeLobbies.get(lobbyId);
        if (lobby.players.size === 0) {
            lobby.lobbyAdmin = player;
        }

        const playerId = player.getPlayerId();
        lobby.players.set(playerId, player);
        Lobby.playerToLobbyMapping.set(playerId, lobbyId)
        
        console.log(Lobby.activeLobbies, Lobby.playerToLobbyMapping) //DELETE
    }

    static createLobby(lobbyId) {
        const newLobby = new Lobby();
        Lobby.activeLobbies.set(lobbyId, newLobby);
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
