import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import puppyPlaceholder from "../asset/puppyPlaceholder.png";

const Main = () => {
  return (
    <Wrap>
      <Head>
        {/* 강아지 크기 */}
        <select>
          <option>강아지 크기 전체</option>
          <option>소형견</option>
          <option>중형견</option>
          <option>대형견</option>
        </select>

        {/* 성별 */}
        <select>
          <option>성별 전체</option>
          <option>남아</option>
          <option>여아</option>
        </select>

        {/* 나이 */}
        <select>
          <option>나이 전체</option>
          <option>0세~3세</option>
          <option>4세~7세</option>
          <option>8세 이상</option>
        </select>

        {/* 산책로 */}
        <select>
          <option>산책로 전체</option>
          <option>반포</option>
          <option>여의도</option>
          <option>뚝섬</option>
          <option>서울숲</option>
          <option>올림픽공원</option>
          <option>인천대공원</option>
          <option>대구 수성못</option>
          <option>부산 시민공원</option>
          <option>부산 광안리</option>
        </select>

        {/* 마감여부 */}
        <select>
          <option>마감여부 전체</option>
          <option>마감</option>
          <option>진행중</option>
        </select>
      </Head>

      <Body>
        <Card />
      </Body>

      <Footer>
        <button>채팅방</button>
        <button>산책 약속 등록 버튼</button>
        <button>마이페이지</button>
        <button>로그아웃</button>
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
