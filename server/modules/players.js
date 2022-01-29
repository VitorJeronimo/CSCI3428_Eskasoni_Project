const players = new Map();

/**
 * Defines a Player object, which holds an user id, username, room name, score
 * and an array of words entered by the player during the current round of
 * the game.
 */
class Player {
    /**
     * @param   {string} id       The user's socket.id provided by Socket.io
     * @param   {string} userName Username provided by the user at login
     * @param   {string} roomName Room ID provided by the user at login
     */
    constructor(id, userName, roomName) {
        this.id = id;
        this.userName = userName;
        this.roomName = roomName;
        this.score = 0;
        this.words = {};
    }

    /**
     * Returns a player object whose id matches the id passed into the method.
     * Otherwise, returns null.
     *
     * @param   {string} id The user's id provided by Socket.io
     * @returns {object}    Player object or null
     */
    static getCurrentPlayer(id) {
        // Search player's index by its id
        const index = playersOnServer.findIndex(player => player._id === id);

        // If the player was found, return it
        if (index !== -1) {
            return playersOnServer[index];
        }

        //TODO: Return an empty Player object and handle the error on the server
        return null;
        }

    /**
     * @author Vitor Jeronimo (A00431599)
     *
     * Removes the player from the players list.
     *
     * @param {object} id   The user's id provided by Socket.io
     */
    static playerDisconnects(id) {
        // Search the player's index by its id
        const index = playersOnServer.findIndex(player => player._id === id);

        // If the player was found, remove it from the players array
        if (index !==-1) {
            playersOnServer.splice(index, 1);
        }
    }
}

//===== EXPORTS ===============================================================
module.exports = {
    playersOnServer,
    Player
}
