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
import redHeart from "../image/redHeart.png";
import grayHeart from "../image/grayHeart.png";
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

import TopBar from "../components/TopBar";

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
        <TopBar>{userInfo.userNickname}님의 페이지</TopBar>
        {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 */}

        {/* 유저 정보 */}
        <UserInfo>
          <UserInfoLeft>
            {/* 유저 사진 */}
            <UserImg src={userInfo.userImage} />

            {/* 편집모드 */}
            {currentPageUserId === userId && (
              <Edit
                onClick={() => {
                  history.push("/userProfile");
                }}
              >
                <img src={edit} />
              </Edit>
            )}
          </UserInfoLeft>

          <UserRight>
            {/* 유저 닉네임 + 유저 주소 */}
            <div>
              <span style={{ fontWeight: "400" }}>{userInfo.userNickname}</span>
              <span style={{ color: "#5F5F5F" }}>{userInfo.userLocation}</span>
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

        {/* 별점/리뷰 */}
        <Review>
          <ReviewLeft>
            <div>
              <img src={redHeart} />
              <img src={redHeart} />
              <img src={redHeart} />
              <img src={redHeart} />
              <img src={grayHeart} />
            </div>
            <p>4.5/5</p>
          </ReviewLeft>
          <ReviewRight>리뷰보기</ReviewRight>
        </Review>

        {/* 다른 페이지로 이동 버튼들 */}
        <Buttons>
          <div
            onClick={() => {
              setCheck("sta");
            }}
          >
            <div>
              <img src={dog} style={{ width: "24px", height: "21px" }} />
              <span>개스타그램</span>
            </div>
          </div>
          <div
            onClick={() => {
              setCheck("dog");
            }}
          >
            <img src={chat} style={{ width: "20px", height: "16px" }} />
            <span>등록정보</span>
          </div>
          <div
            onClick={() => {
              setCheck("list");
            }}
          >
            <img src={myPage} style={{ width: "16px", height: "20px" }} />
            <span>산책 목록</span>
          </div>
        </Buttons>

        {/* 상황 마다 바뀔 카드들 */}
        <Cards>
          {check === "sta" && <GaeStaCard userId={currentPageUserId} />}
          {check === "dog" && (
            <div>
              <UserCard post={userInfo} userId={currentPageUserId} />
              <DogCard post={userInfo} userId={currentPageUserId} />
            </div>
          )}
          {check === "list" && (
            <ListCard post={userInfo} userId={currentPageUserId} />
          )}
        </Cards>

        {/* 고정 버튼 */}
        <NavBar />
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  padding: 0 20px;
`;
const UserInfo = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  width: 100%;
  height: 88px;

  margin-bottom: 24px;
`;
const UserInfoLeft = styled.div`
  position: relative;

  width: 91px;
  height: 88px;

  margin-right: 16px;
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
  padding: 2px;

  margin-right: 14.5px;
  border-radius: 50%;
  object-fit: cover;
`;
const Edit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;

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

  width: 100%;
  height: 48px;
  padding: 0 24px;

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

  span {
    font-size: 14px;
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

  color: #5f5f5f;
`;
const Review = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 66px;
  width: 100%;
  margin-bottom: 22px;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
`;
const ReviewLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    color: #5f5f5f;
  }

  img {
    width: 20px;
    height: 18px;
    margin-right: 2px;
  }

  p {
    color: #5f5f5f;
  }
`;
const ReviewRight = styled.div`
  color: #5f5f5f;
`;
const Cards = styled.div`
  width: 100%;
  margin: 24px 0 200px 0;
  padding-top: 24px;
  border-top: 1px solid #c4c4c4;
`;

export default MyPage;
