import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import spinner from "../image/spinner.gif";

const NotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      history.push("/login");
    }, 1700);
  }, []);

  return (
    <Wrap>
      <img src={spinner} />
      <h4>찾을 수 없는 페이지 입니다.</h4>
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
export default NotFound;
