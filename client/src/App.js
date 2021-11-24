//===== IMPORTS ===================================================================================
// Required imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";

// Local imports
import GameScreen from "./components/GameScreen";
import Login from "./components/Login";

// Socket.io setup
const socket = io.connect("http://localhost:5000");

//===== APP =======================================================================================
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login socket={socket}/>
        </Route>
        <Route exact path="/game">
          <GameScreen socket={socket}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
