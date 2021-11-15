import React from "react";
import TopBar from "../components/TopBar";
import styled from "styled-components";

const ChatWrite = () => {
  return (
    <div>
      <TopBar>수수님과의 채팅</TopBar>
      <div>dd</div>
      <Input>
        <input type="text" placeholder="메세지 보내기" />
        <button>보내기</button>
      </Input>
    </div>
  );
};

const Input = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 40px;
  margin: auto;

  border: 2px solid black;
  border-radius: 30px;

  input {
    width: 200px;
    height: 35px;
    border: none;
  }

  button {
    width: 50px;
    height: 30px;
  }
`;

export default ChatWrite;
