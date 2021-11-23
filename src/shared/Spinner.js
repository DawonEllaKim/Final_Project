import React from "react";
import styled from "styled-components";
import spinner from "../image/spinner.gif";

const Spinner = () => {
  return (
    <Wrap>
      <img src={spinner} />
      <h3>로딩중입니다...</h3>
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
