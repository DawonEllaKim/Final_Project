import React from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Main = () => {
  return (
    <Wrap>
      <Head>
        {/* 견종 */}
        <select>
          <option>견종</option>
          <option>요크셔테리어</option>
          <option>푸들</option>
          <option>비글</option>
          <option>말티즈</option>
          <option>허스키</option>
        </select>

        {/* 성별 */}
        <select>
          <option>성별</option>
          <option>남아</option>
          <option>여아</option>
        </select>

        {/* 나이 */}
        <select>
          <option>나이</option>
          <option>0세~1세</option>
          <option>노견</option>
        </select>

        {/* 위치 */}
        <select>
          <option>위치</option>
          <option>서울숲</option>
          <option>한강공원</option>
        </select>
      </Head>

      <Body>
        <Card />
      </Body>

      <Footer>
        <button>마이페이지</button>
        <button>채팅방</button>
      </Footer>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export default Main;
