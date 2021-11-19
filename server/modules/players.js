//===== VARIABLES =================================================================================
const playersList = [];       // List of players currently on the server

//===== METHODS ===================================================================================
/**
 * Creates a Player object and adds it to the list of players in the server.
 * 
 * @param   {string} id       The user's socket.id provided by Socket.io
 * @param   {string} userName Username provided by the user at login 
 * @param   {string} roomName Room ID provided by the user at login 
 * @returns {object}          Player object containing an id, username, room
 *                            name, score, and a list of words entered during
 *                            the current round in the game.
 */
function addPlayer(id, userName, roomName) {
  const player = { 
    id, 
    userName, 
    roomName,
    score: 0,
    words: []
  }

  playersList.push(player);
  
  return player;
}

/**
 * Returns a player object whose id matches the id passed into the method.
 * Otherwise, returns null.
 * 
 * @param   {string} id The user's id provided by Socket.io
 * @returns {object}    Player object or null
 */
function getCurrentPlayer(id) {
  // Search player's index by its id
  const index = playersList.findIndex(player => player.id === id);

  // If the player was found, return it
  if (index !== -1) {
    return playersList[index];
  }

  return null;
}

/**
 * Returns the list of all players currently in the server.
 * 
 * @returns {object} Array of players that are connected to the server
 */
function getPlayersList() {
  return playersList;
}

/**
 * Removes the player from the players list.
 * 
 * @param {object} player The user's id provided by Socket.io
 */
function playerDisconnects(player) {
  // Search the player's index by its id
  const index = playersList.indexOf(player);

  // If the player was found, remove it from the players array
  if (index !==-1) {
    playersList.splice(index);
  }
}

//===== EXPORTS ===================================================================================

module.exports = {
  playersList,
  addPlayer,
  getCurrentPlayer,
  getPlayersList,
  playerDisconnects
}