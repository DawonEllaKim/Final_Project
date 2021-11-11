import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
// import { getCookie } from "../../shared/Cookie";

import ChatList from "../components/ChatList";
import Chat from "../components/Chat";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";

import { history } from "../redux/configureStore";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

// const socket = io.connect("http://localhost:3001", {
//   auth:{token:`Bearer ${getCookie("user_login")}`}
// });

// 서버와 연결 시작
const socket = io.connect("http://localhost:3001");

const ChatPage = (props) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");
  console.log(userId);
  const sender = props.userId;
  const receiver = props.currentPageUserId;
  const chatList = useSelector((state) => state.user.user);
  // const name = useSelector((state) => state.user.user);
  // const room = useSelector((state) => state.user.user);
  // console.log(name);
  // console.log(room);
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  const chat = useSelector((state) => state);
  const name = sender;
  const roomName = sender + receiver;
  console.log(roomName);

  // const [socketIo,setSocketIo] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // useEffect(()=>{
  //   setSocketIo(socket);
  // },[])
  // console.log(socketIo);

  // useEffect(() =>{
  //   dispatch(chatActions.getUserMD());
  //   dispatch(chatActions.getMsgMD());
  // },[])

  const joinRoom = () => {
    if (name !== "" && roomName !== "") {
      // room - back의 data
      socket.emit("join_room", roomName);
      setShowChat(true);
    }
  };

  // chat
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // socket 서버에 보낼 데이터
      const messageData = {
        name,
        roomName,
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
    <div>
      {/* {!showChat ? ( */}
      <Wrap>
        {/* 뒤로가기 버튼 + 타이틀 */}
        <TopWrap>
          <MdArrowBackIosNew
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={() => {
              history.goBack();
            }}
          />
          <TopTitle>
            {sender}님이 {receiver}님에게 보내는 메시지
          </TopTitle>
        </TopWrap>

        <div>
          <input type="text" />
          <Btn onClick={joinRoom}>JOIN</Btn>
        </div>

        {/* <BottomWrap>
          {chatList.map((list, index) => {
            return (
              <div onClick={joinRoom}>
                <ChatList list={list} key={index} />
              </div>
            );
          })}
        </BottomWrap> */}
      </Wrap>
      {/* ) : ( */}
      {/* <Chat socket={socket} name={name} room={roomName} /> */}
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
          // onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Send onClick={sendMessage}>전송</Send>
      </Footer>
      {/* )} */}
    </div>
  );
};

const Wrap = styled.div`
  width: 390px;
  padding: 20px;
  margin: 0 auto;
`;
const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  margin-top: 20px;
`;
const TopTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
`;
const BottomWrap = styled.div``;
const Header = styled.div``;
const Input = styled.input``;
const Btn = styled.button``;

const Title = styled.p``;
const Body = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  height: 200px;
`;
const MessageWrap = styled.div``;
const Footer = styled.div``;

const Send = styled.button``;

export default ChatPage;
