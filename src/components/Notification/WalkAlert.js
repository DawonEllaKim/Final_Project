import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as notiActions } from "../../redux/modules/notification";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { io } from "socket.io-client";
const WalkAlert = ({ noti }) => {
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    setSocket(io.connect(`https://www.walkadog.shop/notification/${userId}`));
  }, []);
  useEffect(() => {
    socket?.emit("postUser", userId);
  }, []);
  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotification((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <div>
      <Wrap>
        <Left>
          <img src={noti.senderImage} />

          <span>{noti.senderNickname}</span>
        </Left>
        <Right>
          <Message>
            {noti.senderNickname}님이 산책요청하셨습니다.
            <br />
            수락하시겠습니까?
          </Message>
          <BtnArea>
            <SubmitBtn
              onClick={() =>
                dispatch(
                  notiActions.postNotiMD(noti.notificationId, noti.senderId, 3)
                )
              }
            >
              수락하기
            </SubmitBtn>
            <CancelBtn
              onClick={() =>
                dispatch(
                  notiActions.postNotiMD(noti.notificationId, noti.senderId, 4)
                )
              }
            >
              거절하기
            </CancelBtn>
          </BtnArea>
          <Info>
            <Time>{noti.AGOTIME}</Time>
          </Info>
        </Right>
      </Wrap>
    </div>
  );
};
const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Message = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
`;
const Info = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
`;
const Time = styled.div`
  padding-right: 10px;
  padding-bottom: 3px;
  font-size: 12px;
`;
const CancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 5.5rem;
  height: 40px;
  box-shadow: 0 0.03em 0.03em rgba(0, 0, 0, 0.25);
  border: 0.01rem solid lightGray;
`;
const SubmitBtn = styled.div`
  background-color: #ff5656;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 5.5rem;
  height: 40px;
  box-shadow: 0 0.03em 0.03em rgba(0, 0, 0, 0.25);
  border: 0.01rem solid lightGray;
  margin-right: 10px;
`;
const Wrap = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 9em;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius: 15px;
  position: relative;
`;

const Left = styled.div`
  display: block;

  padding-left: 10px;
  padding: 30px;

  height: 100%;
  img {
    display: flex;
    justify-content: center;

    width: 3em;
    height: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    display: flex;
    justify-content: center;

    margin-bottom: 5px;
  }
  button {
    display: flex;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-left: 10px;
`;

export default WalkAlert;
