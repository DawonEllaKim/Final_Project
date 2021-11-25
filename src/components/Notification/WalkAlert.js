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
        <Top>
        <Left>
          <img src={noti.senderImage} />
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
        </Right>
        </Top>

        <Bottom>
        <Time>{noti.AGOTIME}</Time>
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

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-top: 10px;
`;
const CancelBtn = styled.div`
  border-radius: 20px;
  width: 5.5rem;
  padding: 6px 0;
  text-align:center;
  border: 0.01rem solid lightGray;
`;
const SubmitBtn = styled.div`
  background-color: #ff5656;
  color: #fff;
  border-radius: 20px;
  width: 5.5rem;
  padding: 6px 0;
  text-align:center;
  border: 0.01rem solid #ff5656;
  margin-right: 10px;
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

export default WalkAlert;
