import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "../components/Notification/Alert";
import Chat from "../components/Notification/Chat";
import TopBar from "../components/TopBar";

const Notification = () => {
  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();

  const alert = () => {
    setStatus("alert");
  };
  const chat = () => {
    setStatus("chat");
  };

  useEffect(() => {
    setStatus("alert");
    setFocus("alert");
  }, []);

  return (
    <Wrap>
      <TopBar>Notification</TopBar>
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

      {status === "alert" ? (
        <div>
          <Alert />
          <Alert />
          <Alert />
          <Alert />
        </div>
      ) : (
        <div>
          <Chat />
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
