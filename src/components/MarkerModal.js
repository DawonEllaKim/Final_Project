import React, { useState } from "react";
import styled from "styled-components";

import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { actionCreators as markerActions } from "../redux/modules/marker";

const MarkerModal = (props) => {
  const dispatch = useDispatch();
  const distance = props.distance;
  const road = props.road;
  const check = props.check;
  const walk = props.walk;

  const addMarker = () => {
    let marker = {
      totalDistance: distance.distance,
      totalTime: distance.time,
      startLocationAddress: distance.start,
      endLocationAddress: distance.last,
      locationCategory: check,
      routeColor: distance.color,
      routeName: distance.name,
      cooridnate: walk,
    };
    dispatch(markerActions.addMarkerAX(marker));

    props.close();
  };

  return (
    <React.Fragment>
      <Component onClick={props.close} />

      <ModalComponent>
        <ModalExitBtn onClick={props.close}>
          <Close />
        </ModalExitBtn>

        <ModalHeader>산책로를 설정하시겠습니까?</ModalHeader>
        <ModalInput>
          출발지 : {distance.start}
          <br />
          산책로 : {distance.name}
        </ModalInput>
        <ModalButtonContainer>
          <ModalSubmitBtn onClick={addMarker}> 산책로 등록 </ModalSubmitBtn>
        </ModalButtonContainer>
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

export default MarkerModal;
