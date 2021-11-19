const { shuffle } = require("./utils")

const roomsList = []

const letters = ["P","T","K","Q","J","S","L","M","N","W","Y","A","E","I","O","U"];
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

function createRoom(roomName, admin) {
  const room = {
    roomName,
    admin,
    gameDuration: 120,
    currentLetter: "",
    currentCategories: []
  };

  roomsList.push(room);
  updateRoom(room);

  return room;
}

function getCurrentRoom(roomName) {
    const index = roomsList.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
        return roomsList[index];
    }

    return null;
}

function updateRoom (room) {
  room.currentLetter = generateNewLetter();
  room.currentCategories = generateCategoriesList();
}

function generateNewLetter() {
  return letters[Math.floor(Math.random()*16)];
}

function generateCategoriesList() {
  const randomCategories = shuffle(categories).slice(0,6);
  const newCategoriesList = [];

  randomCategories.forEach((categoryTitle, index) => {
    newCategoriesList.push({
      id: index,
      title: categoryTitle,
      completed: false
    })
  });

  return newCategoriesList;
}

module.exports = {
  roomsList,
  createRoom,
  getCurrentRoom,
  updateRoom
}