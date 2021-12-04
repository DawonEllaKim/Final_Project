// NotFound.js - "페이지를 찾을수 없습니다" 페이지
import React, { useEffect } from "react";
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";

// 이미지
import spinner from "../image/spinner.gif";

const NotFound = () => {
  return (
    <Wrap>
      <img src={spinner} />
      <h4>찾을 수 없는 페이지 입니다.</h4>
    </Wrap>
  );
};

useEffect(() => {
  setTimeout(() => {
    history.push("/login");
  }, 1700);
}, []);

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
