const players = [];

function addPlayer(id, userName, roomName) {
  const player = { 
    id, 
    userName, 
    roomName,
    score: 0,
    words: []
  }

  // Add new player to players array
  players.push(player);
  
  return player;
}

function getCurrentPlayer(id) {
  // Search player's index by its id
  const index = players.findIndex(player => player.id === id);

  // If the player was found, return it
  if (index !== -1) {
    return players[index];
  }
}

function getPlayersList() {
  return players;
}

function playerDisconnects(id) {
  // Search the player's index by its id
  const index = players.findIndex(player => player.id === id);

  // If the player was found, remove it from the players array
  if (index !==-1) {
    players.splice(index);
  }
}

module.exports = {
  players,
  addPlayer,
  getCurrentPlayer,
  getPlayersList,
  playerDisconnects
}