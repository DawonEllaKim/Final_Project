// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { MdArrowBackIosNew } from "react-icons/md";
// import { GrNotification } from "react-icons/gr";
// // import { getCookie } from "../../shared/Cookie";

// import ChatList from "../components/ChatList";
// import Chat from "../components/Chat";

// import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as chatActions } from "../redux/modules/chat";

// import { history } from "../redux/configureStore";
// import io from "socket.io-client";

// // const socket = io.connect("http://localhost:3001", {
// //   auth:{token:`Bearer ${getCookie("user_login")}`}
// // });

// // 서버와 연결 시작
// const socket = io.connect("http://localhost:3001");

// const ChatPage = (props) => {
//   const dispatch = useDispatch();

//   const userId = localStorage.getItem("userId");
//   console.log(userId);

//   const chatList = useSelector((state) => state.user.user);
//   // const name = useSelector((state) => state.user.user);
//   // const room = useSelector((state) => state.user.user);
//   // console.log(name);
//   // console.log(room);
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const chat = useSelector((state) => state);

//   // const [socketIo,setSocketIo] = useState(null);
//   const [showChat, setShowChat] = useState(false);

//   // useEffect(()=>{
//   //   setSocketIo(socket);
//   // },[])
//   // console.log(socketIo);

//   // useEffect(() =>{
//   //   dispatch(chatActions.getUserMD());
//   //   dispatch(chatActions.getMsgMD());
//   // },[])

//   const joinRoom = () => {
//     if (name !== "" && room !== "") {
//       // room - back의 data
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   };

//   return (
//     <div>
//       {/* {!showChat ? ( */}
//       <Wrap>
//         {/* 뒤로가기 버튼 + 타이틀 */}
//         <TopWrap>
//           <MdArrowBackIosNew
//             style={{ width: "24px", height: "24px", cursor: "pointer" }}
//             onClick={() => {
//               history.goBack();
//             }}
//           />
//           <TopTitle>메시지 보관함</TopTitle>
//           <GrNotification style={{ width: "24px", height: "24px" }} />
//         </TopWrap>

//         <div>
//           <Header>Join</Header>
//           <Input
//             placeholder="name"
//             onChange={(e) => setName(e.target.value)}
//           ></Input>
//           <Input
//             placeholder="room"
//             onChange={(e) => setRoom(e.target.value)}
//           ></Input>
//           <Btn onClick={joinRoom}>JOIN</Btn>
//         </div>

//         <BottomWrap>
//           {chatList.map((list, index) => {
//             return (
//               <div onClick={joinRoom}>
//                 <ChatList list={list} key={index} />
//               </div>
//             );
//           })}
//         </BottomWrap>
//       </Wrap>
//       {/* ) : ( */}
//       <Chat socket={socket} name={name} room={room} />
//       {/* )} */}
//     </div>
//   );
// };

// const Wrap = styled.div`
//   width: 390px;
//   padding: 20px;
//   margin: 0 auto;
// `;
// const TopWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 390px;
//   margin-top: 20px;
// `;
// const TopTitle = styled.div`
//   font-weight: 700;
//   font-size: 24px;
// `;
// const BottomWrap = styled.div``;
// const Header = styled.div``;
// const Input = styled.input``;
// const Btn = styled.button``;

// export default ChatPage;
