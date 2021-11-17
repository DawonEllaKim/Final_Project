import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// 컴포넌츠
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import DogStaList from "../components/MyPage/DogStaList";
import InfoList from "../components/MyPage/InfoList";
import WalkList from "../components/MyPage/WalkList";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as signActions } from "../redux/modules/sign";
import { actionCreators as chatAction } from "../redux/modules/chat";

// 이미지  + 아이콘
import { FiLogOut } from "react-icons/fi";
import redHeart from "../image/redHeart.png";
import grayHeart from "../image/grayHeart.png";
import dog from "../image/dog.png";
import myPage from "../image/myPage.png";
import chat from "../image/chat.png";
import edit from "../image/edit.png";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [status, setStatus] = useState(); // 개스타그램, 강아지 정보, 산책목록 컴포넌츠를 중 택1

  const userInfo = useSelector((state) => state.user.list); // 현재 로그인된 유저 정보
  const userId = localStorage.getItem("userId"); // 현재 로그인된 유저의 ID
  const currentPageUserId = props.match.params.userId; // 현재  마이페이지 유저의 ID
  console.log(userInfo);

  const rawRoomId = [userId, currentPageUserId].sort();
  const roomId = rawRoomId[0] + "-" + rawRoomId[1];

  // 로그아웃
  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(signActions.logOut());
      history.replace("/");
    } else {
      console.log("로그인 유지");
    }
  };

  const createRoom = () => {
    const chatInfo = {
      senderId: userId,
      opposite: currentPageUserId,
    };

    console.log("새로운 방을 생성합니다.");
    // dispatch(chatAction.createRoomMD(chatInfo));
    console.log("룸 아이디", roomId, "챗 인포", chatInfo);
  };

  useEffect(() => {
    dispatch(userActions.getMypageMD(currentPageUserId)); // 현재 마이페이지 유저 ID로 정보 불러오기
    setStatus("sta");
  }, []);

  return (
    <Wrap>
      {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 버튼 */}
      <TopBar>{userInfo.userNickname}님의 페이지</TopBar>

      {/* 현재 페이지의 유저 정보 */}
      <UserInfo>
        {/* 유저 사진 + 유저 편집 버튼 */}
        <UserInfoLeft>
          <UserImg src={userInfo.userImage} />

          {/* 현재 페이지의 userId 와 현재 로그인된 userId가 같을때에는 편집 보튼을 보여주고 아니면 안 보여준다. */}
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

        {/* 유저 닉네임 + 주소 + 로그아웃버튼 */}
        <UserRight>
          <div>
            <span style={{ fontWeight: "400" }}>{userInfo.userNickname}</span>
            <span style={{ color: "#5F5F5F" }}>{userInfo.userLocation}</span>
          </div>

          {currentPageUserId === userId ? (
            <LogOut onClick={logout}>
              <FiLogOut size="16" />
              <span>로그아웃</span>
            </LogOut>
          ) : (
            <button
              onClick={() => {
                history.push(`/chatwrite/${currentPageUserId}`);
              }}
            >
              {userInfo.userNickname}님에게 쪽지 보내기
            </button>
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
        {/* DogStaList 버튼 - 현재 페이지 유저가 쓴 개스타그램 게시물 */}
        <div
          onClick={() => {
            setStatus("sta");
          }}
        >
          <img src={dog} style={{ width: "24px", height: "21px" }} />
          <span>개스타그램</span>
        </div>

        {/* InfoList 버튼 - 현재 페이지 유저의 강아지 정보*/}
        <div
          onClick={() => {
            setStatus("dog");
          }}
        >
          <img src={chat} style={{ width: "20px", height: "16px" }} />
          <span>강아지 정보</span>
        </div>
        {/* WalkList 버튼 - 현재 페이지 유저가 쓴 산책 게시물*/}
        <div
          onClick={() => {
            setStatus("list");
          }}
        >
          <img src={myPage} style={{ width: "16px", height: "20px" }} />
          <span>산책 목록</span>
        </div>
      </Buttons>

      {/* 개스타그램, 강아지 정보, 산책목록 카드들 */}
      <Cards>
        {/* DogStaList - 현재 페이지 유저가 쓴 개스타그램 게시물 */}
        {status === "sta" && <DogStaList userId={currentPageUserId} />}

        {/* InfoList - 현재 페이지 유저의 강아지 정보*/}
        {status === "dog" && (
          <InfoList post={userInfo} userId={currentPageUserId} />
        )}

        {/* WalkList 현재 페이지 유저가 쓴 산책 게시물*/}
        {status === "list" && (
          <WalkList post={userInfo} userId={currentPageUserId} />
        )}
      </Cards>

      {/* 고정 버튼 */}
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
