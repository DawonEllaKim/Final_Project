import "./App.css";
import { Route } from "react-router";

import { ConnectedRouter } from "connected-react-router";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import SignDog from "./pages/SignDog";
import SignOwner from "./pages/SignOwner";
import { history } from "./redux/configureStore.js";
import Map from "./pages/Map";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import MyProfile from "./pages/MyProfile";
import PostEdit from "./pages/PostEdit";
import DogEdit from "./pages/DogEdit";
import UserEdit from "./pages/UserEdit";
import Calendar from "./pages/Calendar";
import AddRecord from "./pages/AddRecord";
import AddDetail from "./pages/AddDetail";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Main} />
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signDog" component={SignDog} />
        <Route exact path="/signOwner" component={SignOwner} />
        <Route exact path="/myPage" component={MyPage} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/write/:id" component={Write} />
        <Route exact path="/posts/:id" component={Detail} />
        <Route exact path="/postEdit/:id" component={PostEdit} />
        <Route exact path="/dogEdit" component={DogEdit} />
        <Route exact path="/userEdit" component={UserEdit} />
        <Route exact path="/myProfile" component={MyProfile} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/addRecord" component={AddRecord} />
        <Route exact path="/addDetail" component={AddDetail} />
      </ConnectedRouter>
    </div>
  );
}
export default App;
