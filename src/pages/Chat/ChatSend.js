import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//이미지
import RedMessage from "../../image/RedMessage.png";
// 컴포넌츠
import TopBar from "../../components/TopBar";

// 리덕스
import { actionCreators as chatAction } from "../../redux/modules/chat";
import { useHistory } from "react-router";
const ChatSend = (props) => {
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.chat.inBoxList[0]); // 이 쪽지의 정보
  const myId = localStorage.getItem("userId"); // 나의 유저 아이디
  const chatId = props.match.params.chatId; // 이 쪽지의 고유 아이디
  // const receiverId = list.senderId; // 쪽지 받을 상대의 아이디
  // const receiverNickname = list.senderNickname; // 쪽지 받을 상대의 닉네임
  // const receivedMessage = list.message; // 받은 쪽지 내용
  // const receivedTime = list.createdAt; // 쪽지 받은 시간

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  // 쪽지 보내기 액션 실행 버튼
  const sendChat = () => {
    dispatch(chatAction.sendMessageMD(list.senderId, message, 1));
  };

  // 해당 쪽지에 관한 정보만 불러오기
  useEffect(() => {
    dispatch(chatAction.getDetailMD(chatId));
  }, []);

  return (
    <div>
      {list ? (
        <div>
          <TopBar>보낸 쪽지</TopBar>
          <Info onClick={() => history.push(`/mypage/${list.senderId}`)}>
            <ImageWrap>
              <img src={list.senderImage} />
              {list.senderNickname}
            </ImageWrap>
            <div>{list.AGOTIME}</div>
          </Info>
          <Wrap>
            <Message>
              <p>{list.message}</p>
            </Message>
          </Wrap>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};
const SendBtn = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  width: 30%;
  height: 2.5em;
  align-items: center;
  border-radius: 15px;
  margin: 30px auto;
`;
const Info = styled.div`
  margin: 0 auto;
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const SendInfo = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  margin-right: 10px;
`;
const Wrap = styled.div`
  display: block;

  width: 80%;
  margin: 0 auto;
`;
const Message = styled.div`
  height: 30vh;
  width: 100%;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius: 30px;

  margin: 20px 0px;
  padding: 20px;
`;
const Input = styled.div`
  display: flex;

  width: 100%;

  height: 30vh;

  padding: 20px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius: 30px;
  margin-top: 20px;
  textarea {
    width: 100%;
    height: 25vh;
    border: none;
    &:focus {
      outline: none;
    }
    font-size: 16px;
  }
  cursor: pointer;
  button {
    width: 50px;
    height: 30px;
  }
`;

export default ChatSend;
