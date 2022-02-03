const players = require('../users/players');

const rooms = new Map();

const _createRoom = (roomID, roomAdmin) => {
    const newRoom = {
        roomAdmin: roomAdmin,
        playersList: new Map()
    };

    rooms.set(roomID, newRoom);
    return newRoom;
};

const addPlayerToRoom = (roomID, playerID) => {
    const player = players.getPlayerById(playerID);

    if (!rooms.has(roomID)) {
        players.makePlayerAdmin(playerID);
        _createRoom(roomID, player);
    }

    const room = rooms.get(roomID);
    room.playersList.set(playerID, player);
};

const removePlayerFromRoom = (roomID, playerID) => {
    const room = rooms.get(roomID);
    const playersList = room.playersList;
    playersList.delete(playerID);

    if (playersList.size === 0) {
        rooms.delete(roomID);
    }
};

module.exports = {
    addPlayerToRoom: addPlayerToRoom,
    removePlayerFromRoom: removePlayerFromRoom,
};
