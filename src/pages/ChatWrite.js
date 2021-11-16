import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import styled from "styled-components";
import { actionCreators as chatAction } from "../redux/modules/chat";

const ChatWrite = (props) => {
  const dispatch = useDispatch();

  const [text, setText] = useState();

  const roomId = props.match.params.roomId;
  const opposite = props.match.params.opposite;
  const senderId = localStorage.getItem("userId");

  const textChange = (e) => {
    setText(e.target.value);
  };
  const oneChat = useSelector((state) => state.chat.oneList);

  const sendChat = () => {
    const chatInfo = {
      senderId: senderId,
      text: text,
    };
    dispatch(chatAction.sendMessageMD(chatInfo));
  };

  useEffect(() => {
    dispatch(chatAction.getOneChatMD());
  }, []);

  return (
    <div>
      <TopBar>{opposite}님과의 채팅</TopBar>
      {oneChat.map((text, index) => {
        return (
          <div text={text} key={index}>
            {text.senderId === senderId ? (
              <MyChat>{text.text}</MyChat>
            ) : (
              <OtherChat>
                <span>{text.senderId}</span>
                <div>{text.text}</div>
              </OtherChat>
            )}
          </div>
        );
      })}
      <Input>
        <input type="text" placeholder="메세지 보내기" onChange={textChange} />
        <button onClick={sendChat}>보내기</button>
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
const OtherChat = styled.div`
  /* width: 100%; */
  padding: 10px;
  background-color: skyblue;

  border-top-right-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  text-align: left;
  /* margin-left: 100px; */
  margin: 12px 0 12px 0;

  span {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid black;
  }
`;
const MyChat = styled.div`
  /* width: 100%; */
  padding: 10px;
  background-color: pink;

  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;

  text-align: right;
  /* margin-left: 100px; */
  margin: 12px 0 12px 0;
`;

export default ChatWrite;
