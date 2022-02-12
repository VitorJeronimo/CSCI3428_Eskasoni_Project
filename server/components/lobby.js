const { playersOnServer, Player} = require('./players');
const { roomsOnServer, Room } = require('./rooms');

class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        socket.on('join_lobby', ({ name, room }) => this.addPlayer(name, room));
        socket.on('start_game', () => this.startGame());
        socket.on('start_voting', () => this.startVoting());
        socket.on('send_message', () => this.sendMessage(data));
        socket.on('delivery_values', (data) => this.deliveryValues(data));
        socket.on('request_category/answers', (categoryNum) => this.requestAnswer(categoryNum));
        socket.on('updateVoteScore', (answers, player, scoreDifference) => this.updateScores(answers, player, scoreDifference));
        socket.on('start_timers', () => this.startTimers());
        socket.on('disconnect', () => this.disconnect());
    };

    addPlayer(userName, roomName) {
        const player = new Player(this.socket.id, userName, roomName);
        
        // If a player with the same socket ID already exists in the list,
        // remove them to avoid duplicates
        const index = playersOnServer.findIndex(player => player.id === this.socket.id);
            
        if (index !== -1) {
            playersOnServer.splice(index, 1);
        }
        playersOnServer.push(player);
        
        // If the room with the specified name does not exist, create it,
        // set the first player to join to be the admin, and add them to
        // the list of players in the room.
        // Otherwise, just add the player to the list of players in the room.
        if (!roomsOnServer.some(room => room.roomName === roomName)) {
            const room = new Room(roomName, player, [player]);
            roomsOnServer.push(room);
            
            console.log(`Room created: ${room.roomName},    Admin: ${room.admin.userName}`);
        }
        else {
            const room = Room.getCurrentRoom(roomName);
            room.playersList.push(player);
            this.socket.emit("hide_buttons");
            
            console.log(`Room updated: ${room.roomName},    Joined: ${player.userName}`);
        }
        this.socket.join(roomName);
    };

    startGame() {
    // Get info of the player that emitted the event
        const player = Player.getCurrentPlayer(this.socket.id);
        const room = Room.getCurrentRoom(player.roomName);
        
        // Only allow the game to start if the player is the room admin
        if (player === room.admin) {
            room.updateRoom();
            room.startGame();
            this.io.to(room.roomName).emit("update_client", room.gameState);
        }
    };

    startVoting() {
        const player = Player.getCurrentPlayer(this.socket.id);
        const room = Room.getCurrentRoom(player.roomName);
        
        this.io.to(room.roomName).emit("display_round_results", room);
    }

    sendMessage(data) {
        this.socket.to(data.room).emit("receive_message", data);
    }

    deliveryValues(data) {
        const player = Player.getCurrentPlayer(this.socket.id);
        player.words = data;
    }
    
    _getAllPlayerAnswers(categoryIndex, room) {
        //the first element of answers is always the index and category
        const category = room.gameState.currentCategories[categoryIndex].title;
        const allAnswers = [{"index":categoryIndex, "category":category}];
        room.playersList.forEach(player => {
            if (category in player.words) {
                //create object containing username and answer
                const obj = {"userName":player.userName, "answer":player.words[category], "score":0};
                allAnswers.push(obj);
            }
        });
        return allAnswers;
    }

    requestAnswer(categoryNum) {
        const player = Player.getCurrentPlayer(this.socket.id);
        const room = Room.getCurrentRoom(player.roomName);
        
        if (categoryNum < 6) {
            const answers = this._getAllPlayerAnswers(categoryNum, room);
            this.io.to(room.roomName).emit("receive_category/answers", answers);
        } else {
            this.io.to(room.roomName).emit("go_to_results", room);
        }
    }

    updateScores(answers, player, scoreDifference) {
        const user = Player.getCurrentPlayer(this.socket.id);
        const room = Room.getCurrentRoom(user.roomName);
        
        const index = answers.findIndex(obj => obj.userName == player);
        console.log(answers[index].userName);
        answers[index].score += scoreDifference;
        this.io.to(room.roomName).emit("receive_category/answers", answers);
    }

    startTimers() {
        const player = Player.getCurrentPlayer(this.socket.id);
        const room = Room.getCurrentRoom(player.roomName);
        
        //send the start signal to all timers in this room
        this.io.to(room.roomName).emit("start_timer");
    }

    disconnect() {
        try {
            // Get the room name of the player that's disconnecting
            const player = Player.getCurrentPlayer(this.socket.id);
            const room = Room.getCurrentRoom(player.roomName);
            
            // Remove the player from the players list in and disconnect them
            // from the server.
            room.removePlayer(this.socket.id);
            Player.playerDisconnects(this.socket.id);
            this.socket.leave(player.roomName);
            
            console.log("User disconnected", this.socket.id);
        }
        catch (error) {
            console.log(error);
            this.socket.emit("redirect_to_login");
        }
    };
}

function startLobby(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = startLobby;
