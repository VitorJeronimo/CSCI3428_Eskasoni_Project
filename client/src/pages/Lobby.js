import { useState, useEffect} from 'react';
import io from 'socket.io-client';

import GameScreen from './components/GameScreen';
import VoteScreen from './components/VoteScreen';

const Lobby = ({ location }) => {
    const ENDPOINT = 'localhost:5000';
    const [socket, setSocket] = useState(null);
    const [gamePhase, setGamePhase] = useState("not_started");

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [ENDPOINT, location.search])

    return (
        <>
            {socket ? (
                (gamePhase === 'not_started') ? (
                    <GameScreen socket={socket} setGamePhase={setGamePhase} />
                ) : (
                    <VoteScreen socket={socket} setGamePhase={setGamePhase} />
                )
            ) : (
                <p>Not Connected</p>
            )}
        </>
    )
}

export default Lobby;
