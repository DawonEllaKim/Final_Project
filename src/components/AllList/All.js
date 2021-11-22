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
            <Left>
              <CardTop>
                <DogPhoto src={dogImage} alt="dog" />
                <DogInfo>{dogName + ", " + dogAge}</DogInfo>
                <h4>
                  {dogGender === "남" ? (
                    <IoMdMale
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#89B1FF",
                      }}
                    />
                  ) : (
                    <IoMdFemale />
                  )}
                </h4>
              </CardTop>

              <CardBottom>
                <MeetingInfo>
                  <MdLocationPin
                    style={{ width: "25px", height: "25px", color: "#FF5656" }}
                  />
                  <p>{post.locationCategory}</p>
                </MeetingInfo>

                <MeetingInfo>
                  <FaRegClock
                    style={{
                      width: "20px",
                      height: "20px",
                      marignLeft: "100px",
                      // border: "1px solid red",
                    }}
                  />
                  <p style={{ marginLeft: "10px" }}>{initialMeetingDate}</p>
                </MeetingInfo>
              </CardBottom>
            </Left>
            {/* 카드 오른쪽 */}
            <Map src={map()} />
          </CardWrap>
        );
      })}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
`;
const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 25px;
  margin-bottom: 20px;
  border-radius: 14px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;
const CardTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  line-height: 23px;
`;
const DogPhoto = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
`;
const DogInfo = styled.p`
  margin-right: 8px;
`;
const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  font-size: 14px;
  line-height: 1.4;
  width: 100%;
  padding: 8px 8px 0 0;
  box-sizing: border-box;
`;
const MeetingInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  text-align: center;
  font-size: 16px;
  margin: 5px 0;
`;

const Map = styled.img`
  width: 124px;
  height: 124px;
  border-radius: 14px;
`;
export default All;
