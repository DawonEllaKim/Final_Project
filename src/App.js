import "./App.css";
import { Route } from "react-router";

import { ConnectedRouter } from "connected-react-router";
import Main from "./pages/Main";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import SignDog from "./pages/SignDog";
import { history } from "./redux/configureStore.js";
import Map2 from "./pages/Map2";
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import MyProfile from "./pages/MyProfile";
import PostEdit from "./pages/PostEdit";
import DogProfile from "./pages/DogProfile";
import UserProfile from "./pages/UserProfile";
import Calendar from "./pages/Calendar";
import AddRecord from "./pages/AddRecord";
import AddDetail from "./pages/AddDetail";
import Message from "./pages/Message";
import MapContainer3 from "./components/MapContainer3";
import AddDate from "./components/AddDate";
import MapEdit from "./pages/MapEdit";
import EditMapContainer3 from "./components/EditMapContainer";
import CheckMain from "./pages/CheckMain";
import KakaoSignUp from "./pages/KakaoSignUp";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
import Caution1 from "./pages/Caution1";
import Caution2 from "./pages/Caution2";
import Caution3 from "./pages/Caution3";

import ChatPage from './pages/ChatPage';
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route exact path="/" component={Main} />
        <Route exact path="/check" component={CheckMain} />
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signDog" component={SignDog} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/map2" component={Map2} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/write/:id" component={Write} />
        <Route exact path="/posts/:id" component={Detail} />
        <Route exact path="/postEdit/:id" component={PostEdit} />
        <Route exact path="/dogProfile" component={DogProfile} />
        <Route exact path="/userProfile" component={UserProfile} />
        <Route exact path="/myProfile" component={MyProfile} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/addRecord" component={AddRecord} />
        <Route exact path="/addDetail" component={AddDetail} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/MapContainer3" component={MapContainer3} />
        <Route exact path="/addDate" component={AddDate} />
        <Route exact path="/mapEdit/:id" component={MapEdit} />
        <Route
          exact
          path="/editMapContainer3/:id"
          component={EditMapContainer3}
        />
        <Route exact path="/kakaosignup" component={KakaoSignUp} />
        <Route
          exact
          path="/oauth/kakao/callback"
          component={OAuth2RedirectHandler}
        />
        <Route exact path="/caution1" component={Caution1} />
        <Route exact path="/caution2" component={Caution2} />
        <Route exact path="/caution3" component={Caution3} />
        <Route exact path="/chatPage" component={ChatPage} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/chat" component={Chat} />
      </ConnectedRouter>
    </div>
  );
}
export default App;
