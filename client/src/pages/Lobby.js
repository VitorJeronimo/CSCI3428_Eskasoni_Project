import { useState, useEffect} from 'react';
import io from 'socket.io-client';

import GameScreen from './components/GameScreen';

const Lobby = ({ location }) => {
    const ENDPOINT = 'localhost:5000';
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [ENDPOINT, location.search])

    return (
        <>
            {socket ? (
                <GameScreen socket={socket} />
            ) : (
                <p>Not Connected</p>
            )}
        </>
    )
}

export default Lobby;
