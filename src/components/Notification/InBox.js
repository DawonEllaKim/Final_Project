import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

const InBox = ({ box }) => {
  const chatId = box.chatId; // 받은 쪽지의 고유 아이디
  const senderImage = box.senderImage; // 쪽지 보낸 사람의 프로필 사진
  const senderNickname = box.senderNickname; // 쪽지 보낸 사람의 닉네임
  const message = box.message; // 받은 쪽지의 내용
  const time = box.createdAt; // 쪽지 받은 시간

  return (
    <Wrap
      onClick={() => {
        history.push(`/chatdetail/${chatId}`);
      }}
    >
      <Left>
        <img src={senderImage} />
        <span>{senderNickname}</span>
      </Left>
      <Right>
        <p>{message}</p>
        <span>{time}</span>
      </Right>
    </Wrap>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  height: 100px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    font-size: 12px;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  p {
    width: 100%;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    margin-bottom: 5px;
  }
  span {
    width: 100%;
    color: gray;
    text-align: right;
  }
`;

export default InBox;
