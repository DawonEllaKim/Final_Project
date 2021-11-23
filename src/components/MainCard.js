import React from "react";
import styled from "styled-components";

// 리액트 아이콘
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import male from "../image/male.png";
import female from "../image/female.png";

const MainCard = ({ post }) => {
  const dogImage = post.dogImage;
  return (
    <Wrap>
      <Image src={dogImage} />
    </Wrap>
  );
};

const Wrap = styled.div`
border: 1px solid green;
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
`
const Image = styled.img`
border:1px solid red;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 5px;
`;

export default MainCard;
