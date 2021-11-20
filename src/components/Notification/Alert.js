import React, {useEffect,useState} from "react";
import styled from "styled-components";
import {io} from "socket.io-client";
const Alert = (props) => {
  
  let arr = localStorage.getItem("noti")
  useEffect(()=>{
      arr =localStorage.getItem("noti")
  },[arr])

  let notification = JSON.parse(arr)
  console.log(notification)
  // const [socket, setSocket] = useState(null)
  // const userId = localStorage.getItem("userId");
  // useEffect(() => {
  //   setSocket(io.connect(`http://13.209.70.209/notification`));
  // }, []);

  // useEffect(() => {
  //   socket?.emit("postUser", userId);
  //   console.log(userId)
  // }, [socket, userId]);
  // console.log(socket)
  // const socket =localStorage.getItem("socket")
  // console.log(socket)
  // useEffect(() => {
  //   socket?.on("getNotification", (data)=>{
  //    setNotification(((prev)=>[...prev,data]))
  //   });
    
  // }, [socket]);
  // console.log(socket)
  // console.log(notification)

  const displayNotification = ({ senderNickname, type }) => {
    let action;

    if (type === 1) {
      action=`${senderNickname}님이 회원님에게 쪽지를 보냈습니다!`
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <div>
      <Wrap>
        <Left>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
        </Left>
        <Right>
          {action}
          <span>1시간 전</span>
        </Right>
        
      </Wrap>
      
      </div>
    )
  };
  return (
    notification?(
      notification.map((n) => displayNotification(n))
    ):
    <div>
      알람이 없습니다
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  justify-content: center;
  align-items: center;

  margin-right: 3vw;
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

  margin-right: 10px;
  p {
    width: 80%;
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

export default Alert;
