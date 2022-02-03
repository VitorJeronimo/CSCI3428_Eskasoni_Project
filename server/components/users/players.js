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

const getRoomIdFromPlayer = (id) => {
    const player = getPlayerById(id);
    return player.roomID;
}

const makePlayerAdmin = (id) => {
    const player = players.get(id);
    player.isRoomAdmin = true;
    players.set(id, player);
};

const deletePlayer = (id) => {
    players.delete(id);
};

module.exports = {
    createPlayer: createPlayer,
    getPlayerById: getPlayerById,
    makePlayerAdmin: makePlayerAdmin,
    deletePlayer: deletePlayer,
    getRoomIdFromPlayer: getRoomIdFromPlayer,
    playersList: players  //DELETE WHEN YOU'RE DONE
};
