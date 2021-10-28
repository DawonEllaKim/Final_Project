import "./App.css";
import { Route } from "react-router";

import { BrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Write from './pages/Write';
import Detail from './pages/Detail';
import MyPage from "./pages/MyPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/posts/:id" component={Detail} />
        <Route exact path="/myPage" component={MyPage} />
      </BrowserRouter>
    </div>
  );
}

export default App;
