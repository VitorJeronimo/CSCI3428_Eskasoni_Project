import { useState } from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [lobbyId, setLobbyId] = useState("");

    return (
        <div className="LoginPage">
            <div className="LoginCard">
                <div className="Logo">Aij?</div>
                <input className="LoginInput" type="text" placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}/>
                <input className="LoginInput" type="text" placeholder="Lobby ID"
                    onChange={(event) => setLobbyId(event.target.value)}/>
                <Link to={`/lobby?username=${username}&lobbyId=${lobbyId}`}>
                  <button className="Join Btn" type="submit">Join</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
