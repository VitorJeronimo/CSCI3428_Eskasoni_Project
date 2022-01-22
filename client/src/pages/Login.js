import { useState } from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="LoginPage">
            <div className="LoginCard">
                <div className="Logo">Aij?</div>
                <input className="LoginInput" type="text" placeholder="Username"
                    onChange={(event) => setName(event.target.value)}/>
                <input className="LoginInput" type="text" placeholder="Room ID"
                    onChange={(event) => setRoom(event.target.value)}/>
                <Link to={`/lobby?name=${name}&room=${room}`}>
                  <button className="Join Btn" type="submit">Join</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
