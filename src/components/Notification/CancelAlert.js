import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as notiActions } from "../../redux/modules/notification";
import { io } from "socket.io-client";

// 이미지
import trash from "../../image/tra.png";

const CancelAlert = ({ noti }) => {
  const dispatch = useDispatch();
  console.log(noti);
  const userId = localStorage.getItem("userId");

  // const [socket, setSocket] = useState(null);
  // const [notification, setNotification] = useState([]);
  // useEffect(() => {
  //   setSocket(io.connect(`http://3.35.235.62/notification/${userId}`));
  // }, []);
  // useEffect(() => {
  //   socket?.emit("postUser", userId);
  // }, []);
  // useEffect(() => {
  //   socket?.on("getNotification", (data) => {
  //     setNotification((prev) => [...prev, data]);
  //   });
  // }, [socket]);
  const username = localStorage.getItem("userNickname");
  return (
    <div>
      <Wrap
     
      >
        <Top>
          <Left>
            <img src={noti.senderImage} />
          </Left>
          <Right>
            <Message>{noti.senderNickname}님이 회원님의 산책요청을 거절했습니다!</Message>
          </Right>
        </Top>

        <Bottom>
          <Time>{noti.AGOTIME}</Time>
            <DeleteBtn
              onClick={() => {
                dispatch(notiActions.deleteNotiMD(noti.notificationId));
              }}
            >
              <img src={trash} />
            </DeleteBtn>
        </Bottom>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  padding: 4px 0;
  margin: 0.5rem;
  cursor: pointer;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius: 15px;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const Left = styled.div`
  img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Right = styled.div`
  width: 80%;
`;
const Message = styled.div`
  max-height: 2.8rem;
  overflow: hidden;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;
const Time = styled.div`
  padding-right: 10px;
  padding-bottom: 2px;
  font-size: 12px;
`;
const DeleteBtn = styled.div`
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`;

export default CancelAlert;
