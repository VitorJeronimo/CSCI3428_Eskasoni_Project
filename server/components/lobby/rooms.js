const players = require('../users/players');

const rooms = new Map();

const _createRoom = (roomID, roomAdmin) => {
    const newRoom = {
        roomAdmin: roomAdmin,
        playersList: null
    };

    rooms.set(roomID, newRoom);
    return newRoom;
};

const addPlayerToRoom = (roomID, playerID) => {
    const player = players.getPlayerById(playerID);

    if (rooms.has(roomID)) {
        const room = rooms.get(roomID);
        room.playersList.set(playerID, player);
    }
    else {
        const playersList = new Map();
        players.makePlayerAdmin(player);
        playersList.set(playerID, player);

        const newRoom = _createRoom(roomID, player);

        rooms.set(roomID, newRoom);
    }
};

module.exports = {
    addPlayerToRoom: addPlayerToRoom,
};
