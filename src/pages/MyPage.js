// MyPage.js - 나의 정보, 내 반려견 정보, 내가 올린 게시물 모음
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// 컴포넌츠
import TopBar from "../components/TopBar";
import DogStaList from "../components/MyPage/DogStaList";
import InfoList from "../components/MyPage/InfoList";
import WalkList from "../components/MyPage/WalkList";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as signActions } from "../redux/modules/sign";
import { actionCreators as chatAction } from "../redux/modules/chat";

// 이미지  + 아이콘
import { FiLogOut } from "react-icons/fi";
import { FaDog } from "react-icons/fa";
import ContactsIcon from "@mui/icons-material/Contacts";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const MyPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const [status, setStatus] = useState(); // 개스타그램, 강아지 정보, 산책목록 컴포넌츠를 중 택1
  const [focus, setFocus] = useState(); // 선택한 컴포넌츠 빨간색

  const userInfo = useSelector((state) => state.user.list); // 현재 로그인된 유저 정보
  const userId = localStorage.getItem("userId"); // 현재 로그인된 유저의 ID
  const currentPageUserId = props.match.params.userId; // 현재  마이페이지 유저의 ID

  const rawRoomId = [userId, currentPageUserId].sort();
  const roomId = rawRoomId[0] + "-" + rawRoomId[1];

  // 로그아웃
  const logout = () => {
    dispatch(signActions.logoutMD());
  };

  const createRoom = () => {
    const chatInfo = {
      senderId: userId,
      opposite: currentPageUserId,
    };
  };

  useEffect(() => {
    dispatch(userActions.getMypageMD(currentPageUserId)); // 현재 마이페이지 유저 ID로 정보 불러오기
    setStatus("sta");
    setFocus("sta");
  }, [currentPageUserId]);

  if (!userInfo) {
    history.push("/login");
  }

  return (
    <>
      {userInfo ? (
        <Wrap>
          {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 버튼 */}
          <TopBar>{userInfo.userNickname}님의 페이지</TopBar>

          {/* 현재 페이지의 유저 정보 */}
          <UserInfo>
            {/* 유저 사진 + 유저 편집 버튼 */}
            <UserInfoLeft>
              <UserImg src={userInfo.userImage} />

              {/* 현재 페이지의 userId 와 현재 로그인된 userId가 같을때에는 편집 버튼을 보여주고 아니면 안 보여준다. */}
              {currentPageUserId === userId && (
                <Edit
                  onClick={() => {
                    history.push("/userProfile");
                  }}
                >
                  <ModeEditIcon style={{ width: "15px" }} />
                </Edit>
              )}
            </UserInfoLeft>

            {/* 유저 닉네임 + 주소 + 로그아웃버튼 */}
            <UserRight>
              <div>
                <span style={{ fontWeight: "600" }}>
                  {userInfo.userNickname}
                </span>
                <span style={{ color: "#5F5F5F", fontSize: "14px" }}>
                  {userInfo.userLocation}
                </span>
                <span style={{ color: "#5F5F5F", fontSize: "14px" }}>
                  {userInfo.userGender}/{userInfo.userAge}
                </span>
              </div>

              {currentPageUserId === userId ? (
                <LogOut onClick={logout}>
                  <FiLogOut size="16" />
                  <span>로그아웃</span>
                </LogOut>
              ) : (
                <Message
                  onClick={() => {
                    history.push(`/chatwrite/${currentPageUserId}`);
                  }}
                >
                  <MailOutlineIcon />
                  <div>
                    {userInfo.userNickname}님에게
                    <br />
                    쪽지 보내기
                  </div>
                </Message>
              )}
            </UserRight>
          </UserInfo>

          {/* 별점/리뷰 */}
          {/* <Review>
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
	 </Review> */}

          {/* 다른 페이지로 이동 버튼들 */}
          <Buttons>
            {/* DogStaList 버튼 - 현재 페이지 유저가 쓴 개스타그램 게시물 */}
            <div
              onClick={() => {
                setStatus("sta");
                setFocus("sta");
              }}
              style={{ color: focus === "sta" ? "#ff5656" : "#000" }}
            >
              <FaDog size="22" />
              <span>개스타그램</span>
            </div>

            {/* InfoList 버튼 - 현재 페이지 유저의 강아지 정보*/}
            <div
              onClick={() => {
                setStatus("dog");
                setFocus("dog");
              }}
              style={{ color: focus === "dog" ? "#ff5656" : "#000" }}
            >
              <ContactsIcon />
              <span>강아지 정보</span>
            </div>
            {/* WalkList 버튼 - 현재 페이지 유저가 쓴 산책 게시물*/}
            <div
              onClick={() => {
                setStatus("list");
                setFocus("list");
              }}
              style={{ color: focus === "list" ? "#ff5656" : "#000" }}
            >
              <ListAltIcon />
              <span>산책 목록</span>
            </div>
          </Buttons>

          {/* 개스타그램, 강아지 정보, 산책목록 카드들 */}
          <Cards>
            {/* DogStaList - 현재 페이지 유저가 쓴 개스타그램 게시물 */}
            {status === "sta" && <DogStaList userId={currentPageUserId} />}

            {/* InfoList - 현재 페이지 유저의 강아지 정보*/}
            {status === "dog" && (
              <InfoList
                post={userInfo}
                userId={userId}
                currentPageUserId={currentPageUserId}
              />
            )}

            {/* WalkList 현재 페이지 유저가 쓴 산책 게시물*/}
            {status === "list" && (
              <WalkList post={userInfo} userId={currentPageUserId} />
            )}
          </Cards>
        </Wrap>
      ) : (
        <div>로그인이 필요합니다</div>
      )}
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
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
`;
const UserRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    text-align: left;
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
  bottom: 3px;
  right: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 6px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.18);
  img {
    width: 22px;
    height: 22px;
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
  margin-right: 20px;
  color: #5f5f5f;
`;
const Message = styled.button`
  display: block;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #5f5f5f;
`;
// const Review = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;

//   height: 66px;
//   width: 100%;
//   margin-bottom: 22px;
//   border-top: 1px solid #c4c4c4;
//   border-bottom: 1px solid #c4c4c4;
// `;
// const ReviewLeft = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: left;
//   align-items: center;

//   div {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     margin-right: 10px;
//     color: #5f5f5f;
//   }

//   img {
//     width: 20px;
//     height: 18px;
//     margin-right: 2px;
//   }

//   p {
//     color: #5f5f5f;
//   }
// `;
// const ReviewRight = styled.div`
//   color: #5f5f5f;
// `;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 40px 24px;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;

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
    display: block;
    font-size: 14px;
    padding-top: 2px;
  }
`;

const Cards = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-top: 24px;
`;

export default MyPage;
