import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import spinner from "../image/spinner.gif";

const Redirect = () => {
  useEffect(() => {
    setTimeout(() => {
      history.push("/login");
    }, 1700);
  }, []);

  return (
    <Wrap>
      <img src={spinner} />
      <h4>
        왈왈! 로그인 후 이용 할 수 있는 서비스 입니다. <br />
        로그인 페이지로 이동합니다!
      </h4>
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
export default Redirect;
