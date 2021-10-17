import { useState } from 'react'
import ActionButtons from './components/ActionButtons'
import CategoryList from './components/CategoryList'
import InitialLetter from './components/InitialLetter'
import Timer from './components/Timer'
import './App.css'

function App() {
  // These are just placeholder categories, we need to define the ones
  // that are actually going into the first release.
  const [categories, setCategories] = useState([
    {id: 1, title: "Category 1", completed: false},
    {id: 2, title: "Category 2", completed: false},
    {id: 3, title: "Category 3", completed: false},
    {id: 4, title: "Category 4", completed: false},
    {id: 5, title: "Category 5", completed: false},
    {id: 6, title: "Category 6", completed: false},
  ]);

  const [initialLetter, setInitialLetter] = useState("A");

  return (
    <div className="App">
      <InitialLetter />
      <Timer />
      <ActionButtons />
      <CategoryList 
      categories={categories} 
      setCategories={setCategories}
      initialLetter={initialLetter}/>
    </div>
  );
}

export default App;
