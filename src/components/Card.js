import React from "react";
import styled from "styled-components";
import puppyPlaceholder from "../asset/puppyPlaceholder.png";

const Card = () => {
  return (
    <Wrap>
      <Left>
        <div>
          <div>가을이</div>
          <div>7세 7개월</div>
        </div>
        <div>서울숲</div>
        <div>2021년 10월 28일 16:30</div>
      </Left>

      <div>
        <Image src={puppyPlaceholder} />
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
  width: 150px;
  height: 150px;
  margin: 20px;
`;
export default Card;
