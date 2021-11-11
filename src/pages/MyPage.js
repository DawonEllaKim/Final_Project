import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// 컴포넌츠
import GaeStaCard from "../components/MyPage/GaeStaCard";
import DogCard from "../components/MyPage/DogCard";
import ListCard from "../components/MyPage/ListCard";
import NavBar from "../components/NavBar";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as signActions } from "../redux/modules/sign";

// 아이콘
import { FiLogOut } from "react-icons/fi";
import notification from "../image/Notification.png";
import backward from "../image/backward.png";
import dog from "../image/dog.png";
import myPage from "../image/mypage.png";
import chat from "../image/chat.png";

// 로그인 이미지
import logo from "../image/loginLogo.png";
import login from "../image/login.png";
import loginText from "../image/loginText.png";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [check, setCheck] = useState("sta");

  const pageList = useSelector((state) => state.user.page);
  const userInfo = useSelector((state) => state.user.list);
  const is_login = localStorage.getItem("userId");
  const userId = localStorage.getItem("userId");

  console.log(userInfo);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(signActions.logOut());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  useEffect(() => {
    dispatch(userActions.getMypageMD(userId));
  }, []);

  return (
    <div>
      {is_login ? (
        <Wrap>
          {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 */}
          <Header>
            <button
              onClick={() => {
                history.goBack();
              }}
            >
              <img src={backward} style={{ width: "10px", height: "18px" }} />
            </button>
            <p>{userInfo.userNickname}님의 페이지</p>
            <button>
              <img
                src={notification}
                style={{ width: "24px", height: "24px" }}
              />
            </button>
          </Header>

          {/* 유저 정보 */}
          <UserInfo>
            {/* 유저 사진 */}
            <img src={userInfo.userImage} />

            {/* 유저 닉네임 + 유저 주소 */}
            <div>
              <span>{userInfo.userNickname}</span>
              <span>서울시 양천구 목동</span>
            </div>

            {/* 로그아웃 버튼 */}
            <LogOut onClick={logout}>
              <FiLogOut size="16" />
              <span>로그아웃</span>
            </LogOut>
          </UserInfo>

          {/* 다른 페이지로 이동 버튼들 */}
          <Buttons>
            <div
              onClick={() => {
                setCheck("sta");
              }}
            >
              <div>
                <img src={dog} />
                <span>개스타그램</span>
              </div>
            </div>
            <div
              onClick={() => {
                setCheck("dog");
              }}
            >
              <img src={chat} onClick={() => history.push("/mypage")} />
              <span>등록정보</span>
            </div>
            <div
              onClick={() => {
                setCheck("list");
              }}
            >
              <img src={myPage} />
              <span>산책 목록</span>
            </div>
          </Buttons>

          {/* 상황 마다 바뀔 카드들 */}
          <div>
            {check === "sta" && <GaeStaCard />}
            {check === "dog" && <DogCard post={userInfo} />}
            {check === "list" && <ListCard post={pageList} />}
          </div>
          <NavBar />
        </Wrap>
      ) : (
        <Wrap>
          <div onClick={() => history.push("/login")}>
            <LoginImg>
              <Logo src={logo} />
              <Login src={login} />
              <LoginText src={loginText} />
            </LoginImg>
          </div>
        </Wrap>
      )}
    </div>
  );
};

const LoginImg = styled.div`
  position: relative;
  width: 350px;
  height: 220px;
  border-radius: 25px;
  cursor: pointer;
`;
const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Login = styled.img`
  position: absolute;
  top: 58.5%;
  left: 33%;
  z-index: 3;
`;
const LoginText = styled.img`
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translateX(-50%);
`;

const Wrap = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 390px;
  margin: auto;

  font-size: 14px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 350px;
  height: 52px;
  margin: 10px auto 18px auto;
  font-size: 18px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  width: 350px;
  height: 108px;
  margin-bottom: 22px;
  border-top: 0.25px solid #b9b8b8;
  border-bottom: 0.25px solid #b9b8b8;

  img {
    width: 80px;
    height: 80px;
    margin-right: 14.5px;
    border: 1px solid black;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-right: 60px;
  }

  span {
    margin-bottom: 7px;
    font-size: 16px;
    color: #5f5f5f;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 297px;
  height: 51px;
  margin: 0 auto 11px auto;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }
  img {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }
`;
const LogOut = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default MyPage;
