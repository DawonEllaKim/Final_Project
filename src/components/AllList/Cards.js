import React from "react";
import styled from "styled-components";
import { history } from "../../redux/configureStore";

// 아이콘
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

const Cards = ({ Info }) => {
  return (
    <EachCardWrap
      post={Info.post}
      onClick={() => history.push(`/posts/${Info.post.postId}`)}
    >
      {/* 카드 왼쪽 */}
      <Left>
        <DogImg src={Info.dogImage} alt="dog" />
      </Left>

      {/* 카드 오른쪽 */}
      <Right>
        <CardTop>
          <h4>
            {Info.dogGender === "남" ? (
              <IoMdMale
                style={{
                  width: "24px",
                  height: "24px",
                  color: "#89B1FF",
                }}
              />
            ) : (
              <IoMdFemale
                style={{
                  width: "24px",
                  height: "24px",
                  color: "#FF8989",
                }}
              />
            )}
          </h4>
          <DogInfo>
            <p>{Info.dogName}</p>
            <p>{Info.dogAge}</p>
          </DogInfo>
          <>
            {Info.completed === "마감" ? (
              <h3
                style={{
                  backgroundColor: "#ff5656",
                  padding: "5px",
                  color: "#fff",
                }}
              >
                마감
              </h3>
            ) : (
              <h3 style={{ backgroundColor: "#e5e5e5" }}>진행중</h3>
            )}
          </>
        </CardTop>
        <CardBottom>
          <Box>
            <RedIcon>
              <MdLocationPin
                style={{
                  color: "#fff",
                  width: "16px",
                  height: "16px",
                  fontWeight: "bold",
                }}
              />
            </RedIcon>
            <BoxDiv>
              <MeetingTime>{Info.post.locationCategory}</MeetingTime>
            </BoxDiv>
          </Box>
          <Box>
            <RedIcon>
              <FaRegClock
                style={{
                  color: "#fff",
                  width: "16px",
                  height: "16px",
                  fontWeight: "bold",
                }}
              />
            </RedIcon>
            <BoxDiv>
              <MeetingTime>{Info.meetingDate}</MeetingTime>
            </BoxDiv>
          </Box>
        </CardBottom>
      </Right>
    </EachCardWrap>
  );
};

const EachCardWrap = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 163px;
  padding: 14px;
  margin-bottom: 20px;
  border-radius: 14px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
  position: relative;
`;
const Left = styled.div`
  position: relative;
  width: 40%;
  height: 140px;
`;
const DogImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  border-radius: 14px;
  left: 0;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 55%;
  height: 140px;
`;
const CardTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  font-size: 14px;
  line-height: 23px;
  h4 {
    margin-right: 10px;
  }
  h3 {
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    right: 20px;
    font-weight: normal;
    font-size: 14px;
  }
`;
const DogInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
`;
const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: Right;
  font-size: 14px;
  line-height: 1.4;
  width: 100%;
  padding: 8px 8px 0 0;
  box-sizing: border-box;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-bottom: 15px;
`;
const RedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #ff5656;
  border-radius: 100px;
  margin-right: 10px;
`;
const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: left;
`;
const MeetingTime = styled.div`
  font-size: 14px;
`;

export default Cards;
