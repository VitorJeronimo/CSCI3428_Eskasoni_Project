import { useState } from 'react'
import { Link } from "react-router-dom";

const Login = ({ socket }) => {
    //===== STATES ================================================================================
    // These states are set by the Login component.
    const [userName, setUserName] = useState("");
    const [roomName, setRoomName] = useState("");

    //===== EVENT EMISSION ========================================================================
    const joinRoom = () => {
      if (userName !== "" && roomName !== "") {
          socket.emit("join_room", { userName, roomName });
      }
    };

    //===== COMPONENT =============================================================================
    return (
        <>
            <h3>Join game</h3>
            <input type="text" placeholder="Username" 
            onBlur={(event) => {setUserName(event.target.value)}}/>
            <input type="text" placeholder="Room ID" 
            onBlur={(event) => {setRoomName(event.target.value)}}/>
            <Link to="/game" onClick={joinRoom}>Join</Link>
        </>
    );
}
 
export default Login;
