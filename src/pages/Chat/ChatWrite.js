// ChatWrite.js - 쪽지 시작 창
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// 컴포넌츠
import TopBar from "../../components/TopBar";

// 리덕스
import { actionCreators as chatAction } from "../../redux/modules/chat";

const ChatWrite = (props) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const receiverId = props.match.params.receiverId; // 쪽지 받는 사람 아이디

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  // 쪽지 보내기 액션 실행 버튼
  const sendChat = () => {
    dispatch(chatAction.sendMessageMD(receiverId, message));
  };

  return (
    <div>
      <TopBar>새 쪽지</TopBar>
      <Input>
        <textarea
          type="text"
          placeholder="메세지 보내기"
          onChange={messageChange}
        />
        <button onClick={sendChat}>보내기</button>
      </Input>
    </div>
  );
};

const Input = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 250px;
  margin: auto;
  padding: 20px;

  border: 2px solid black;
  border-radius: 30px;

  textarea {
    width: 280px;
    height: 200px;
    border: none;
  }

  button {
    width: 50px;
    height: 30px;
  }
`;

export default ChatWrite;
