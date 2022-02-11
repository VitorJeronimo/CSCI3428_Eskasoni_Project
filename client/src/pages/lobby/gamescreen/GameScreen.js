import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

const GameScreen = ({ socket, setGamePhase }) => {
    const location = useLocation();

    const { username, lobbyId } = queryString.parse(location.search)
    useEffect(() => {
        console.log(username, lobbyId)
        socket.on('connect', () => socket.emit('join_lobby', { username, lobbyId }));
    }, [])

    //===== COMPONENT =========================================================
    return (
        <div className="App">
            <h1>Test</h1>
        </div>
    );
}

export default GameScreen; 
