class Player {
    constructor(playerId, username) {
        this.playerId = playerId;
        this.username = username;
        this.score = 0;
    }

    getPlayerId() {
        return this.playerId;
    }

    static createNewPlayer(playerId, username) {
        const newPlayer = new Player(playerId, username);
        return newPlayer;
    }

}

module.exports = Player;
