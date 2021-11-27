//===== VARIABLES =================================================================================
const playersList = [];       // List of players currently on the server

/**
 * @author Vitor Jeronimo <vitor.bently@hotmail.com>
 *
 * Defines a Player object, which holds an user id, username, room name, score
 * and an array of words entered by the player during the current round of
 * the game.
 */
class Player {
    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Instantiates a Player object.
     * 
     * @param   {string} id       The user's socket.id provided by Socket.io
     * @param   {string} userName Username provided by the user at login 
     * @param   {string} roomName Room ID provided by the user at login 
     */
    constructor(id, userName, roomName) {
        this._id = id;
        this._username = userName;
        this._roomName = roomName;
        this._score = 0;
        this._words = [];
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Returns a player object whose id matches the id passed into the method.
     * Otherwise, returns null.
     * 
     * @param   {string} id The user's id provided by Socket.io
     * @returns {object}    Player object or null
     */
    static getCurrentPlayer(id) {
        // Search player's index by its id
        const index = playersList.findIndex(player => player.id === id);

        // If the player was found, return it
        if (index !== -1) {
            return playersList[index];
        }

        return null;
        }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Removes the player from the players list.
     * 
     * @param {object} id   The user's id provided by Socket.io
     */
    static playerDisconnects(id) {
        // Search the player's index by its id
        const index = playersList.findIndex(player => player.id === id);

        // If the player was found, remove it from the players array
        if (index !==-1) {
            playersList.splice(index);
        }
    }
}

//===== EXPORTS ===================================================================================

module.exports = {
    playersList,
    createPlayer,
    getCurrentPlayer,
    playerDisconnects
}
