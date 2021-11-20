import React,{useEffect,useState} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import backward from "../image/backward.png";
import notification1 from "../image/Notification.png";

import {io} from "socket.io-client";


const TopBar = (props) => {
  const { text, children, padding, only_left, only_right } = props;

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
          <BtnLeft
            onClick={() => {
              history.goBack();
            }}
          >
            <img
              src={backward}
              style={{
                width: "10px",
                height: "18px",
              }}
            />
          </BtnLeft>
          {text ? text : children}
        </Left>
      </div>
    );
  } else if (only_right) {
    return (
      <div>
        <Right {...styles}>
          {text ? text : children}
          <BtnRight onClick={() => history.push("/notification")}>
            <img
              src={notification1}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
             <Edit>
            {noti.length}
          </Edit>
          </BtnRight>
        </Right>
      </div>
    );
  }
  return (
    <div>
      <Both {...styles}>
        <BtnLeft
          onClick={() => {
            history.goBack();
          }}
        >
          <img
            src={backward}
            style={{
              width: "10px",
              height: "18px",
            }}
          />
        </BtnLeft>
        {text ? text : children}
        <BtnRight onClick={() => history.push("/notification")}>
          <img

            src={notification1}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
          <Edit>
            {noti.length}
          </Edit>
        </BtnRight>

      </Both>
    </div>
  );
};
TopBar.defaultProps = {
  text: false,
  children: null,
  padding: false,
  only_left: false,
  only_right: false,
};
const Edit = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;

  width: 20px;
  height: 20px;
  padding: 6px;

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
  margin-bottom: 36px;
  text-align: center;
  padding: ${(props) => props.padding};
`;
const Right = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 36px;
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

const BtnLeft = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  background-color: transparent;
  width: 52px;
  height: 52px;
  cursor: pointer;
`;
const BtnRight = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  width: 52px;
  height: 52px;
  cursor: pointer;
`;

export default TopBar;
