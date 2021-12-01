//===== IMPORTS ===================================================================================
const path = require("path");
const { shuffle } = require("./utils");

//===== VARIABLES =================================================================================
const roomsOnServer = []        // List of existing rooms on the server

// List of letters that can be the first letter of Mi'kmaq words
const letters = [
    {character: "A'", audio: path.join(__dirname, "../audio/A_long.mp3")}, 
    {character: "A", audio: path.join(__dirname, "../audio/A.mp3")},
    {character: "E'", audio: path.join(__dirname, "../audio/E_long.mp3")},
    {character: "E", audio: path.join(__dirname, "../audio/E.mp3")},
    {character: "I'", audio: path.join(__dirname, "../audio/I_long.mp3")},
    {character: "I", audio: path.join(__dirname, "../audio/I.mp3")},
    {character: "J", audio: path.join(__dirname, "../audio/J.mp3")},
    {character: "K", audio: path.join(__dirname, "../audio/K.mp3")},
    {character: "L", audio: path.join(__dirname, "../audio/L.mp3")},
    {character: "M", audio: path.join(__dirname, "../audio/M.mp3")},
    {character: "N", audio: path.join(__dirname, "../audio/N.mp3")},
    {character: "O'", audio: path.join(__dirname, "../audio/O_long.mp3")},
    {character: "O", audio: path.join(__dirname, "../audio/O.mp3")},
    {character: "P", audio: path.join(__dirname, "../audio/P.mp3")},
    {character: "Q", audio: path.join(__dirname, "../audio/Q.mp3")},
    {character: "S", audio: path.join(__dirname, "../audio/S.mp3")},
    {character: "A", audio: path.join(__dirname, "../audio/SCHWA.mp3")},
    {character: "T", audio: path.join(__dirname, "../audio/T.mp3")},
    {character: "U'", audio: path.join(__dirname, "../audio/U_long.mp3")},
    {character: "U", audio: path.join(__dirname, "../audio/U.mp3")},
    {character: "W", audio: path.join(__dirname, "../audio/W.mp3")},
]

// List of possible categories for each game
const categories = [
    "Activity",
    "Animals",
    "Behaviour",
    "Body Part",
    "Cities",
    "Clothing",
    "Color",
    "Food",
    "Household",
    "Name",
    "Tree",
    "Weather",
];

/**
 * @author Vitor Jeronimo <vitor.bently@hotmail.com>
 *
 * Defines a Room object, that deals with room properties such as admins, list
 * of players in the room, and room ID. It also takes care of game state
 * objects that will be used to sync all players during the game.
 */
class Room {
    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Instantiates a Room object and updates the game state.
     *
     * @param {string} roomName     Room ID provided by the user at login
     * @param {object} admin        Player object that reflects the first player
     *                              to join the current room
     * @param {object} playersList  Array containing all players currently in the room
     */
    constructor(roomName, admin, playersList) {
        this._roomName = roomName;
        this._admin = admin;
        this._playersList = playersList;
        this._gameState = {
            currentLetter: {},
            currentCategories: [],
            gameDuration: 120
        }

        this.updateRoom();
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "roomName" property.
     *
     * @returns {string} Current room ID
     */
    get roomName() {
        return this._roomName;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "admin" property.
     *
     * @returns {Player} First Player object to join the room
     */
    get admin() {
        return this._admin;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter method for "playersList" property.
     *
     * @returns {object} Array of players in the current room
     */
    get playersList() {
        return this._playersList;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Getter Method for "gameState" property.
     *
     * @returns {object} Game state object containing current letter,
     *                   current categories and game duration
     */
    get gameState() {
        return this._gameState;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Generates a new random initial letter and categories list, and
     * updates the information in the room passed into the method.
     */
    updateRoom() {
        this._gameState.currentLetter = Room.generateNewLetter();
        this._gameState.currentCategories = Room.generateCategoriesList();
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Removes the player that is disconnecting from the players list and
     * adjusts the room admin if needed.
     * 
     * @param {string} id   User's id provided by socket.io
     */
    removePlayer(id) {
        const index = this._playersList.findIndex(player => player.id === id);
        console.log(`removePlayer(): index -> ${index}`);//DELETE
        console.log();//DELETE

        // If the player was found in the list, remove them
        if (index !== -1) {
            this._playersList.splice(index, 1);
            console.log(`removePlayer() after splice: playersList`);//DELETE
            this._playersList.forEach(player => {
                console.log(`Player -> ${player.userName}`);
            }) 
            console.log()//DELETE

            // If the player was the admin and the list is not empty, set the
            // next player as the new admin
            if (index === 0 && this._playersList.length > 0) {
                this._admin = this._playersList[0]
                console.log(`removePlayer(): new admin -> ${this._admin.userName}`);//DELETE
                console.log()//DELETE
            }
        }

        // If there are no players in the room, remove it from the rooms list
        if (this._playersList.length === 0) {
            const index = roomsOnServer.indexOf(this);
            roomsOnServer.splice(index, 1);
        }

    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Returns a room object that matches the room name passed into the
     * method if it can be found. Otherwise, returns null.
     * 
     * @param   {string} roomName Room ID provided by the user at login
     * @returns {object}          Room object or null
     */
    static getCurrentRoom(roomName) {
        // Search for the room using room name
        const index = roomsOnServer.findIndex(room => room.roomName === roomName);
        
        // If the room was found, return it
        if (index !== -1) {
            return roomsOnServer[index];
        }   

        return null;
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Returns a new random initial letter from the list of possible letters.
     * 
     * @returns {string} Random letter to be used on the next round of the game
     */
    static generateNewLetter() {
        return letters[Math.floor(Math.random()*16)];
    }

    /**
     * @author Vitor Jeronimo <vitor.bently@hotmail.com>
     *
     * Returns a new categories list, containing six random categories chosen
     * from the list of possible categories.
     * 
     * @returns {object} Array of randomly chosen categories to be used on the
     *                   round of the game
     */
    static generateCategoriesList() {
        // Shuffles the categories list and store only the first 6 elements
        const randomCategories = shuffle(categories).slice(0,6);
        const newCategoriesList = [];

        randomCategories.forEach((categoryTitle, index) => {
            newCategoriesList.push({
                id: index,
                title: categoryTitle,
            })
        });

        return newCategoriesList;
    }
}

//===== EXPORTS ===================================================================================

module.exports = {
    roomsOnServer,
    Room
}
