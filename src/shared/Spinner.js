import React from "react";
import styled from "styled-components";
import spinner from "../image/spinner.gif";

const Spinner = () => {
  return (
    <Wrap>
      <img src={spinner} />
      <h4>로딩중입니다...</h4>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  img {
    width: 90%;
  }
  h4 {
  }
`;
export default Spinner;
