import React from "react";
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";

// 컴포넌츠
import NavBar from "../components/NavBar";

// 리액트 아이콘
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import caution from "../image/caution2.png";

const Caution2 = () => {
  return (
    <Wrap>
      {/* 헤더 */}
      <Header>
        <MdArrowBackIos
          onClick={() => {
            history.push("/caution1");
          }}
          style={{
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
        <p>산책 시 유의할 점 2</p>
        <MdArrowForwardIos
          onClick={() => {
            history.push("/caution3");
          }}
          style={{
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      </Header>

      {/* 이미지 */}
      <Img>
        <img src={caution} />
      </Img>

      {/* 주의 사항 */}
      <Paragraph>
        <h3>개를 무서워하는 사람들을 주의해야 합니다.</h3>
        <p>
          강아지를 무서워하거나 싫어하는 사람들이 있을 수 있기 때문에 사람이
          지나갈 때는 강아지의 목줄을 짧게 잡는 배려가 필요해요
        </p>
      </Paragraph>

      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 14px 5% 0 5%;

  font-size: 14px;
  text-align: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;

  margin-bottom: 26px;
  font-size: 18px;
`;
const Img = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 50%;
  overflow: hidden;
  margin-bottom: 40px;
  img {
    border-radius: 14px;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    object-fit: cover;
  }
`;
const Paragraph = styled.div`
  word-break: keep-all;
  h3 {
    font-size: 18px;
    margin-bottom: 36px;
  }
  p {
    font-size: 16px;
    text-align: left;
  }
`;

export default Caution2;
