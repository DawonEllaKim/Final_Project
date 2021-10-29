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
        <Center></Center>
        <Right></Right>
      </Top>
      <Bottom>
        <div>{meetingDate + " " + meetingTime}</div>
      </Bottom>

      <Left>
        <div>
          <div>{dogName}</div>
          <div>{dogAge}</div>
          <div>{dogSize}</div>
          <div>{dogGender}</div>
        </div>
        <div>{locationCategory}</div>
        <div>{completed ? "마감" : "진행중"}</div>
      </Left>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 350px;
  height: 152px;
  border-radius: 14px;
  background-color: #e5e5e5;
`;
const Top = styled.div``;
const Left = styled.div``;
const Center = styled.div``;
const Right = styled.div``;
const Bottom = styled.div``;
// const Left = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const Image = styled.img`
  width: 108px;
  height: 108px;
  border-radius: 14px 14px 0 0;
`;
export default Card;
