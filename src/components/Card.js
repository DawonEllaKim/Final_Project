import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// React Icons
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

const Card = (props) => {
  const postList = useSelector((state) => state.post.list[props.index]);
  const dogList = props.dogList
  
  const dogGender = dogList.dog_gender;
  const dogAge = dogList.dog_age;

  const dogImage = dogList.dog_image;
  const dogName = dogList.dog_name;
  const meetingDate = postList.meetingDate;
  // const completed = postList.completed;
  const wishList = postList.wishList;
  console.log(dogList)
  console.log(postList)
  return (
    <CardWrap>
      <img src={dogImage} />
      <CardInfo>
        <CardTop>
          <h4> {dogGender === "남" ? <BsGenderMale /> : <BsGenderFemale />}</h4>
          <p>{dogName + ", " + dogAge}</p>
        </CardTop>
        <CardCenter>{wishList}</CardCenter>
        <CardBottom>{meetingDate  + " >"}</CardBottom>
      </CardInfo>
    </CardWrap>
  );
};
const CardWrap = styled.div`
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
const CardInfo = styled.div`
  width: 192px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20px;
`;
const CardTop = styled.div`
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
const CardCenter = styled.div`
  width: 100%;
  padding: 10px;
`;
const CardBottom = styled.div`
  width: 100%;
  padding: 10px;
`;

export default Card;
