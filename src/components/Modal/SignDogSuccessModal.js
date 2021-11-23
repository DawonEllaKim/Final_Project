import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Check from "../../image/Check.png"

const SignDogSuccessModal = (props) => {
  const dispatch = useDispatch();
  const history= useHistory();
  const addMarker = () => {
    props.close();
  };

  return (
    <React.Fragment>
      <Component />

      <ModalComponent  onClick={()=>{props.setModal(false)
        history.push("/")}}>
        <ModalExitBtn onClick={props.close}>
          <Close />
        </ModalExitBtn>
        <Info>
            <ImageWrap>
          <Img src={Check} />
          </ImageWrap>
          <ModalHeader>강아지등록에 성공했습니다.</ModalHeader>
        </Info>
      </ModalComponent>
    </React.Fragment>
  );
};
const Info = styled.div
`
display:block;
margin:0 auto;
`
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
const ImageWrap = styled.div
`
margin:0 auto;
background-color:red;
width:100px;
height:100px;
border-radius:50%;
display:flex;
justify-content:center;
align-items:center;
`
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

 
  align-items: center;
  border-radius: 14px;
`;
const ModalHeader = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;

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
  width: 60px;
  height: 60x;

`;

export default SignDogSuccessModal;