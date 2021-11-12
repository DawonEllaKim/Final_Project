import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// 컴포넌츠
import GaeStaCard from "../components/MyPage/GaeStaCard";
import DogCard from "../components/DogCard";
import UserCard from "../components/UserCard";
import ListCard from "../components/MyPage/ListCard";
import NavBar from "../components/NavBar";
import Chat from "../components/Chat";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as signActions } from "../redux/modules/sign";

// 아이콘
import { FiLogOut } from "react-icons/fi";
import notification from "../image/Notification.png";
import backward from "../image/backward.png";
import dog from "../image/dog.png";
import myPage from "../image/myPage.png";
import chat from "../image/chat.png";
import edit from "../image/edit.png";

// 로그인 이미지
import logo from "../image/loginLogo.png";
import login from "../image/login.png";
import loginText from "../image/loginText.png";
import ChatPageElla from "./ChatPageElla";
import { current } from "immer";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [check, setCheck] = useState();

  const userInfo = useSelector((state) => state.user.list);
  const currentPageUserId = props.match.params.userId;
  const userId = localStorage.getItem("userId");

  // 로그아웃
  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(signActions.logOut());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  useEffect(() => {
    dispatch(userActions.getMypageMD(currentPageUserId));
    setCheck("sta");
  }, []);

  return (
    <div>
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
            <img src={notification} style={{ width: "24px", height: "24px" }} />
          </button>
        </Header>

        {/* 유저 정보 */}
        <UserInfo>
          <UserInfoLeft>
            {/* 유저 사진 */}
            <UserImg src={userInfo.userImage} />
            {/* 편집모드 */}
            <Edit>
              <img src={edit} />
            </Edit>
          </UserInfoLeft>

          <UserRight>
            {/* 유저 닉네임 + 유저 주소 */}
            <div>
              <span>{userInfo.userNickname}</span>
              <span>{userInfo.userLocation}</span>
            </div>

            {/* 로그아웃 버튼 */}
            {currentPageUserId === userId && (
              <LogOut onClick={logout}>
                <FiLogOut size="16" />
                <span>로그아웃</span>
              </LogOut>
            )}
          </UserRight>
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
            <img src={chat} />
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
        {check === "sta" && <GaeStaCard userId={currentPageUserId} />}

        {/* 상황 마다 바뀔 카드들 */}
        <div>
          {check === "dog" && (
            <div>
              <DogCard post={userInfo} userId={currentPageUserId} />
              <UserCard post={userInfo} userId={currentPageUserId} />
            </div>
          )}
          {check === "list" && (
            <ListCard post={userInfo} userId={currentPageUserId} />
          )}
        </div>

        <NavBar />
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
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
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  width: 100%;
  height: 88px;

  margin-bottom: 22px;
  border-top: 0.25px solid #b9b8b8;
  border-bottom: 0.25px solid #b9b8b8;
`;
const UserInfoLeft = styled.div`
  position: relative;

  width: 91px;
  height: 88px;

  margin-right: 16px;
  border: 1px solid black;
`;

const UserRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const UserImg = styled.img`
  width: 83px;
  height: 83px;

  margin-right: 14.5px;
  border: 1px solid black;
  border-radius: 50%;
`;
const Edit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 36px;
  height: 36px;
  padding: 6px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: #fff;

  img {
    width: 22px;
    height: 22px;
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
    object-fit: cover;
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
