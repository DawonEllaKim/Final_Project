import "./App.css";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore.js";

//  로그인/회원가입
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SignDog from "./pages/SignDog";

//  메인 페이지
import Main from "./pages/Main";
import Weather from "./components/Weather";
import CheckMain from "./pages/CheckMain";

// 산책 유의사항
import Caution1 from "./pages/Caution1";
import Caution2 from "./pages/Caution2";
import Caution3 from "./pages/Caution3";

//  산책 게시물 조회/등록/수정 페이지
import Write from "./pages/Write";
import Detail from "./pages/Detail";
import PostEdit from "./pages/PostEdit";
import AddDate from "./components/AddDate";

// 지도
import Map2 from "./pages/Map2";
import MapContainer3 from "./components/MapContainer3";
import MapEdit from "./pages/MapEdit";
import Map from "./pages/Map";
import EditMapContainer3 from "./components/EditMapContainer";
import FindLocation from "./components/FindLocation";
import Road from "./pages/Road";
import MapPractice from "./pages/MapPractice";

// 마이페이지
import MyPage from "./pages/MyPage";
import MyProfile from "./pages/MyProfile";
import DogProfile from "./pages/DogProfile";
import UserProfile from "./pages/UserProfile";

// 개스타그램
import DogStaWrite from "./pages/DogStaWrite";
import DogStaDetail from "./pages/DogStaDetail";
import DogStaEdit from "./components/MyPage/DogStaEdit";
import DogStaGram from "./pages/DogStaGram";

// 진행중
// import Calendar from "./pages/Calendar";
// import Message from "./pages/Message";
// import KakaoSignUp from "./pages/KakaoSignUp";
// import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";
// import ChatPage from "./pages/ChatPage";
// import ChatPageElla from "./pages/ChatPageElla";
// import Join from "./components/Join";
// import Chat from "./components/Chat";
// import PrivateRoute from "./shared/PrivateRoute";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        {/* 로그인/회원가입 */}
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signDog" component={SignDog} />

        {/* 메인 페이지 */}
        <Route exact path="/" component={Main} />
        <Route exact path="/check" component={CheckMain} />
        <Route exact path="/weather" component={Weather} />

        {/* 산책 유의사항 */}
        <Route exact path="/caution1" component={Caution1} />
        <Route exact path="/caution2" component={Caution2} />
        <Route exact path="/caution3" component={Caution3} />

        {/* 산책 게시물 조회/등록/수정 페이지 */}
        <Route exact path="/write/:id" component={Write} />
        <Route exact path="/posts/:id" component={Detail} />
        <Route exact path="/postEdit/:id" component={PostEdit} />
        <Route exact path="/addDate" component={AddDate} />

        {/* 지도 */}
        <Route exact path="/map2" component={Map2} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/mapEdit/:id" component={MapEdit} />
        <Route exact path="/MapContainer3" component={MapContainer3} />
        <Route
          exact
          path="/editMapContainer3/:id"
          component={EditMapContainer3}
        />
        <Route exact path="/findLocation" component={FindLocation} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/road" component={Road} />
        <Route exact path="/mapPractice" component={MapPractice} />

        {/* 마이페이지 */}
        <Route exact path="/mypage/:userId" component={MyPage} />
        <Route exact path="/dogProfile" component={DogProfile} />
        <Route exact path="/userProfile" component={UserProfile} />
        <Route exact path="/myProfile" component={MyProfile} />

        {/* 개스타그램 */}
        <Route exact p ath="/dogstagram" component={DogStaGram} />
        <Route
          exact
          path="/dogstadetail/:userId/:dogPostId"
          component={DogStaDetail}
        />
        <Route exact path="/dogstawrite" component={DogStaWrite} />
        <Route exact path="/dogstaedit/:dogPostId" component={DogStaEdit} />

        {/* 진행중... */}
        {/* <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/kakaosignup" component={KakaoSignUp} />
        <Route
          exact
          path="/oauth/kakao/callback"
          component={OAuth2RedirectHandler}
        />
        <Route exact path="/chatPage" component={ChatPage} />
        <Route exact path="/chatPageElla" component={ChatPageElla} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/chat/:id" component={Chat} />
        <Route exact path="/message" component={Message} /> */}
      </ConnectedRouter>
    </div>
  );
}
export default App;
