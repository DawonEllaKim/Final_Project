import "./App.css";
import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore.js";
import GlobalStyle from "./GlobalStyle";
import PrivateRoute from "./shared/PrivateRoute";
import { useSelector } from "react-redux";
//  로그인/회원가입
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SignDog from "./pages/SignDog";

//  메인 페이지
import AllList from "./pages/AllList";
import Main from "./pages/Main";
import Weather from "./components/Weather";
import CheckMain from "./pages/CheckMain";

// 산책 유의사항
import Caution1 from "./pages/Caution/Caution1";
import Caution2 from "./pages/Caution/Caution2";
import Caution3 from "./pages/Caution/Caution3";

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
import DogStaWrite from "./pages/DogStaGram/DogStaWrite";
import DogStaDetail from "./pages/DogStaGram/DogStaDetail";
import InfoList from "./components/MyPage/InfoList";
import DogStaMain from "./pages/DogStaGram/DogStaMain";
import DogStaEdit from "./pages/DogStaGram/DogStaEdit";

// 알람 + 쪽지
import Notification from "./pages/Notification";
import ChatWrite from "./pages/Chat/ChatWrite";
import ChatDetail from "./pages/Chat/ChatDetail";

// 진행중
// import Calendar from "./pages/Calendar";
// import KakaoSignUp from "./pages/KakaoSignUp";
// import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";

//웹소켓
import { io } from "socket.io-client";
import Toast from "./components/Toast/Toast";
import ChatSend from "./pages/Chat/ChatSend";
import CommonModal from "./components/Modal/CommonModal";
import DeleteModal from "./components/Modal/deleteModal";
import ErrorModal from "./components/Modal/ErrorModal";


function App() {
  //socket
  const userId = localStorage.getItem("userId");
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    setSocket(io.connect(`https://www.walkadog.shop/notification/${userId}`));
  }, []);

  useEffect(() => {
    socket?.emit("postUser", userId);
  }, []);

  useEffect(() => {
    socket?.on(
      "getNotification",
      (data) => {
        setNotification((prev) => [...prev, data]);
      },
      [socket]
    );
  }, [socket]);

  useEffect(() => {
    localStorage.setItem("noti", JSON.stringify(notification));
    handleToast("letter");
  }, [notification]);

  //Toast
  const msgList = {
    letter: "새로운 쪽지가 왔습니다!",
    like: "내 게시글에 좋아요를 했습니다",
    comment: "내 게시글에 댓글을 남겼습니다",
  };

  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState("");

  const handleToast = (type) => {
    if (!ToastStatus && notification.length > 0) {
      setToastStatus(true);
      setToastMsg(msgList[type]);
    }
  };

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => {
        setToastStatus(false);
        setToastMsg("");
      }, 1500);
    }
  }, [ToastStatus]);
  
  

  return (
    <div className="App">
      <GlobalStyle />
      {ToastStatus && (
        <>
          <Toast msg={ToastMsg} />
        </>
      )}
      <ConnectedRouter history={history}>
        {/* 로그인/회원가입 */}
        <Route exact path="/logIn" component={LogIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/signDog" component={SignDog} />
        {/* 메인 페이지 */}
        <Route exact path="/alllist/:page" component={AllList} />
        <Route exact path="/" component={Main} />
        <Route exact path="/check" component={CheckMain} />
        <Route exact path="/weather" component={Weather} />
        {/* 산책 유의사항 */}
        <Route exact path="/caution1" component={Caution1} />
        <Route exact path="/caution2" component={Caution2} />
        <Route exact path="/caution3" component={Caution3} />
        {/* 모달 */}
        <Route exact path="/successmodal"  component={CommonModal} />
        <Route exact path="/deletemodal"  component={DeleteModal} />
        <Route exact path="/errormodal"  component={ErrorModal} />
        {/* 산책 게시물 조회/등록/수정 페이지 */}
        <PrivateRoute exact path="/write/:id" component={Write} />
        <PrivateRoute exact path="/posts/:id" component={Detail} />
        <PrivateRoute exact path="/postEdit/:id" component={PostEdit} />
        <PrivateRoute exact path="/addDate" component={AddDate} />
        {/* 지도 */}
        <PrivateRoute exact path="/map2" component={Map2} />
        <PrivateRoute exact path="/write" component={Write} />
        <PrivateRoute exact path="/mapEdit/:id" component={MapEdit} />
        <PrivateRoute exact path="/MapContainer3" component={MapContainer3} />
        <PrivateRoute
          exact
          path="/editMapContainer3/:id"
          component={EditMapContainer3}
        />
        <PrivateRoute exact path="/findLocation" component={FindLocation} />
        <PrivateRoute exact path="/map" component={Map} />
        <PrivateRoute exact path="/road" component={Road} />
        <PrivateRoute exact path="/mapPractice" component={MapPractice} />
        {/* 마이페이지 */}
        <PrivateRoute exact path="/mypage/:userId" component={MyPage} />
        <PrivateRoute exact path="/dogProfile" component={DogProfile} />
        <PrivateRoute exact path="/userProfile" component={UserProfile} />
        <PrivateRoute exact path="/myProfile" component={MyProfile} />
        {/* 개스타그램 */}
        <Route exact path="/dogStaMain" component={DogStaMain} />
        <PrivateRoute
          exact
          path="/dogStaDetail/:userId/:dogPostId"
          component={DogStaDetail}
        />
        <PrivateRoute exact path="/dogStaWrite" component={DogStaWrite} />
        <PrivateRoute exact path="/InfoList/:dogPostId" component={InfoList} />
        <PrivateRoute
          exact
          path="/dogStaEdit/:userId/:dogPostId"
          component={DogStaEdit}
        />

        {/* 알람 + 쪽지 */}
        <PrivateRoute exact path="/notification" component={Notification} />
        <PrivateRoute exact path="/ChatDetail/:chatId" component={ChatDetail} />
        <PrivateRoute exact path="/chatsend/:chatId" component={ChatSend} />
        <PrivateRoute
          exact
          path="/chatwrite/:receiverId"
          component={ChatWrite}
        />

        {/* 진행중... */}
        {/* <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/kakaosignup" component={KakaoSignUp} />
        <Route
          exact
          path="/oauth/kakao/callback"
          component={OAuth2RedirectHandler}
        /> */}
      </ConnectedRouter>
    </div>
  );
}
export default App;
