const players = new Map();

const createPlayer = (id, username, roomID) => {
    const newPlayer = {
        username: username,
        roomID: roomID,
        isRoomAdmin: false,
    };

    players.set(id, newPlayer);
    return newPlayer;
};

const getPlayerById = (id) => {
    return players.get(id);
};

const makePlayerAdmin = (id) => {
    const player = players.get(id);
    player.isRoomAdmin = true;
};

const deletePlayer = (id) => {
    players.delete(id);
};

module.exports = {
    createPlayer: createPlayer,
    getPlayerById: getPlayerById,
    makePlayerAdmin: makePlayerAdmin,
    deletePlayer: deletePlayer
};
