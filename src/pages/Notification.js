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

const Notification = () => {
  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();

  const dispatch = useDispatch();
  const inBoxList = useSelector((state) => state.chat.inBoxList); // 내가 받은 모든 쪽지 리스트
  const outBoxList = useSelector((state) => state.chat.outBoxList); // 내가 보낸 모든 쪽지 리스트

  // alert = 알람, InBoxStatus = 받은 쪽지함, OutBoxStatus = 보낸 쪽지함
  const alert = () => {
    setStatus("alert");
  };
  const InBoxStatus = () => {
    setStatus("InBoxStatus");
  };
  const OutBoxStatus = () => {
    setStatus("OutBoxStatus");
  };

  useEffect(() => {
    setStatus("alert"); // 처음에 "알람" 카테고리가 보이도록 초기값 설정
    setFocus("alert"); // "알람" 글자 밑에 빨간줄로 초기값 설정
    dispatch(chatActions.inBoxMD()); // 내가 받은 모든 쪽지 불러오기
    dispatch(chatActions.outBoxMD()); // 내가 보낸 모든 쪽지 불러오기
  }, []);

  return (
    <Wrap>
      <TopBar>Notification</TopBar>

      {/* 알림, 받은 쪽지함, 보낸 쪽지함 */}
      <Category>
        <button
          onClick={alert}
          onFocus={() => setFocus("alert")}
          style={{ borderBottom: focus === "alert" ? "4px solid red" : "" }}
        >
          알림
        </button>

        <button
          onClick={InBoxStatus}
          onFocus={() => setFocus("InBoxStatus")}
          style={{
            borderBottom: focus === "InBoxStatus" ? "4px solid red" : "",
          }}
        >
          받은 쪽지함
        </button>

        <button
          onClick={OutBoxStatus}
          onFocus={() => setFocus("OutBoxStatus")}
          style={{
            borderBottom: focus === "OutBoxStatus" ? "4px solid red" : "",
          }}
        >
          보낸 쪽지함
        </button>
      </Category>

      {/* 상태값에 따라서 바뀌는 카드 */}
      {status === "alert" && (
        <div>
          <Alert />
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

const Wrap = styled.div``;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    box-sizing: border-box;
    width: 70px;
    margin: 0 10px;
    padding-bottom: 10px;
    background-color: transparent;
    border: none;
    text-align: center;
  }
`;

export default Notification;
