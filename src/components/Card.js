import React from "react";
import styled from "styled-components";

// 리액트 아이콘
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
import male from "../image/male.png";
import female from "../image/female.png";

const Card = ({ post }) => {
  const dogImage = post.dogImage;
  const dogName = post.dogName;
  const dogGender = post.dogGender;
  const dogAge = post.dogAge;
  const dogComment = post.dogComment;
  const initialMeetingDate = post.meetingDate;

  console.log(post);

  // const MeetingDate = initialMeetingDate.split("T")[0];
  // const year = MeetingDate.split("-")[0];
  // const month = MeetingDate.split("-")[1];
  // const day = MeetingDate.split("-")[2];
  // const MeetingTime = initialMeetingDate.split("T")[1];
  // console.log(MeetingTime);
  // const hour = MeetingTime.split(":")[0];
  // const minute = MeetingTime.split(":")[1];

  return (
    <CardWrap>
      {/* 카드 왼쪽 - 이미지 */}
      <img src={dogImage} sty />

      {/* 카드 오른쪽 - 약속 정보*/}
      <CardInfo>
        <CardTop>
          <h4>
            {dogGender === "남" ? (
              <img src={male} style={{ width: "20px", height: "20px" }} />
            ) : (
              <img src={female} style={{ width: "20px", height: "20px" }} />
            )}
          </h4>
          <p>{dogName + ", " + dogAge}</p>
        </CardTop>
        <CardCenter>{dogComment}</CardCenter>
        <CardBottom>
          {/* {year}. {month}. {day} {}:{} */}
          {initialMeetingDate}
        </CardBottom>
      </CardInfo>
    </CardWrap>
  );
};

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
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
const CardInfo = styled.div`
  box-sizing: border-box;
  width: 158px;
  height: 152px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
`;
const CardTop = styled.div`
  padding-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-top: 13px;
  h4 {
    width: 20px;
    height: 20px;
    padding: 0;
    margin: 0 8px 0 0;
    font-weight: 600;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: black;
    font-weight: 400;
  }
`;
const CardCenter = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  width: 100%;
  padding-top: 12px;
`;
const CardBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;

export default Card;
