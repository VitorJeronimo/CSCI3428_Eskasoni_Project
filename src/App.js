import { useState } from "react";
import ActionButtons from "./components/ActionButtons";
import CategoryList from "./components/CategoryList";
import InitialLetter from "./components/InitialLetter";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  // These are just placeholder categories, we need to define the ones
  // that are actually going into the first release.
  const [categories, setCategories] = useState([
    { id: 1, title: "Category 1", completed: false },
    { id: 2, title: "Category 2", completed: false },
    { id: 3, title: "Category 3", completed: false },
    { id: 4, title: "Category 4", completed: false },
    { id: 5, title: "Category 5", completed: false },
    { id: 6, title: "Category 6", completed: false },
  ]);

  const [initialLetter, setInitialLetter] = useState("A");

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
      if (userInput[0].toLowerCase() === initialLetter.toLowerCase()) {
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

  const MinSecs = {minutes: 0, seconds: 0}

  return (
    <div className="App">
      <InitialLetter />
      <Timer MinSecs = {MinSecs}/>
      <ActionButtons />
      <CategoryList categories={categories} onBlur={checkInput} />
    </div>
  );
}

export default App;
