import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// React Icons
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

const Card = (props) => {
  const postList = useSelector((state) => state.post.list[props.index]);
  // const dogSize = postList.dogSize;
  const dogGender = postList.dogGender;
  const dogAge = postList.dogAge;
  // const locationCategory = postList.locationCategory;
  const dogImage = postList.dogImage;
  const dogName = postList.dogName;
  const meetingTime = postList.meetingTime;
  const meetingDate = postList.meetingDate;
  // const completed = postList.completed;
  const wishList = postList.wishList;

  return (
    <Wrap>
      <img src={dogImage} />
      <Info>
        <Top>
          <h4> {dogGender === "남" ? <BsGenderMale /> : <BsGenderFemale />}</h4>
          <p>{dogName + ", " + dogAge}</p>
        </Top>
        <Center>{wishList}</Center>
        <Bottom>{meetingDate + " " + meetingTime + " >"}</Bottom>
      </Info>
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 176px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 25px;
  background-color: #ebebeb;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.27px;
  cursor: pointer;
  img {
    width: 152px;
    height: 152px;
    border-radius: 25px;
  }
`;
const Info = styled.div`
  width: 192px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  h4 {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  p {
    font-size: 16px;
  }
`;
const Center = styled.div`
  width: 100%;
  padding: 10px;
`;
const Bottom = styled.div`
  width: 100%;
  padding: 10px;
`;

export default Card;
