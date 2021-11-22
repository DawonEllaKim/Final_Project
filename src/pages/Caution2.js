import React from "react";
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";

// 컴포넌츠
import NavBar from "../components/NavBar";

// 리액트 아이콘
import backward from "../image/backward.png";
import forward from "../image/forward.png";
import caution from "../image/caution2.png";

const Caution2 = () => {
  return (
    <Wrap>
      {/* 헤더 */}
      <Header>
        <img
          src={backward}
          onClick={() => {
            history.push("/caution1");
          }}
        />
        <p>산책 시 유의할 점 2</p>
        <img
          src={forward}
          onClick={() => {
            history.push("/caution3");
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

  max-width: 100%;
  margin: 0 0 0px 0;

  font-size: 14px;
  text-align: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 52px;
  padding: 0 20px;

  margin: 26px 0;
  font-size: 18px;
  margin-bottom: 26px;
  img {
    cursor: pointer;
    width: 10px;
    height: 18px;
  }
`;
const Img = styled.div`
  box-sizing: border-box;
  aspect-ratio: 4/2;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 47px;
  img {
    border-radius: 14px;
    width: 100%;
    aspect-ratio: 4/2;
    object-fit: cover;
  }
`;
const Paragraph = styled.div`
  padding: 0 30px;
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
