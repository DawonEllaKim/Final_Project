import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

const Chat = ({ room }) => {
  const roomId = room.roomId;
  const opposite = room.opposite;
  const latestMessageTime = room.chat[0].createdAt;
  const oppositeImg = room.oppositeImg;

  return (
    <Wrap
      onClick={() => {
        history.push(`/chatwrite/${roomId}`);
      }}
    >
      <Left>
        <img src={oppositeImg} />
      </Left>
      <Right>
        <p>{opposite}님과의 채팅</p>
        <span>{latestMessageTime}</span>
      </Right>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin: 5px;
  border: 1px solid black;
  cursor: pointer;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  img {
    width: 48px;
    height: 48px;
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
  margin-right: 10px;
  p {
    width: 80%;
  }
  span {
    width: 30%;
    color: gray;
    text-align: right;
  }
`;

export default Chat;
