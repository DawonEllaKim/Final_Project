import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import error from "../image/error.png";

const ErrorModal = (props) => {
  const dispatch = useDispatch();

  const addMarker = () => {
    props.close();
  };

  return (
    <React.Fragment>
      <Component onClick={props.close} />

      <ModalComponent>
        <ModalExitBtn onClick={props.close}>
          <Close />
        </ModalExitBtn>
        <div>
          <Img src={error} />
          <ModalHeader>{props.text}</ModalHeader>
        </div>
      </ModalComponent>
    </React.Fragment>
  );
};
const Component = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
  height: 100vh;
  width: 100%;
  background-color: black;
  z-index: 10;
`;

const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 300px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 14px;
`;
const ModalHeader = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
`;
const ModalInput = styled.div`
  box-sizing: border-box;
  width: 50%;
`;
const ModalButtonContainer = styled.div`
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 30px;
`;
const ModalSubmitBtn = styled.button`
  width: 100%;
  background-color: #ff5656;
  border: none;
  outline: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius: 14px;
`;
const ModalExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 12px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  color: black;
`;

const Img = styled.img`
  width: 88px;
  height: 88px;
  margin-top: 80px;
`;

export default ErrorModal;
