import React from "react";
import styled from "styled-components";
import spinner from "../image/spinner.gif";

const Spinner = () => {
  return (
    <Wrap>
      <img src={spinner} />
      <h4>왈왈! 보호자님, 조금만 기다려주세요!</h4>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  margin: 0 auto;
  h4 {
    margin-top: -100px;
  }
`;

export default Spinner;
