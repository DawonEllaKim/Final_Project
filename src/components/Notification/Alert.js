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
            <img src={noti.userImage} />
          
            <span>{noti.senderNickname}</span>
          </Left>
          <Right>
          <Message>{noti.senderNickname}님이 회원님에게 쪽지를 보냈습니다!</Message>
           
           <Info>
            <Time>1시간전</Time>
            </Info>
          </Right>
  
        </Wrap>
        {notification.map((n)=> {
          return (
            <Wrap onClick={()=>{dispatch(notiActions.deleteNotiMD(n.notificationId))}}>
          <Left>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" />
          </Left>
          <Right>
            <Message>
          {n.senderNickname}님이 회원님에게 쪽지를 보냈습니다!
          </Message>
            <span>1시간 전</span>
          </Right>
          
        </Wrap>
          )
        })}
        </div>
        )
   
 
};

const Message = styled.div
`
display:flex;
width:100%;
height:80%;
justify-content:flex-start;
align-items:center;
padding-top:10px;
`
const Info = styled.div
`
display:flex;
width:100%;
justify-content:flex-end;
align-items:center;
padding-right:1rem;
`
const Time = styled.div
`
padding-right:10px;
padding-bottom:3px;
`
const DeleteBtn = styled.div
`
img{
 
  width:15px;
  height:15px;
}
`
const Wrap = styled.div`
margin: 0.5rem;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
  cursor:pointer;
  height: 6em;

  box-shadow: 0 0.03em 0.03em rgba(0, 0, 0, 0.25);
  border: 0.01rem solid lightGray;
  border-radius:15px;
  position:relative;
`;

const Left = styled.div`
 display:block;

  padding-left:10px;
  padding-top:5px;

  height:100%;
  img {
    display:flex;
    justify-content: center;
    
    width: 4em;
    height: 4em;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    display:flex;
    justify-content: center;
    
    margin-bottom:5px;
  }
  button {
    display:flex;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;

  height:100%;
  justify-content: center;
  align-items: center;

  width:100%;
  margin-left: 10px;
 
 
`;

export default Alert;
