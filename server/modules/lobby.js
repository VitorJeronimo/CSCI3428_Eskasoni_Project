const rooms = new Map();
const players = new Map();

class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join', ({ name, room }) => this.addPlayer(name, room));
        socket.on('disconnect', () => this.disconnect());
    }

    addPlayer(name, room) {
        // TODO: implement "addPlayer" method
        console.log(name, room);
        players.set(this.socket.id, {name: name, room: room});
        console.log(players)
    }

    disconnect() {
        // TODO: implement "disconnect" method
        console.log('disconnected');
        players.delete(this.socket.id);
        console.log(players)
    }
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
