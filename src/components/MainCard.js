import React from "react";
import styled from "styled-components";

// 리액트 아이콘
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import male from "../image/male.png";
import female from "../image/female.png";

const MainCard = ({ post }) => {
  const dogImage = post.dogImage;
  const dogName = post.dogName;
  const dogGender = post.dogGender;
  const dogAge = post.dogAge;
  const dogComment = post.dogComment;
  const initialMeetingDate = post.meetingDate;
  return (
    <>
      <Image src={dogImage} />
    </>
  );
};

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
  height: 100%;
`;

export default MainCard;
