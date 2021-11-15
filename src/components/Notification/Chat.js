import React from "react";
import styled from "styled-components";

const Chat = () => {
  return (
    <div>
      <Wrap>
        <Left>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
        </Left>
        <Right>
          <p>수수님과의 채팅</p>
          <span>12시간 전</span>
        </Right>
      </Wrap>
      <Wrap>
        <Left>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
        </Left>
        <Right>
          <p>다원님과의 채팅</p>
          <span>6시간 전</span>
        </Right>
      </Wrap>
      <Wrap>
        <Left>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
        </Left>
        <Right>
          <p>선희님과의 채팅</p>
          <span>6시간 전</span>
        </Right>
      </Wrap>
    </div>
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
