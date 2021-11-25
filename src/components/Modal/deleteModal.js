import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Check from "../../image/Check.png";

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalText = useSelector((state) => state.modal.modal);
  const [modal, setModal] = useState("");
  useEffect(() => {
    setModal(modalText);
  }, [modalText]);

  const modalHandler = () => {
    history.push("/");
  };

  return (
    <div onClick={modalHandler}>
      <Component />

      <ModalComponent>
        <ModalExitBtn onClick={props.close}>
          <Close />
        </ModalExitBtn>

        <Info>
          <ImageWrap>
            <Img src={Check} />
          </ImageWrap>
          <ModalHeader>{modal}</ModalHeader>
        </Info>
      </ModalComponent>
    </div>
  );
};
const Info = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;
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
const ImageWrap = styled.div`
  background-color: red;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 150px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 99;
  display: flex;

  align-items: center;
  border-radius: 14px;
`;
const ModalHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-left: 10px;
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
  width: 15px;
  height: 15px;
`;

export default DeleteModal;
