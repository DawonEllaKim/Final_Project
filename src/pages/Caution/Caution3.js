// Caution3.js - 산책 주의사항 페이지3
import React from "react";
import styled from "styled-components";

// 리덕스
import { history } from "../../redux/configureStore";

// 컴포넌츠
import NavBar from "../../components/NavBar";

// 이미지 + 아이콘
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import caution from "../../image/caution3.png";

const Caution3 = () => {
  return (
    <Wrap>
      {/* 헤더 */}
      <Header>
        <MdArrowBackIos
          onClick={() => {
            history.push("/caution2");
          }}
          style={{
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
        <p>산책 시 유의할 점 3</p>
        <MdArrowForwardIos
          onClick={() => {
            history.push("/caution1");
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
        <h3>목줄 착용은 선택이 아닌 필수입니다.</h3>
        <p>
          목줄 착용은 다른 사람에게 피해를 주지 않기 위해서만 하는 것이
          아니에요.
        </p>
        <br />
        <p>
          목줄착용의 가장 큰 장점은 위험한 상황에서 강아지를 컨트롤 할 수 있다는
          것입니다.
        </p>
        <br />
        <p>
          목줄은 강아지가 갑자기 차도나 사람에게 달려드는 등의 위급한 상황에서
          강아지를 제어할 수 있는 유일한 안전장치에요.
        </p>
        <br />
        <p>우리 강아지를 위해서라도 목줄착용은 꼭 해주시길 부탁해요~!</p>
      </Paragraph>

      {/* 네브바 */}
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

export default Caution3;
