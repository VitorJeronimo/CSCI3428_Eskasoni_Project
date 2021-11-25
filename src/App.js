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
  //===== VARIABLES ============================================================
  const letters = ["P","T","K","Q","J","S","L","M","N","W","Y","A","E","I","O","U"];
  const MinSecs = {minutes: 0, seconds: 0}

  //===== STATES ===============================================================
  // These are just placeholder categories, we need to define the ones
  // that are actually going into the first release.
  const [categories, setCategories] = useState([
    { id: 1, title: "Animals", completed: false },
    { id: 2, title: "Places", completed: false },
    { id: 3, title: "Summer Activities", completed: false },
    { id: 4, title: "Transportation", completed: false },
    { id: 5, title: "Color", completed: false },
    { id: 6, title: "Nature", completed: false },
  ]);

  const [currentLetter, setCurrentLetter] = useState("");

  // These states are set by the Login component.
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  //===== FUNCTIONS ============================================================
  /**
   * Checks if the word given by the user is a valid answer to the category.
   * Initially, it only checks if the word starts with the chosen initial letter.
   * 
   * @param {string} userInput value returned from category input tag.
   * @param {int}    id id of the category that has been interacted with.
   */
  const checkInput = (userInput, id) => {
    // If user input is not empty, check if the first letter matches the chosen letter
    // for the current round.
    if (userInput !== "") {
      if (userInput[0].toLowerCase() === currentLetter.toLowerCase()) {
        setCategories(
          categories.map((category) =>
            category.id === id ? { ...category, completed: true } : category
          )
        );
      }
      else {
        setCategories(
          categories.map((category) =>
            category.id === id ? { ...category, completed: false } : category
          )
        );
      }
    }
  };

  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
        socket.emit("join_room", { userName, roomName });
    }
  };

  socket.on("update_client", (gameDuration, currentLetter, currentCategories) => {
    setCurrentLetter(currentLetter);
    setCategories(currentCategories);
  })

  const startGame = () => {
    socket.emit("start_game");
  };

  //===== APP ==================================================================

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
