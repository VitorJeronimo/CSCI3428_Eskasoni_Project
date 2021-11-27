//===== IMPORTS ===================================================================================
const { shuffle } = require("./utils")

//===== VARIABLES =================================================================================
const roomsList = []        // List of existing rooms on the server

// List of letters that can be the first letter of Mi'kmaq words
const letters = ["P","T","K","Q","J","S","L","M","N","W","Y","A","E","I","O","U"];

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
     * Instantiates Room object and updates the game state.
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
            currentLetter: "",
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

        // If the player was found in the list, remove them
        if (index !== -1) {
            this._playersList.splice(index, 1);

            // If the player was the admin and the list is not empty, set the
            // next player as the new admin
            if (index === 0 && this._playersList.length > 0) {
                this._admin = this._playersList[0]
            }
        }

        // If there are no players in the room, remove ir from the rooms list
        if (this._playersList.length === 0) {
            const index = roomsList.indexOf(this);
            roomsList.splice(index, 1);
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
      const index = roomsList.findIndex(room => room.roomName === roomName);
      
      // If the room was found, return it
      if (index !== -1) {
        return roomsList[index];
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
  roomsList,
  Room
}
