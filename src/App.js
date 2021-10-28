import "./App.css";
import { Route } from "react-router";

import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <div className="App">
      {/* //connected history */}
      <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/myPage" component={MyPage} />
        <Route exact path="/myProfile" component={MyProfile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
