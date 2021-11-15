import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import Alert from "../components/Notification/Alert";
import Chat from "../components/Notification/Chat";
import TopBar from "../components/TopBar";

// 리덕스
import { actionCreators as chatActions } from "../redux/modules/chat";

const Notification = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();

  const allMyChatRooms = useSelector((state) => state.chat.list);

  const alert = () => {
    setStatus("alert");
  };
  const chat = () => {
    setStatus("chat");
  };

  useEffect(() => {
    setStatus("alert");
    setFocus("alert");
    dispatch(chatActions.getAllMyChatRoomsMD());
  }, []);

  return (
    <Wrap>
      <TopBar>Notification</TopBar>

      {/* 알림 or 쪽지함 */}
      <Category>
        <button
          onClick={alert}
          onFocus={() => setFocus("alert")}
          style={{ borderBottom: focus === "alert" ? "4px solid red" : "" }}
        >
          알림
        </button>
        <button
          onClick={chat}
          onFocus={() => setFocus("notification")}
          style={{ borderBottom: focus === "alert" ? "" : "4px solid red" }}
        >
          쪽지함
        </button>
      </Category>

      {/* 상태값에 따라서 바뀌는 카드 */}
      {status === "alert" ? (
        <div>
          <Alert />
          <Alert />
          <Alert />
          <Alert />
        </div>
      ) : (
        <div>
          {allMyChatRooms.map((room, index) => {
            return <Chat key={index} room={room} />;
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
