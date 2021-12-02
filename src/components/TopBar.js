import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

// 리덕스
import { actionCreators as notiActions } from "../redux/modules/notification";

// 아이콘
import { MdArrowBackIos } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";

const TopBar = (props) => {
  const { text, children, padding, only_left, only_right, home , dogSign } = props;
  const history = useHistory();
  const styles = { padding };
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);

  // useEffect(() => {
  //   setSocket(io.connect(`https://www.walkadog.shop/notification/${userId}`));
  // }, []);

  // useEffect(() => {
  //   socket?.emit("postUser", userId);
  // }, []);

  // useEffect(() => {
  //   socket?.on("getNotification", (data) => {
  //     setNotification((prev) => [...prev, data]);
  //   });
  // }, [socket]);

  const getNoti = useSelector((state) => state.notification.noti);
  let arr = localStorage.getItem("noti");
  let noti = JSON.parse(arr);

  useEffect(() => {
    localStorage.setItem("noti", JSON.stringify(notification));
    arr = localStorage.getItem("noti");
  }, [notification, noti]);
  // console.log(getNoti);
  useEffect(() => {
    dispatch(notiActions.getNotiMD());
  }, []);
  // console.log(noti)

  if (only_left) {
    return (
      <Wrap>
        <Left {...styles}>
          <BtnLeft>
            <MdArrowBackIos
              onClick={() => {
                history.goBack();
              }}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </BtnLeft>
          {text ? text : children}
        </Left>
      </Wrap>
    );
  } else if (only_right) {
    return (
      <Wrap>
        <Right {...styles}>
          {text ? text : children}
          <BtnRight>
            <IoNotificationsOutline
              onClick={() => history.push("/notification")}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
            <Edit>{getNoti == 0 ? 0 : getNoti.length}</Edit>
          </BtnRight>
        </Right>
      </Wrap>
    );
  } else if (home) {
    return (
      <Wrap>
        <Both {...styles}>
          <BtnLeft>
            <MdArrowBackIos
              onClick={() => {
                history.push("/");
              }}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </BtnLeft>
          {text ? text : children}
          <BtnRight>
            {userId && (
              <>
                <IoNotificationsOutline
                  onClick={() => history.push("/notification")}
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
                <Edit>{getNoti == 0 ? 0 : getNoti.length}</Edit>
              </>
            )}
          </BtnRight>
        </Both>
      </Wrap>
    );
  }
  else if (dogSign) {
    return (
      <Wrap>
        <Both {...styles}>
          <BtnLeft>
            <MdArrowBackIos
              onClick={() => {
                history.push("/");
              }}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </BtnLeft>
          {text ? text : children}
       
            <RedButton onClick={()=>history.push("/")}>
              건너뛰기
            </RedButton>
         
        </Both>
      </Wrap>
    );
  }
  return (
    <Wrap>
      <Both {...styles}>
        <BtnLeft>
          <MdArrowBackIos
            onClick={() => {
              history.goBack();
            }}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </BtnLeft>
        {text ? text : children}
        <BtnRight>
          {userId && (
            <>
              <IoNotificationsOutline
                onClick={() => history.push("/notification")}
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              <Edit>{getNoti == 0 ? 0 : getNoti.length}</Edit>
            </>
          )}
        </BtnRight>
      </Both>
    </Wrap>
  );
};
TopBar.defaultProps = {
  text: false,
  children: null,
  padding: false,
  only_left: false,
  only_right: false,
  home: false,
  dogSign: false,
};
const RedButton = styled.div
`
color: #ff5656;
font-size:14px;
height:25px;
background-color:#fff;
display:flex;
justify-content:center;
align-items:center;
padding-bottom:5px;
position:absolute;
top:15px;
right:0px;
border-bottom: 2px solid #ff5656;
cursor:pointer;
`
const Wrap = styled.div`
  margin-bottom: 26px;
  background-color: #fff;
  padding-top: 14px;
`;
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
  /* margin: 36px 0; */
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
  right: 8px;
  border: none;
  background-color: transparent;
  width: 52px;
  height: 52px;
  cursor: pointer;
`;

export default TopBar;
