import { useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import GameScreen from './components/GameScreen';

const Lobby = ({ location }) => {
    const SERVER = 'localhost:5000';
    let socket;

    useEffect(() => {
        const { name, room } = queryString.parse(location.search) 

        socket = io(SERVER);
        socket.emit('test', { name, room });
        console.log(socket)

        return () => {
            socket.disconnect();
        }

    }, [SERVER, location.search]);

    return (
        <GameScreen />
    )
}

export default Lobby;
