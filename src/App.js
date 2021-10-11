import ActionButtons from './components/ActionButtons';
import CategoryList from './components/CategoryList';
import InitialLetter from './components/InitialLetter';
import Timer from './components/Timer'
import './App.css';

function App() {
  return (
    <div className="App">
      <InitialLetter />
      <Timer />
      <ActionButtons />
      <CategoryList />
    </div>
  );
}

export default App;
