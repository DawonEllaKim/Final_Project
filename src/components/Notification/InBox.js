// InBox.js - 받은 쪽지함
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// 리덕스
import { history } from "../../redux/configureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";

const InBox = ({ box }) => {
  const dispatch = useDispatch();

  const chatId = box.chatId; // 받은 쪽지의 고유 아이디
  const senderImage = box.senderImage; // 쪽지 보낸 사람의 프로필 사진
  const senderNickname = box.senderNickname; // 쪽지 보낸 사람의 닉네임
  const message = box.message; // 받은 쪽지의 내용
  const time = box.createdAt; // 쪽지 받은 시간

  const deleteBtn = () => {
    const receiverId = box.receiverId;
    const senderId = Number(box.senderId);
    const chatId = box.chatId;
    dispatch(chatActions.deleteInMessageMD(receiverId, senderId, chatId));
  };
  useEffect(() => {
    dispatch(chatActions.inBoxMD()); // 내가 받은 모든 쪽지 불러오기
  }, []);

  return (
    <Wrap>
      <Left
        onClick={() => {
          history.push(`/chatdetail/${chatId}`);
        }}
      >
        <img src={senderImage} />
        <span>{senderNickname}</span>
      </Left>
      <Right>
        <p>{message}</p>
        <span>{time}</span>
        <button onClick={deleteBtn}>삭제</button>
      </Right>
   
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 12vh;
  margin: 0.5rem;
  box-shadow: 0 0.03em 0.03em rgba(0, 0, 0, 0.25);
  border: 0.01rem solid lightGray;
  border-radius:5vw;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  margin-right: 10px;
  img {
    width: 13vw;
    height: 13vw;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin-right:10vw;
  margin-right: 10px;
  p {
    width: 80%;
    padding-right:10vw;
  }
  span {
    padding-bottom:9vh;
    padding-right:2vw;
    width: 30%;
    color: gray;
    text-align: right;
    font-size:2vw;
  }
`;

export default InBox;
