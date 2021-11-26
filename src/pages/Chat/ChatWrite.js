// ChatWrite.js - 쪽지 시작 창
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { io } from "socket.io-client";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import ChatSuccessModal from "../../components/Modal/ChatSuccessModal";

// 리덕스
import { actionCreators as chatAction } from "../../redux/modules/chat";
import { actionCreators as userActions } from "../../redux/modules/user";

const ChatWrite = (props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const receiverId = props.match.params.receiverId; // 쪽지 받는 사람 아이디

  const [modal, setModal] = useState("");

  const userInfo = useSelector((state) => state.user.list);
  useEffect(() => {
    dispatch(userActions.getMypageMD(receiverId));

  }, []);

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  // 쪽지 보내기 액션 실행 버튼
  const sendChat = () => {
    dispatch(chatAction.sendMessageMD(receiverId, message, 1));
  };
  // console.log(modal);

  return (
    <Wrap>
     
      <TopBar>쪽지하기</TopBar>
      <Info>
        <ImageWrap>
          <img src={userInfo.userImage} />
        </ImageWrap>
        {userInfo.userNickname}
      </Info>
      <Input>
        <textarea
          type="text"
          placeholder="메세지 보내기"
          onChange={messageChange}
        />
      </Input>
      <SendBtn onClick={sendChat}>
        <button>쪽지하기</button>
      </SendBtn>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0 5%;
`;
const Info = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;
const ImageWrap = styled.div`
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
  }
  margin-right: 10px;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 25em;
  margin: auto;
  padding: 20px;

  border: 1px solid lightGray;

  border-radius: 30px;

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 50px;
    height: 30px;
  }
`;
const SendBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  margin: 30px auto 0 auto;

  button {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    width: 40%;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 1px;
    cursor: pointer;
    margin: 0 10px;
  }
`;

export default ChatWrite;
