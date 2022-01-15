// Author: Vitor Jeronimo (A00431599)
// Author: Gillom McNeil  (A00450414)

//===== IMPORTS ===================================================================================
// Required imports
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import io from "socket.io-client";

// Local imports
import GameScreen from "./components/GameScreen";
import Login from "./components/Login";
import VoteScreen from "./components/VoteScreen";

// Socket.io setup
const socket = io.connect("http://localhost:3000");

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
        <Route exact path="/vote">
          <VoteScreen socket={socket}/>
        </Route>
        <Route path="*" element={<Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
