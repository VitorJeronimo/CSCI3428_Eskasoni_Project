import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="*" element={<Redirect to="/" />} />
    </Router>
  );
}

export default App;
