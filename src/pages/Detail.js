import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 지도
import Map from "./Map";

// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const Detail = (props) => {
  const dispatch = useDispatch();

  // 포스트에 필요한 정보들 불러오기 준비
  const post_info = useSelector((state) => state.post?.list) || "";
  const postId = props.match.params.id;
  const post = post_info.filter((post) => post.id === Number(postId))[0];

  // 유저 정보
  const userImage = post.user_image;
  const userNickname = post.user_nickname;
  const userAge = post.user_age;
  const userGender = post.user_gender;
  //모집마감여부 넣어야함

  // 강아지 정보
  const dogImage = post.dog_image;
  const dogName = post.dog_name;
  const dogAge = post.dog_age;
  const dogSize = post.dog_size;
  const dogGender = post.dog_gender;
  const neutral = post.neutral;
  const dogBreed = post.dog_breed;
  const location = post.locationCategory;
  const meetingDate = post.meeting_date;

  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <>
      <Wrap>
        <DogImage src={dogImage} />
        <DataWrap>
          <UserWrap>
            <UserLeft>
              <UserImage src={userImage} />
              <UserData>
                <UserName>{userNickname}</UserName>
                <UserDetail>
                  {userAge}, {userGender}
                </UserDetail>
              </UserData>
            </UserLeft>
            <UserRight>
              <Completed>모집 마감</Completed>
              <Edit onClick={() => history.push(`/write/${postId}`)}>수정</Edit>
              <Delete onClick={deletePost}>삭제</Delete>
            </UserRight>
          </UserWrap>
          <DetailWrap>
            <DogDesc>
              <DogDetail>
                {dogName}, {dogAge}
              </DogDetail>
              <FilterWrap>
                <DogSize>{dogSize}</DogSize>
                <DogGender>{dogGender}</DogGender>
                <DogNeutral>{neutral === true ? "네" : "아니오"}</DogNeutral>
                <DogBreed>{dogBreed}</DogBreed>
              </FilterWrap>
            </DogDesc>
            <Line></Line>
            <TimeWrap>
              <Title>예약 시간</Title>
              <MeetingTime>{meetingDate}</MeetingTime>
            </TimeWrap>
            <Line></Line>
            <LocationWrap>
              <Title>예약 장소</Title>
              <MeetingLocation>{location}</MeetingLocation>
            </LocationWrap>
            <Line></Line>
            <MapWrap>
              <Map />
            </MapWrap>
          </DetailWrap>
        </DataWrap>
        <NavWrap>
          <NavBar>
            <Home
              onClick={() => {
                history.push("/");
              }}
            >
              홈
            </Home>
            <Chatting>채팅</Chatting>
            <MyPage
              onClick={() => {
                history.push("/myPage");
              }}
            >
              My
            </MyPage>
          </NavBar>
          <NavMap>지도</NavMap>
        </NavWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: relative;
  max-width: 390px;
  margin: 0 auto;
  font-size: 14px;
  text-align: center;
`;
const DogImage = styled.img`
  display: block;
  width: 100%;
  height: 422px;
`;
const DataWrap = styled.div`
  position: absolute;
  top: 240px;
  left: 0;
  width: 100%;
`;
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const UserLeft = styled.div`
  display: flex;
`;
const UserImage = styled.img`
  display: block;
  width: 64px;
  height: 64px;
  border: 1px solid #e6e6e6;
  border-radius: 32px;
`;
const UserData = styled.div`
  padding: 12px 0 0 12px;
`;
const UserName = styled.div``;
const UserDetail = styled.div``;
const UserRight = styled.div`
  padding-top: 12px;
`;
const Completed = styled.button`
  width: 76px;
  height: 40px;
  border: none;
  border-radius: 20px;
`;
const Edit = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 8px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
const Delete = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
const DetailWrap = styled.div`
  background-color: #ebebeb;
  border-radius: 30px 30px 0 0;
  padding: 20px 20px 140px 20px;
`;
const DogDesc = styled.div``;
const DogDetail = styled.div``;
const WishDesc = styled.div`
  margin: 8px 0 20px 0;
`;
const FilterWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const DogSize = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const DogGender = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const DogNeutral = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const DogBreed = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const Line = styled.span`
  display: block;
  width: 80px;
  border: 1px solid #dbdbdb;
  margin: 20px auto;
`;
const Title = styled.div`
  margin-bottom: 8px;
`;
const TimeWrap = styled.div``;
const MeetingTime = styled.div``;
const LocationWrap = styled.div``;
const MeetingLocation = styled.div``;
const MapWrap = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 20px;
`;
const NavWrap = styled.div`
  max-width: 390px;
  display: flex;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;
const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 274px;
  height: 60px;
  border-radius: 20px;
  background-color: #5c5c5c;
  margin-right: 12px;
`;
const Home = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
const Chatting = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
const MyPage = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
const NavMap = styled.button`
  width: 60px;
  height: 60px;
  color: #fff;
  border: none;
  border-radius: 30px;
  background-color: #5c5c5c;
  cursor: pointer;
`;

export default Detail;
