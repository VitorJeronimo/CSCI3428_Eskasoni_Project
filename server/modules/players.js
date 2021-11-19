const playersList = [];       // List of players currently on the server

/**
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

  // Add new player to players array
  playersList.push(player);
  
  return player;
}

function getCurrentPlayer(id) {
  // Search player's index by its id
  const index = playersList.findIndex(player => player.id === id);

  // If the player was found, return it
  if (index !== -1) {
    return playersList[index];
  }
}

function getPlayersList() {
  return playersList;
}

function playerDisconnects(id) {
  // Search the player's index by its id
  const index = playersList.findIndex(player => player.id === id);

  // If the player was found, remove it from the players array
  if (index !==-1) {
    playersList.splice(index);
  }
}

module.exports = {
  playersList,
  addPlayer,
  getCurrentPlayer,
  getPlayersList,
  playerDisconnects
}