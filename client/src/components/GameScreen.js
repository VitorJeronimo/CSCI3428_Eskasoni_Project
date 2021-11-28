//===== IMPORTS ===================================================================================
// Required imports
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

// Local imports
// import Chat from "./Chat";
import CategoryList from "./CategoryList";
import Chat from "./Chat";
import CurrentLetter from "./CurrentLetter";
import Timer from "./Timer";

const GameScreen = ({ socket }) => {
  //===== VARIABLES ===============================================================================
  const MinSecs = {minutes: 0, seconds: 0}
  const history = useHistory();
  const location = useLocation();

  //===== STATES ==================================================================================
  // Game states
  const [roundDuration, setRoundDuration] = useState();
  const [categories, setCategories] = useState([]);
  const [currentLetter, setCurrentLetter] = useState("");

  //===== EVENT EMISSION ==========================================================================
  useEffect(() => {
    socket.emit('request_client_update');
    console.log('game loaded');
    // NOTE: the server crashes when the page is reloaded because it no longer has the
    // "userName" and "roomName" variables defined.
  }, [location]);

  const startGame = () => {
    socket.emit("start_game");
  };

  //===== EVENT HANDLING ==========================================================================
  socket.on("update_client", gameState => {
    setCurrentLetter(gameState.currentLetter);
    setCategories(gameState.currentCategories);
  });

  socket.on("redirect_to_login", () => {
    history.push("/");
    window.alert("The server could not access your username and room ID. Please, log in again.");
  })

  return (
    <div className="App">
      <CurrentLetter currentLetter={currentLetter}/>
      <Timer MinSecs={MinSecs} startGame={startGame}/>
      <CategoryList categories={categories}/>
      <Chat socket={socket}/> 
    </div>
  );
}

export default GameScreen;
