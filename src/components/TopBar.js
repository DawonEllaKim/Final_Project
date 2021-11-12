import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

import Button from "../elements/Button";
import backward from "../image/backward.png";
import notification from "../image/Notification.png";

const TopBar = (props) => {
  const { text, children, margin, width, padding, only_left } = props;

  const styles = {
    padding,
    margin,
    width,
  };

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
            left="20px"
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
          left="20px"
        >
          <img src={backward} style={{ width: "10px", height: "18px" }} />
        </Button>
        {text ? text : children}
        <Button position="absolute" top="0" right="20px">
          <img src={notification} style={{ width: "24px", height: "24px" }} />
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
  width: 390px;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: bold;
  margin: 36px 0;
  text-align: center;
`;
const Both = styled.div`
  position: relative;
  width: 390px;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
  font-size: 18px;
  font-weight: bold;
  margin: 36px 0;
  text-align: center;
`;

export default TopBar;
