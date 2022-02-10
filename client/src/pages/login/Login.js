import { useState } from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [roomID, setRoomID] = useState("");

    return (
        <div className="LoginPage">
            <div className="LoginCard">
                <div className="Logo">Aij?</div>
                <input className="LoginInput" type="text" placeholder="Username"
                    onChange={(event) => setUsername(event.target.value)}/>
                <input className="LoginInput" type="text" placeholder="Room ID"
                    onChange={(event) => setRoomID(event.target.value)}/>
                <Link to={`/lobby?username=${username}&roomID=${roomID}`}>
                  <button className="Join Btn" type="submit">Join</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
