// ChatDetail.js - 쪽지 상세창
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// 컴포넌츠
import TopBar from "../../components/TopBar";

// 리덕스
import { actionCreators as chatAction } from "../../redux/modules/chat";

const ChatDetail = (props) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const list = useSelector((state) => state.chat.inBoxList[0]); // 이 쪽지의 정보
  const myId = localStorage.getItem("userId"); // 나의 유저 아이디
  const chatId = props.match.params.chatId; // 이 쪽지의 고유 아이디
  const receiverId = list.senderId; // 쪽지 받을 상대의 아이디
  const receiverNickname = list.senderNickname; // 쪽지 받을 상대의 닉네임
  const receivedMessage = list.message; // 받은 쪽지 내용
  const receivedTime = list.createdAt; // 쪽지 받은 시간

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  // 쪽지 보내기 액션 실행 버튼
  const sendChat = () => {
    dispatch(chatAction.sendMessageMD(receiverId, message));
  };

  // 해당 쪽지에 관한 정보만 불러오기
  useEffect(() => {
    dispatch(chatAction.getDetailMD(chatId));
  }, []);

  return (
    <div>
      <TopBar>답장하기</TopBar>
      <Wrap>
        <Message>
          받은 쪽지
          <p>{receiverNickname}</p>
          <p>{receivedMessage}</p>
          <p>{receivedTime}</p>
        </Message>

        {/* 남이 보낸 쪽지의 상세페이지 들어갈때만 답장 할 수 있는 창이 열린다 */}
        {receiverId !== myId && (
          <Input>
            <textarea
              type="text"
              placeholder="쪽지 내용을 입력해주세요"
              onChange={messageChange}
            />
            <button onClick={sendChat}>보내기</button>
          </Input>
        )}
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  display: block;

  width:80%;
  margin: 0 auto;
`;
const Message = styled.div`

  height: 250px;
  width:100%;
  border: 2px solid black;
  border-radius: 30px;


  margin : 20px 0px;
  padding: 20px;
`;
const Input = styled.div`
  display: flex;

  width:100%;

  height: 250px;

  padding: 20px;

  border: 2px solid black;
  border-radius: 30px;

  textarea {
    width:100%;
    height: 200px;
    border: none;
  }

  button {
    width: 50px;
    height: 30px;
  }
`;

export default ChatDetail;
