import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Card = (props) => {
  const postList = useSelector((state) => state.post.list);
  const dogSize = postList[props.index].dogSize;
  const dogGender = postList[props.index].dogGender;
  const dogAge = postList[props.index].dogAge;
  const locationCategory = postList[props.index].locationCategory;
  const dogImage = postList[props.index].dogImage;
  const dogName = postList[props.index].dogName;
  const meetingDate = postList[props.index].meetingDate;
  const meetingTime = postList[props.index].meetingTime;
  const completed = postList[props.index].completed;

  return (
    <Wrap>
      <Left>
        <div>
          <div>{dogName}</div>
          <div>{dogAge}</div>
          <div>{dogSize}</div>
          <div>{dogGender}</div>
        </div>
        <div>{locationCategory}</div>
        <div>{meetingDate + " " + meetingTime}</div>
        <div>{completed ? "마감" : "진행중"}</div>
      </Left>
      <div>
        <Image src={dogImage} />
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
  border-radius: 50%;
`;
export default Card;
