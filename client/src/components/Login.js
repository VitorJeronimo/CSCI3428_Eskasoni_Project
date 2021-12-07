import { useState } from 'react'
import { useHistory } from "react-router-dom";

const Login = ({ socket }) => {
    //===== STATES ================================================================================
    // These states are set by the Login component.
    const [userName, setUserName] = useState("");
    const [roomName, setRoomName] = useState("");
    const history = useHistory()

    //===== EVENT EMISSION ========================================================================
    const joinRoom = () => {
      if (userName !== "" && roomName !== "") {
          socket.emit("join_room", { userName, roomName });
          history.push("/game", {user: userName, room: roomName});
      }
    };

    //===== COMPONENT =============================================================================
    return (
        <div className="loginPage">
            <div className="pageLogo">Aij?</div>
            <input className="uName" type="text" placeholder="Username" 
            onBlur={(event) => {setUserName(event.target.value)}}/>
            <input className="rID" type="text" placeholder="Room ID" 
            onBlur={(event) => {setRoomName(event.target.value)}}/>
            <button className="joinButton" to="/game" onClick={joinRoom}>Join</button>
        </div>
    );
}
 
export default Login;
