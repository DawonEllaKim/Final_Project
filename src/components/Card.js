import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Card = (props) => {
  const postList = useSelector((state) => state.post.list[props.index]);
  const dogSize = postList.dogSize;
  const dogGender = postList.dogGender;
  const dogAge = postList.dogAge;
  const locationCategory = postList.locationCategory;
  const dogImage = postList.dogImage;
  const dogName = postList.dogName;
  const meetingTime = postList.meetingTime;
  const meetingDate = postList.meetingDate;
  const completed = postList.completed;

  return (
    <Wrap>
      <Top>
        <Left>
          <Image src={dogImage} />
        </Left>
        <Right>
          <Title>
            <div>이름</div>
            <div>정보</div>
            <div>위치</div>
          </Title>
          <Info>
            <div>{dogName}</div>
            <GenderAge>
              <div style={{ marginRight: "30px" }}>{dogSize}</div>
              <div style={{ marginRight: "30px" }}>{dogGender}</div>
              <div>{dogAge}</div>
            </GenderAge>
            <div>{locationCategory}</div>
          </Info>
        </Right>
      </Top>
      <Bottom>
        <div style={{ marginRight: "30px" }}>산책시간</div>
        <div style={{ marginRight: "30px" }}>
          {meetingDate + " " + meetingTime}
        </div>
      </Bottom>
      <Complete>{completed ? "마감" : "진행중"}</Complete>
    </Wrap>
  );
};
const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 350px;
  height: 152px;
  margin-bottom: 12px;
  border-radius: 14px;
  background-color: #e5e5e5;

  font-size: 14px;
  font-weight: 400;
  line-height: 20.27px;

  cursor: pointer;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Left = styled.div``;
const Right = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 242px;
  padding-top: 20px;
`;
const GenderAge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  width: 50px;
  border-right: 1px solid white;
`;
const Info = styled.div`
  width: 192px;
`;
const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 10px;

  border-top: 1px solid white;
`;

const Image = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 108px;
  height: 108px;
  border-radius: 14px 14px 0 0;
`;
const Complete = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12%;
  height: 25px;
  background-color: pink;
  border-radius: 20px;
  font-size: 12px;
`;
export default Card;
