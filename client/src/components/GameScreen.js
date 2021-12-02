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
    const MinSecs = {minutes: 0, seconds: 0}
    const history = useHistory();
    const location = useLocation();
    const categoryValues = {};

    const letters = [
        {character: "A'", audio: "./audio/A_long.mp3"}, 
        {character: "A", audio: "./audio/A.mp3"},
        {character: "E'", audio: "./audio/E_long.mp3"},
        {character: "E", audio: "./audio/E.mp3"},
        {character: "I'", audio: "./audio/I_long.mp3"},
        {character: "I", audio: "./audio/I.mp3"},
        {character: "J", audio: "./audio/J.mp3"},
        {character: "K", audio: "./audio/K.mp3"},
        {character: "L", audio: "./audio/L.mp3"},
        {character: "M", audio: "./audio/M.mp3"},
        {character: "N", audio: "./audio/N.mp3"},
        {character: "O'", audio: "./audio/O_long.mp3"},
        {character: "O", audio: "./audio/O.mp3"},
        {character: "P", audio: "./audio/P.mp3"},
        {character: "Q", audio: "./audio/Q.mp3"},
        {character: "S", audio: "./audio/S.mp3"},
        {character: "A", audio: "./audio/SCHWA.mp3"},
        {character: "T", audio: "./audio/T.mp3"},
        {character: "U'", audio: "./audio/U_long.mp3"},
        {character: "U", audio: "./audio/U.mp3"},
        {character: "W", audio: "./audio/W.mp3"},
    ]
    //===== STATES ==================================================================================
    // Game states
    const [categories, setCategories] = useState([]);
    const [currentLetter, setCurrentLetter] = useState({});

    //===== EVENT EMISSION ==========================================================================
    //useEffect(() => {
    //    socket.emit('request_client_update');
    //}, [location]);

    const startGame = () => {
        socket.emit("start_game");
    };

    //===== EVENT HANDLING ==========================================================================
    socket.on("update_client", gameState => {
        console.log("client#update_client: gameState -> ", gameState);//DELETE
        console.log("client#update_client: gameState.currentLetter -> ", gameState.currentLetter);//DELETE
        setCurrentLetter(gameState.currentLetter);
        setCategories(gameState.currentCategories);

        console.log("client#update_client: currentLetter -> ", currentLetter);//DELETE
        console.log("client#update_client: currentCategories -> ", categories);//DELETE

    });

    
    useEffect(() => {
        console.log("client#useEffect: currentLetter -> ", currentLetter);//DELETE
        console.log("client#useEffect: currentCategories -> ", categories);//DELETE
        
        const audio = new Audio(currentLetter.audio);
        audio.play();
    }, [currentLetter]);

    // socket.on("display_round_results", room => {
    //     setRoomState(room);
    // });

    socket.on("redirect_to_login", () => {
        history.push("/");
        window.alert("The server could not access your username and room ID. Please, log in again.");
    });

    //===== FUNCTIONS ===============================================================================
    const setCategoryValue = (userInput, category) => {
        if (userInput != "") {
            categoryValues[category] = userInput;
        }
    };

    return (
        <div className="App">
            <CurrentLetter currentLetter={currentLetter} />
            <Timer MinSecs={MinSecs} startGame={startGame} socket={socket} categoryValues={categoryValues} />
            <CategoryList categories={categories} setCategoryValue={setCategoryValue} />
            <Chat socket={socket} />
        </div>
    );
}

export default GameScreen;
