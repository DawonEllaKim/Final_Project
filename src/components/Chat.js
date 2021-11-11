import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, name, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // socket 서버에 보낼 데이터
      const messageData = {
        name,
        room,
        currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // from back
      await socket.emit("send_message", messageData);
      // 본인 메세지 창에 보낸 메세지 띄우기
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // socket 서버가 바뀔때마다 동작
  // 상대방의 메세지 창에 메세지 띄우기
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      // 기존 메세지(list)에 새로운 메세지(data)를 추가해서 리턴
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Wrap>
      <Header>
        <Title>메세지 보내기</Title>
      </Header>
      <Body>
        <ScrollToBottom
          style={{
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {messageList.map((messageContent) => {
            return (
              <MessageWrap id={name === messageContent.name ? "you" : "other"}>
                <div>{messageContent.currentMessage}</div>
                <div>
                  {messageContent.time}, {messageContent.name}
                </div>
              </MessageWrap>
            );
          })}
        </ScrollToBottom>
      </Body>
      <Footer>
        <Input
          value={currentMessage}
          placeholder="메세지를 입력하세요"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Send onClick={sendMessage}>전송</Send>
      </Footer>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 390px;
  padding: 20px;
  margin: 0 auto;
`;

const Header = styled.div``;
const Title = styled.p``;
const Body = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  height: 200px;
`;
const MessageWrap = styled.div``;
const Footer = styled.div``;
const Input = styled.input``;
const Send = styled.button``;

export default Chat;
