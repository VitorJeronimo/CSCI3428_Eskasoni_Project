import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./pages/login/Login";
import Lobby from "./pages/lobby/Lobby";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/lobby" component={Lobby} />
      <Route path="*" element={<Redirect to="/" />} />
    </Router>
  );
}

export default App;
