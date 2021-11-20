import React,{useEffect,useState} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import Button from "../elements/Button";
import backward from "../image/backward.png";
import notification1 from "../image/Notification.png";

import {io} from "socket.io-client";


const TopBar = (props) => {
  const { text, children, padding, only_left } = props;

  const styles = { padding };

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
  let arr = localStorage.getItem("noti")
  let noti= JSON.parse(arr)
  useEffect(()=>{  
    localStorage.setItem("noti",JSON.stringify(notification))
    arr= localStorage.getItem("noti")
  },[notification,noti])

  if (only_left) {
    return (
      <div>
        <Left {...styles}>
          <Button
            _onClick={() => {
              history.goBack();
            }}
            position="absolute"
            top="0"
            left="0"
          >
            <img src={backward} style={{ width: "10px", height: "18px" }} />
          </Button>
          {text ? text : children}
        </Left>
      </div>
    );
  }
  return (
    <div>
      <Both {...styles}>
        <Button
          _onClick={() => {
            history.goBack();
          }}
          position="absolute"
          top="0"
          left="0"
        >
          <img src={backward} style={{ width: "10px", height: "18px" }} />
        </Button>
        {text ? text : children}
        <Button position="absolute" top="0" right="0">
          <img
            src={notification1}
            style={{ width: "24px", height: "24px" }}
            onClick={() => history.push("/notification")}
          />
          <Edit>
            {noti.length}
          </Edit>
        </Button>
      </Both>
    </div>
  );
};
TopBar.defaultProps = {
  text: false,
  children: null,
  padding: false,
  only_left: false,
};
const Edit = styled.div`
  position: absolute;
  top: -5px;
  right: -10px;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;

  width: 20px;
  height: 20px;
  padding: 6px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: red;


`;
const Left = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: 500;
  margin: 36px 0;
  text-align: center;
  padding: ${(props) => props.padding};
`;
const Both = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: 500;
  margin: 36px 0;
  text-align: center;
  padding: ${(props) => props.padding};
`;

export default TopBar;
