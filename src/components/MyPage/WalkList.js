import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/post";

// 이미지+아이콘
import { history } from "../../redux/configureStore";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import OlympicMap from "../../image/OlympicMap.png";
import SeoulMap from "../../image/SeoulMap.png";
import BanpoMap from "../../image/BanpoMap.png";

const WalkList = ({ post, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.myList); // 나의 산책 게시물 리스트

  useEffect(() => {
    dispatch(postActions.getMyPostMD(userId)); // 나의 산책 게시물 불러오기
  }, []);

  return (
    <Wrap>
      {/* 해당 페이지 소유자가 등록된 산책이 없다면 삼항연산자로 문구 보여주기 */}
      <Cards>
        {postList.length < 1 ? (
          <NoCard>등록된 산책 목록이 없습니다.</NoCard>
        ) : (
          <div>
            {postList.map((post, index) => {
              const dogImage = post.dogImage;
              const dogName = post.dogName;
              const dogGender = post.dogGender;
              const dogAge = post.dogAge;
              const initialMeetingDate = post.meetingDate;

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
                          style={{
                            width: "25px",
                            height: "25px",
                            color: "#FF5656",
                          }}
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
                        <p style={{ marginLeft: "10px" }}>
                          {initialMeetingDate}
                        </p>
                      </MeetingInfo>
                    </CardBottom>
                  </Left>
                  {/* 카드 오른쪽 */}
                  <Map src={map()} />
                </CardWrap>
              );
            })}
          </div>
        )}
      </Cards>
      <NavBar />

    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
const Cards = styled.div``
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
const NoCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 20px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  /* border: 1px solid pink; */
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

export default WalkList;
