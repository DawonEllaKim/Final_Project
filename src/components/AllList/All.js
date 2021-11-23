// All.js - 산책가자 페이지에서 전체 카드 페이지
import React from "react";
import styled from "styled-components";

// 리덕스
import { history } from "../../redux/configureStore";

// 이미지 + 아이콘
import OlympicMap from "../../image/OlympicMap.png";
import SeoulMap from "../../image/SeoulMap.png";
import BanpoMap from "../../image/BanpoMap.png";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";

function All({ postList }) {
  return (
    <Wrap>
      {postList.map((post, index) => {
        const dogImage = post.dogImage;
        const dogName = post.dogName;
        const dogGender = post.dogGender;
        const dogAge = post.dogAge;
        const initialMeetingDate = post.meetingDate;

        // 장소 카테고리마다 카드에 보이는 지도 이미지 다르게
        const map = () => {
          if (post.locationCategory === "서울숲") {
            return SeoulMap;
          } else if (post.locationCategory === "올림픽공원") {
            return OlympicMap;
          } else {
            return BanpoMap;
          }
        };

        return (
          <CardWrap
            post={post}
            key={index}
            onClick={() => history.push(`/posts/${post.postId}`)}
          >
            {/* 카드 왼쪽 */}
            <DogImage>
              <Map src={dogImage} alt="dog" />
            </DogImage>

            {/* 카드 오른쪽 */}
            <Right>
              <CardTop>
                <h4 style={{ marginRight: "10px" }}>
                  {dogGender === "남" ? (
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
                  <p>{dogName}</p>
                  <p>{dogAge}</p>
                </DogInfo>
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
                    <MeetingTime>{post.locationCategory}</MeetingTime>
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
                    <MeetingTime>{initialMeetingDate}</MeetingTime>
                  </BoxDiv>
                </Box>
              </CardBottom>
            </Right>
          </CardWrap>
        );
      })}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  /* height: 135px; */
`;
const CardWrap = styled.div`
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
`;
const DogInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
`;
const DogPhoto = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
`;
const DogName = styled.p`
  margin-right: 8px;
`;
const DogAge = styled.p`
  margin-left: 25px;
  font-size: 14px;
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
const MeetingInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: Right;
  text-align: center;
  font-size: 14px;
  margin: 5px 0;
`;
const DogImage = styled.div`
  position: relative;
  width: 40%;
  height: 140px;
  /* width: 45%; */
  /* padding-bottom: 50%; */
  /* overflow: hidden; */
`;
const Map = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  border-radius: 14px;
  left: 0;
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
const MeetingLocation = styled.div``;
export default All;
