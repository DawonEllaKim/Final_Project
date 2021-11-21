import React from "react";
import styled from "styled-components";

// import Card from "../Card";
import { history } from "../../redux/configureStore";
import male from "../../image/male.png";
import female from "../../image/female.png";

function All({ postList }) {
  return (
    <div>
      {postList.map((post, index) => {
        const dogImage = post.dogImage;
        const dogName = post.dogName;
        const dogGender = post.dogGender;
        const dogAge = post.dogAge;
        const dogComment = post.dogComment;
        const initialMeetingDate = post.meetingDate;

        return (
          <div
            post={post}
            key={index}
            onClick={() => history.push(`/posts/${post.postId}`)}
          >
            <CardWrap>
              {/* 카드 왼쪽 */}
              <CardInfo>
                <CardTop>
                  <DogPhoto src={dogImage} alt="dog" />
                  <p>{dogName + ", " + dogAge}</p>
                  <h4>{dogGender === "남" ? "a" : "d"}</h4>
                </CardTop>

                {/* <CardCenter>
                    <p>장소 : {post.locationCategory}</p>
                    <p>크기 : {post.dogSize}</p>
                    <p styoe={{ wordBreak: "keep-all" }}>{dogComment}</p>
                  </CardCenter>
                  <CardBottom>
                    {initialMeetingDate ? initialMeetingDate : ""}
                  </CardBottom> */}
              </CardInfo>
              {/* 카드 오른쪽 */}
              <div>Map</div>
            </CardWrap>
          </div>
        );
      })}
    </div>
  );
}

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* margin-bottom: 24px; */
  border-radius: 14px;
  background-color: #fff;
  /* color: #747474; */

  /* font-size: 14px;
  font-weight: 400;
  line-height: 20.27px; */
  cursor: pointer;

  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
`;
const CardInfo = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 164px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CardTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DogPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;
const CardCenter = styled.div`
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
const CardBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
`;
export default All;
