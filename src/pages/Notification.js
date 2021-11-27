import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Alert from "../components/Notification/Alert";
import InBox from "../components/Notification/InBox";
import OutBox from "../components/Notification/OutBox";
import WalkAlert from "../components/Notification/WalkAlert";
import SubmitAlert from "../components/Notification/SubmitAlert";
import CancelAlert from "../components/Notification/CancelAlert";

// 리덕스
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as notiActions } from "../redux/modules/notification";


const Notification = (props) => {
  const notification = props.notification; // app.js에서 socket.io불러옴 Alert.js에 한 번 더 props로 보냄

  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();
  const [title, setTitle] = useState();

  const dispatch = useDispatch();
  const inBoxList = useSelector((state) => state.chat.inBoxList); // 내가 받은 모든 쪽지 리스트
  const outBoxList = useSelector((state) => state.chat.outBoxList); // 내가 보낸 모든 쪽지 리스트
  const getNoti = useSelector((state) => state.notification.noti); //알람가지고오기
  const userId = localStorage.getItem("userId");
  // alert = 알람, InBoxStatus = 받은 쪽지함, OutBoxStatus = 보낸 쪽지함
  const alert = () => {
    setStatus("alert");
    setTitle("알림페이지");
    setFocus("alert");
  };
  const InBoxStatus = () => {
    setFocus("InBoxStatus");
    setStatus("InBoxStatus");
    setTitle("쪽지함");
  };
  const OutBoxStatus = () => {
    setFocus("OutBoxStatus");
    setStatus("OutBoxStatus");
    setTitle("쪽지함");
  };

  useEffect(() => {
    setStatus("alert"); // 처음에 "알람" 카테고리가 보이도록 초기값 설정
    setFocus("alert"); // "알람" 글자 밑에 빨간줄로 초기값 설정
    setTitle("알림페이지"); //"알림페이지" 로 타이틀 시작
    dispatch(chatActions.inBoxMD()); // 내가 받은 모든 쪽지 불러오기
    dispatch(chatActions.outBoxMD()); // 내가 보낸 모든 쪽지 불러오기
    dispatch(notiActions.getNotiMD(userId)); // 알람 불러오기
  }, []);

  return (
    <Wrap>
      <TopBar>{title}</TopBar>

      {/* 알림, 받은 쪽지함, 보낸 쪽지함 */}
      <Category>
        <button
          onClick={alert}
          onFocus={() => setFocus("alert")}
          style={{ borderBottom: focus === "alert" ? "0.3rem solid red" : "" }}
        >
          알림
        </button>

        <button
          onClick={InBoxStatus}
          onFocus={() => setFocus("InBoxStatus")}
          style={{
            borderBottom: focus === "InBoxStatus" ? "0.3rem solid red" : "",
          }}
        >
          받은 쪽지함
        </button>

        <button
          onClick={OutBoxStatus}
          onFocus={() => setFocus("OutBoxStatus")}
          style={{
            borderBottom: focus === "OutBoxStatus" ? "0.3rem solid red" : "",
          }}
        >
          보낸 쪽지함
        </button>
      </Category>

      {/* 상태값에 따라서 바뀌는 카드 */}
      {status === "alert" && (
        <div>
          {getNoti == 0 ? (
            <EmptyMessage>받은 알림이 없습니다.</EmptyMessage>
          ) : (
            <div>
              {getNoti.map((noti, index) => {
                if (noti.type == 1) return <Alert noti={noti} />;
                if (noti.type == 2) return <WalkAlert noti={noti} />;
                if (noti.type == 3) return <SubmitAlert noti={noti} />;
                if (noti.type == 4) return <CancelAlert noti={noti} />;
              })}
            </div>
          )}
        </div>
      )}
      {status === "InBoxStatus" && (
        <div>
          {inBoxList.length === 0 ? (
            <EmptyMessage>받은 쪽지가 없습니다.</EmptyMessage>
          ) : (
            <div>
              {inBoxList.map((box, index) => {
                return <InBox key={index} box={box} />;
              })}
            </div>
          )}
        </div>
      )}
      {status === "OutBoxStatus" && (
        <div>
          {outBoxList.length === 0 ? (
            <EmptyMessage>보낸 쪽지가 없습니다.</EmptyMessage>
          ) : (
            <div>
              {outBoxList.map((box, index) => {
                return <OutBox key={index} box={box} />;
              })}
            </div>
          )}
        </div>
      )}
      <NavBar></NavBar>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  margin: 0 auto;
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    box-sizing: border-box;
    width: 23vw;
    margin: 0 2vw;
    padding-bottom: 1vh;
    background-color: transparent;
    border: none;
    text-align: center;
    cursor: pointer;
  }
`;
const EmptyMessage = styled.div`
  padding: 20px;
`;

export default Notification;
