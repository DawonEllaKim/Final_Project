// import React, { useState } from "react";
// import styled from "styled-components";

// import { history } from "../redux/configureStore";
// import io from "socket.io-client";

// import Chat from "./Chat";

// const socket = io.connect("http://localhost:3001");

// const Join = () => {
//   const [name, setName] = useState("");
//   const [room, setRoom] = useState("");
//   const [showChat, setShowChat] = useState(false);

//   const joinRoom = () => {
//     if (name !== "" && room !== "") {
//       // room - back의 data
//       socket.emit("join_room", room);
//       setShowChat(true);
//     }
//   };

//   return (
//     <>
//       {!showChat ? (
//         <Wrap>
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
//         </Wrap>
//       ) : (
//         <Chat socket={socket} name={name} room={room} />
//       )}
//     </>
//   );
// };

// const Wrap = styled.div``;
// const Header = styled.div``;
// const Input = styled.input``;
// const Btn = styled.button``;
// export default Join;
