import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import Button from "../elements/Button";
import backward from "../image/backward.png";
import notification from "../image/Notification.png";

const TopBar = (props) => {
  const { text, children, padding, only_left } = props;

  const styles = { padding };

  if (only_left) {
    return (
      <div>
        <Left {...styles}>
          <Button
            _onClick={() => {
              history.goBack();
            }}
            position="absolute"
            top="0"
            left="0"
          >
            <img src={backward} style={{ width: "10px", height: "18px" }} />
          </Button>
          {text ? text : children}
        </Left>
      </div>
    );
  }
  return (
    <div>
      <Both {...styles}>
        <Button
          _onClick={() => {
            history.goBack();
          }}
          position="absolute"
          top="0"
          left="0"
        >
          <img src={backward} style={{ width: "10px", height: "18px" }} />
        </Button>
        {text ? text : children}
        <Button position="absolute" top="0" right="0">
          <img
            src={notification}
            style={{ width: "24px", height: "24px" }}
            onClick={() => history.push("/notification")}
          />
        </Button>
      </Both>
    </div>
  );
};
TopBar.defaultProps = {
  text: false,
  children: null,
  padding: false,
  only_left: false,
};

const Left = styled.div`
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

export default TopBar;
