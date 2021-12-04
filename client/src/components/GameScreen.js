//===== IMPORTS ===================================================================================
// Required imports
import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

// Local imports
import CategoryList from "./CategoryList";
import Chat from "./Chat";
import CurrentLetter from "./CurrentLetter";
import Timer from "./Timer";

const GameScreen = ({ socket }) => {
    //===== VARIABLES ===============================================================================
    const categoryValues = {};
    const minSecs = {minutes: 0, seconds: 0}
    const history = useHistory();

    //===== STATES ==================================================================================
    const [gameStarted, setGameStarted] = useState(false);
    const [categories, setCategories] = useState([]);
    const [currentLetter, setCurrentLetter] = useState({});

    //===== EVENT EMISSION ==========================================================================
    /**
     * @author Gillom McNeil (A00000000)    TODO: Change A number
     *
     */
    const startGame = () => {
        socket.emit("start_game");
    };

    //===== EVENT HANDLING ==========================================================================
    /**
     * @author Vitor Jeronimo (A00431599)
     *
     * Handles the "update_client" event emitted by the server.
     *
     * Sets the states for currentLetter and categories.
     */
    socket.on("update_client", gameState => {
        setCurrentLetter(gameState.currentLetter);
        setCategories(gameState.currentCategories);

        if (!gameStarted) {
            setGameStarted(true);
        }
    });

    /**
     * @author Vitor Jeronimo (A00431599)
     *
     * Handles the "redirect_to_login" event emitted by the server.
     *
     * Redirects the user to the login page with an error message.
     */
    socket.on("redirect_to_login", () => {
        history.push("/");
        window.alert("The server could not access your username and room ID. Please, log in again.");
    });

    //===== EFFECTS ===============================================================================
    /**
     * @author Vitor Jeronimo (A00431599)
     * 
     * Waits for currentLetter to change after "update_client" is handled by
     * the client side and plays the audio for the current letter.
     */
 //   useEffect(() => {
   //     const audio = new Audio(currentLetter.audio);
     //   audio.play();
    //}, [currentLetter]);

    //===== FUNCTIONS ===============================================================================
    /**
     * @author Gillom McNeil (A00000000)    TODO: Change A number
     *
     * TODO: Write documentation for this function
     */
    const setCategoryValue = (userInput, category) => {
        if (userInput != "") {
            categoryValues[category] = userInput;
        }
    };

    /**
     * @author Vitor Jeronimo (A00431599)
     *
     * Plays the current letter sound.
     */
    const playSound = () => {
        //TODO Implement the logic for the button 
    }

    //===== COMPONENT =============================================================================
    return (
        <div className="App">
            <CurrentLetter 
                currentLetter={currentLetter} 
                gameStarted={gameStarted}
                playSound={playSound}
            />
            <Timer minSecs={minSecs} startGame={startGame} socket={socket} categoryValues={categoryValues} />
            <CategoryList categories={categories} setCategoryValue={setCategoryValue} />
            <Chat socket={socket} />
        </div>
    );
}

export default GameScreen;
