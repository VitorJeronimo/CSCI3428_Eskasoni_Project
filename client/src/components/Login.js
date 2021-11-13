import {Link} from "react-router-dom";

const Login = ({setRoomName, setUserName, joinRoom}) => {
    return (
        <div>
            <h3>Join game</h3>
            <input type="text" placeholder="Username" 
            onChange={(event) => {setUserName(event.target.value)}}/>
            <input type="text" placeholder="Room ID" 
            onChange={(event) => {setRoomName(event.target.value)}}/>
            <Link to="/game" onClick={joinRoom}>Join</Link>
        </div>
    );
}
 
export default Login;