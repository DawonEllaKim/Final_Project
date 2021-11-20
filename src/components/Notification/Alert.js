import React, {useEffect,useState} from "react";
import styled from "styled-components";
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as notiActions } from "../../redux/modules/notification";
import {io} from "socket.io-client";
const Alert = ({noti}) => {
  const dispatch = useDispatch();
 
  const userId = localStorage.getItem("userId");

  const [socket, setSocket] = useState(null)
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    setSocket(io.connect(`http://13.209.70.209/notification/${userId}`));
  }, []);
  useEffect(() => {
    socket?.emit("postUser", userId);
    console.log(userId)
  }, []);
  useEffect(() => {
    socket?.on("getNotification", (data)=>{
     setNotification(((prev)=>[...prev,data]))

    });
  }, [socket]);
 console.log(notification)

  return (
        <div>
        <Wrap onClick={()=>{dispatch(notiActions.deleteNotiMD(noti.notificationId))}}>
          <Left>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
          </Left>
          <Right>
          {noti.senderNickname}님이 회원님에게 쪽지를 보냈습니다!
            <span>1시간 전</span>
          </Right>
          
        </Wrap>
        {notification.map((n)=> {
          return (
            <Wrap onClick={()=>{dispatch(notiActions.deleteNotiMD(n.notificationId))}}>
          <Left>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
          </Left>
          <Right>
          {n.senderNickname}님이 회원님에게 쪽지를 보냈습니다!
            <span>1시간 전</span>
          </Right>
          
        </Wrap>
          )
        })}
        </div>
        )
   
 
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor:pointer;
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
