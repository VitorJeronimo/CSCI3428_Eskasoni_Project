class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join_lobby', ({ username, roomID }) => this.addPlayer(username, roomID));
        socket.on('disconnect', () => this.disconnect());
    };

    addPlayer(username, roomID) {
        console.log(username, roomID); // DELETE
    };

    disconnect() {
        console.log(`${this.socket.id} disconnected...`)
    };
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
