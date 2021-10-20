import { useState } from "react";
import ActionButtons from "./components/ActionButtons";
import CategoryList from "./components/CategoryList";
import CurrentLetter from "./components/CurrentLetter";
import Timer from "./components/Timer";

function App() {
  //===== VARIABLES ============================================================
  const letters = ["P","T","K","Q","J","S","L","M","N","W","Y","A","E","I","O","U"];
  const MinSecs = {minutes: 0, seconds: 0}

  //===== STATES ===============================================================
  // These are just placeholder categories, we need to define the ones
  // that are actually going into the first release.
  const [categories, setCategories] = useState([
    { id: 1, title: "Animals", completed: false },
    { id: 2, title: "Behavior", completed: false },
    { id: 3, title: "Body Parts", completed: false },
    { id: 4, title: "Clothing", completed: false },
    { id: 5, title: "Color", completed: false },
    { id: 6, title: "Trees", completed: false },
  ]);

  const [currentLetter, setCurrentLetter] = useState(letters.at(Math.floor(Math.random()*16)));

  //===== FUNCTIONS ============================================================
  /**
   * Checks if the word given by the user is a valid answer to the category.
   * Initially, it only checks if the word starts with the chosen initial letter.
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

  const handleNewCharacter = () => {
    setCurrentLetter(letters[Math.floor(Math.random()*16)]);
  }

  //===== APP ==================================================================

  return (
    <div className="App">
      <CurrentLetter currentLetter={ currentLetter } />
      <Timer MinSecs={MinSecs}/>
      <ActionButtons onClick={handleNewCharacter}/>
      <CategoryList categories={categories} onBlur={checkInput} />
    </div>
  );
}

export default App;