class Player {
    constructor(playerID, username) {
        this.playerID = playerID;
        this.username = username;
        this.score = 0;
    }

    getPlayerId() {
        return this.playerID;
    }

    static createNewPlayer(playerID, username) {
        const newPlayer = new Player(playerID, username);
        return newPlayer;
    }

}

module.exports = Player;
