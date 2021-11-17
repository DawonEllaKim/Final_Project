import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

// 이미지 + 아이콘
import male from "../../image/male.png";
import female from "../../image/female.png";

const DogCard = ({ post }) => {
  const history = useHistory();

  return (
    <CardWrap
      onClick={() => {
        history.push("/dogProfile");
      }}
    >
      {/* 카드 왼쪽 - 강아지 이미지 */}
      <img src={post.dogImage} />

      {/* 카드 오른쪽 - 강아지 정보 */}
      <CardInfo>
        {/* 강아지 성별 + 이름 + 나이 */}
        <CardTop>
          {post.dogGender === "남" ? <img src={male} /> : <img src={female} />}
          {post.dogName}, {post.dogAge}
        </CardTop>

        {/* 강어지 이름 + 중성화 여부 + 강아지소개 */}
        <CardBottom style={{ marginBottom: "20px" }}>
          <div>{post.dogBreed}</div>
          <div>중성화여부 / {post.neutral == true ? "유" : "무"}</div>
          <div>{post.dogComment}</div>
        </CardBottom>
      </CardInfo>
    </CardWrap>
  );
};

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 152px;

  margin-bottom: 24px;

  border-radius: 25px;
  background-color: #fff;
  color: #747474;

  font-size: 14px;
  font-weight: 400;
  line-height: 20.27px;
  cursor: pointer;

  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);

  img {
    width: 152px;
    height: 152px;
    border-radius: 25px;
    object-fit: cover;
  }
`;
const CardTop = styled.div`
  font-size: 16px;
  color: black;
  margin-bottom: 20px;
  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
    margin-right: 8px;
  }
`;
const CardInfo = styled.div`
  width: 192px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20px;
  padding-top: 11px;
`;
const CardBottom = styled.div`
  div {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
`;

export default DogCard;
