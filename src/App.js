import "./App.css";
import { Route } from "react-router";

import { BrowserRouter } from "react-router-dom";
import LogIn from "../src/pages/LogIn";
import SignUp from "../src/pages/SignUp";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
      </BrowserRouter>
    </div>
  );
}

export default App;
