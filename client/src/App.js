//===== IMPORTS ===================================================================================
// Required imports
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import io from "socket.io-client";

// Local imports
import CategoryList from "./components/CategoryList";
import Chat from "./components/Chat";
import CurrentLetter from "./components/CurrentLetter";
import Login from "./components/Login";
import Timer from "./components/Timer";

// Socket.io setup
const socket = io.connect("http://localhost:5000");

function App() {
  //===== VARIABLES ===============================================================================
  const MinSecs = {minutes: 0, seconds: 0}

  //===== STATES ==================================================================================
  // Game states
  const [roundDuration, setRoundDuration] = useState();
  const [categories, setCategories] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("");

  // These states are set by the Login component.
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  //===== EVENT EMISSION ==========================================================================
  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
        socket.emit("join_room", { userName, roomName });
    }
  };

  const startGame = () => {
    socket.emit("start_game");
  };

  //===== EVENT HANDLING ==========================================================================

  socket.on("update_client", (gameDuration, currentLetter, currentCategories) => {
    setCurrentLetter(currentLetter);
    setCategories(currentCategories);
  })

  //===== APP =====================================================================================

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/game">
            <CurrentLetter currentLetter={ currentLetter } />
            <Timer MinSecs={MinSecs} startGame={startGame}/>
            <CategoryList categories={categories}/>
            <Chat socket={socket} userName={userName} roomName={roomName}/>
          </Route>
          <Route path="/">
            <Login setRoomName={setRoomName} setUserName={setUserName} joinRoom={joinRoom}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
