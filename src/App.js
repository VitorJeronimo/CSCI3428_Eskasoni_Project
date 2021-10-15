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
    {id: 1, title: "Authors", completed: false},
    {id: 2, title: "Bodies of water", completed: false},
    {id: 3, title: "A bird", completed: false},
    {id: 4, title: "Countries", completed: false},
    {id: 5, title: "Cartoon characters", completed: false},
    {id: 6, title: "Holidays", completed: false},
  ]);

  return (
    <div className="App">
      <InitialLetter />
      <Timer />
      <ActionButtons />
      <CategoryList categories={categories} setCategories={setCategories}/>
    </div>
  );
}

export default App;
