const { shuffle } = require('./utils');

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

const categories = [
    "Activity",
    "Animals",
    "Behaviour",
    "Body Part",
    "Cities",
    "Clothing",
    "Color",
    "Food",
    "Household",
    "Name",
    "Tree",
    "Weather",
];

class GameState {
    constructor() {
        this.currentLetter = {};
        this.currentCategories = [];
        this.gamePhase = null;
        this.timer = {
            timerDuration: null,
            timeRemaining: null
        }

        console.log('constructor entered');
    }

    generateNewGameState() {
        this.currentLetter = this._getNewCurrentLetter();
        this.currentCategories = this._getNewCurrentCategories();
        console.log(this);
    }

    _getNewCurrentLetter() {
        return letters[Math.floor(Math.random() * letters.length)];
    }

    _getNewCurrentCategories() {
        const shuffledCategories = shuffle(categories).slice(0, 6);
        const newCurrentCategories = [];

        shuffledCategories.forEach((categoryTitle, index) => {
            newCurrentCategories.push({
                id: index,
                title: categoryTitle
            });
        });

        return newCurrentCategories;
    }

    static createGameState() {
        const newGameState = new GameState();
        newGameState.generateNewGameState();

        return newGameState;
    }

}

module.exports = GameState;
