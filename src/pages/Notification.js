import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../components/TopBar";
import Alert from "../components/Notification/Alert";
import InBox from "../components/Notification/InBox";
import OutBox from "../components/Notification/OutBox";

// 리덕스
import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as notiActions } from "../redux/modules/notification";
const Notification = (props) => {
  const notification = props.notification; // app.js에서 socket.io불러옴 Alert.js에 한 번 더 props로 보냄
  console.log(notification);
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
  };
  const InBoxStatus = () => {
    setStatus("InBoxStatus");
    setTitle("쪽지함");
  };
  const OutBoxStatus = () => {
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
  console.log(getNoti);
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
          {getNoti.map((noti, index) => {
            return <Alert noti={noti} />;
          })}
        </div>
      )}
      {status === "InBoxStatus" && (
        <div>
          {inBoxList.map((box, index) => {
            return <InBox key={index} box={box} />;
          })}
        </div>
      )}
      {status === "OutBoxStatus" && (
        <div>
          {outBoxList.map((box, index) => {
            return <OutBox key={index} box={box} />;
          })}
        </div>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding: 0 20px;
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

export default Notification;
