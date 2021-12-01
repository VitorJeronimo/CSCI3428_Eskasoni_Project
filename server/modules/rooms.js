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

//===== METHODS ===================================================================================
/**
 * 
 * @param {string} roomName Room ID provided by the user at login
 * @param {object} admin    Player object that reflects the first player
 *                          to join the current room
 * @returns                 Room object containing a room name, room admin,
 *                          and the game state variables (gameDuration,
 *                          currentLetter, currentCategories)
 */
function createRoom(roomName, admin) {
  const room = {
    roomName,
    admin,
    gameDuration: 120,
    currentLetter: "",
    currentCategories: []
  };

  roomsList.push(room);

  // Generate new currentLetter and currentCategories
  updateRoom(room);

  return room;
}

/**
 * Returns a room object that matches the room name passed into the
 * method if it can be found. Otherwise, returns null.
 * 
 * @param   {string} roomName Room ID provided by the user at login
 * @returns {object}          Room object or null
 */
function getCurrentRoom(roomName) {
  // Search for the room using room name
  const index = roomsList.findIndex(room => room.roomName === roomName);
  
  // If the room was found, return it
  if (index !== -1) {
    return roomsList[index];
  }

  return null;
}

/**
 * Generates a new random initial letter and categories list, and
 * updates the information in the room passed into the method.
 * 
 * @param {object} room Room object to be updated
 */
function updateRoom (room) {
  room.currentLetter = generateNewLetter();
  room.currentCategories = generateCategoriesList();
}

/**
 * Returns a new random initial letter from the list of possible letters.
 * 
 * @returns {string} Random letter to be used on the next round of the game
 */
function generateNewLetter() {
  return letters[Math.floor(Math.random()*16)];
}

/**
 * Returns a new categories list, containing six random categories chosen
 * from the list of possible categories.
 * 
 * @returns {object} Array of randomly chosen categories to be used on the
 *                   round of the game
 */
function generateCategoriesList() {
  // Shuffles the categories list and store only the first 6 elements
  const randomCategories = shuffle(categories).slice(0,6);
  const newCategoriesList = [];

  randomCategories.forEach((categoryTitle, index) => {
    newCategoriesList.push({
      id: index,
      title: categoryTitle,
      completed: false
    })
  });

  return newCategoriesList;
}

//===== EXPORTS ===================================================================================

module.exports = {
  roomsList,
  createRoom,
  getCurrentRoom,
  updateRoom
}