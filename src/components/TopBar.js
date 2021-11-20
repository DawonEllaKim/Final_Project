import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import backward from "../image/backward.png";
import notification from "../image/Notification.png";

const TopBar = (props) => {
  const { text, children, padding, only_left, only_right } = props;

  const styles = { padding };

  if (only_left) {
    return (
      <div>
        <Left {...styles}>
          <BtnLeft
            onClick={() => {
              history.goBack();
            }}
          >
            <img
              src={backward}
              style={{
                width: "10px",
                height: "18px",
              }}
            />
          </BtnLeft>
          {text ? text : children}
        </Left>
      </div>
    );
  } else if (only_right) {
    return (
      <div>
        <Right {...styles}>
          {text ? text : children}
          <BtnRight onClick={() => history.push("/notification")}>
            <img
              src={notification}
              style={{
                width: "24px",
                height: "24px",
              }}
            />
          </BtnRight>
        </Right>
      </div>
    );
  }
  return (
    <div>
      <Both {...styles}>
        <BtnLeft
          onClick={() => {
            history.goBack();
          }}
        >
          <img
            src={backward}
            style={{
              width: "10px",
              height: "18px",
            }}
          />
        </BtnLeft>
        {text ? text : children}
        <BtnRight onClick={() => history.push("/notification")}>
          <img
            src={notification}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        </BtnRight>
      </Both>
    </div>
  );
};
TopBar.defaultProps = {
  text: false,
  children: null,
  padding: false,
  only_left: false,
  only_right: false,
};

const Left = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 36px;
  text-align: center;
  padding: ${(props) => props.padding};
`;
const Right = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 36px;
  text-align: center;
  padding: ${(props) => props.padding};
`;
const Both = styled.div`
  position: relative;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: 500;
  margin: 36px 0;
  text-align: center;
  padding: ${(props) => props.padding};
`;

const BtnLeft = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  background-color: transparent;
  width: 52px;
  height: 52px;
  cursor: pointer;
`;
const BtnRight = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  width: 52px;
  height: 52px;
  cursor: pointer;
`;

export default TopBar;
