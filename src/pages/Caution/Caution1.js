import React from "react";
import styled from "styled-components";

// 리덕스
import { history } from "../../redux/configureStore";

// 컴포넌츠
import NavBar from "../../components/NavBar";

// 리액트 아이콘
import backward from "../../image/backward.png";
import forward from "../../image/forward.png";
import caution from "../../image/caution1.png";

const Caution1 = () => {
  return (
    <Wrap>
      {/* 헤더 */}
      <Header>
        <img
          src={backward}
          onClick={() => {
            history.push("/");
          }}
        />
        <p>산책 시 유의할 점 1</p>
        <img
          src={forward}
          onClick={() => {
            history.push("/caution2");
          }}
        />
      </Header>

      {/* 이미지 */}
      <Img>
        <img src={caution} />
      </Img>

      {/* 주의 사항 */}
      <Paragraph>
        <h3>상처가 날 수 있는 식물들을 주의해야 합니다.</h3>
        <p>
          가시가 있는 식품에 강아지의 몸이 쓸려 상처가 나지 않도록 주의가
          필요해요.
        </p>
        <br />
        <p>
          독성 식물이나 식물에 제초제가 묻어있는 경우도 많으니 강아지가 풀을
          먹지 않도록 신경 써주세요.
        </p>
        <br />
        <p>
          만약 강아지가 먹으면 안 되는 식물이나 열매를 먹어버렸다면 구토나 설사
          등의 이상 증상이 없는지 잘 지켜봐 주셔야 해요.
        </p>
        <br />
        <p>
          조치가 필요한 경우 빠르게 동물병원으로 내원해야하며 강아지가 먹은
          식물을 수의사에게 알려주는 것이 좋습니다.
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

export default Caution1;
