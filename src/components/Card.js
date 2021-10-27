import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <Wrap>
      <Left>
        <div>가을이 7세 3개월</div>
        <div>서울숲</div>
        <div>2021년 10월 28일 16:30</div>
      </Left>

      <div>
        <Image />
      </div>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;
export default Card;
