import {Link} from "react-router-dom";
import "./../index.css";


const Login = ({setRoomName, setUserName, joinRoom}) => {
    return (
        <div className="loginPage">
            <div className="pageLogo">Aij...?</div>
            <input className="uName" type="text" placeholder="Username"
                onBlur={(event) => { setUserName(event.target.value); } } />
            <input className="rID" type="text" placeholder="Room ID"
                onBlur={(event) => { setRoomName(event.target.value); } } />
            <Link to="/game" onClick={joinRoom}><button type="button" className="joinButton">Join</button></Link>
        </div>
    );
    
}
 
export default Login;