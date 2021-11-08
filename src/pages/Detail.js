// Detail.js - 각 산책 게시물에 대한 상세페이지
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 컴포넌츠
import NavBar from "../components/NavBar";
// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

// 지도

// 리액트 아이콘
import { GrNotification } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";
const { kakao } = window;
const Detail = (props) => {
  const postId = props.match.params.id;
  const dispatch = useDispatch();

  const postId = props.match.params.id;
  console.log(postId);

  const post = useSelector((state) => state.post.list);
  const latitude = post.latitude;
  const longitude = post.longitude;
  useEffect(() => {
    // 지도를 표시할 div
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도를 열면 보이는 중심 좌표
        level: 3, // 지도 확대 레벨
      };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 생성
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude), // 마커 위치
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    // 상세 위치명이 들어 있는 인포윈도우
    var iwContent =
        '<div style="padding:5px; width:200px; line-height: 30px; border-radius: 20px">' +
        post.location_address +
        "</div>",
      iwPosition = new kakao.maps.LatLng(longitude, latitude); //인포윈도우 표시 위치입니다

    // 인포윈도우 생성
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시
    infowindow.open(map, marker);
  }, [latitude, longitude]);

  // 포스트에 필요한 정보들 불러오기 준비

  // 포스트에 필요한 정보들 불러오기 준비
  console.log(useSelector((state) => state));
  console.log(post);

  // 유저 정보
  const userImage = post.user_image;
  const userNickname = post.user_nickname;
  const userAge = post.user_age;
  const userGender = post.user_gender;
  console.log(userImage);

  // 강아지 정보
  const dogImage = post.dog_image;
  const dogName = post.dog_name;
  const dogAge = post.dog_age;
  const dogSize = post.dog_size;
  const dogGender = post.dog_gender;
  const neutral = post.neutral;
  const dogBreed = post.dog_breed;
  const dogComment = post.dog_comment;
  const location = post.location_category;
  console.log(post.latitude, post.longitude);
  // 산책 정보
  const meetingDate = post.meeting_date;
  const completed = post.completed;

  useEffect(() => {
    dispatch(postActions.getPostMD(postId));
  }, []);

  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  return (
    <>
      <Wrap>
        {/* 뒤로가기 버튼 + 상세페이지 + 알람 */}
        <Header>
          <span
            onClick={() => {
              history.goBack();
            }}
          >
            <IoIosArrowBack style={{ width: "20px", height: "20px" }} />
          </span>
          <p>상세 페이지</p>
          <span>
            <GrNotification style={{ width: "20px", height: "20px" }} />
          </span>
        </Header>

        {/* 게시물 올린 보호자의 정보 */}
        <UserWrap>
          {/* 보호자 사진, 닉네임, 나이대, 성별 */}
          <UserLeft>
            <UserImage src={userImage} />
            <UserData>
              <span>{userNickname}</span>
              <p>
                {userAge}, {userGender}
              </p>
            </UserData>
          </UserLeft>
          {/* 마감 여부, 게시물 수정, 삭제버튼 */}
          <UserRight>
            {/* 모집 마감 데이터가 불린형으로 true이면 마감 false이면 진행중 */}
            <Completed>{completed ? "마감" : "진행중"}</Completed>
            {/* <Edit onClick={() => history.push(`/write/${postId}`)}>
              수정하기
            </Edit> */}
            {/* <Delete onClick={deletePost}>삭제</Delete> */}
          </UserRight>
        </UserWrap>

        {/* 강아지 사진 */}
        <DogImage src={dogImage} />

        {/* 산책 정보 */}
        <DataWrap>
          <DetailWrap>
            {/* 강아지 정보 */}
            <div>
              {/* 강아지 이름, 강아지 나이, 강아지 소개 */}
              <DogInfo>
                <span>
                  {dogName}, {dogAge}
                </span>
                <p>{dogComment}</p>
              </DogInfo>
              {/* 강아지 카테고리 모음 */}
              <DogCategory>
                <div>{dogSize}</div>
                <div>
                  {dogGender === "남" ? <BsGenderMale /> : <BsGenderFemale />}
                </div>
                <div>{neutral === true ? "중성화O" : "중성화X"}</div>
                <div>{dogBreed}</div>
              </DogCategory>
            </div>
            <Line />

            {/* 예약 시간 */}
            <TimeWrap>
              <Title>예약 시간</Title>
              <MeetingTime>{meetingDate}</MeetingTime>
            </TimeWrap>
            <Line />

            {/* 예약 장소 */}
            <LocationWrap>
              <Title>예약 장소</Title>
              <MeetingLocation>{location}</MeetingLocation>
            </LocationWrap>
            <Line />

            {/* 지도 */}
            <MapWrap>
              <Map id="map" />
            </MapWrap>
            <FlexButton>
              <DeleteButton onClick={deletePost}>삭제하기</DeleteButton>
              <EditButton
                onClick={() => history.push(`/mapEdit/${post.post_id}`)}
              >
                수정하기
              </EditButton>
            </FlexButton>
          </DetailWrap>
        </DataWrap>

        {/* 고정 버튼들 */}
        <NavBar />
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
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 29px 33px 31px 39px;
  span {
    cursor: pointer;
  }
`;
const DataWrap = styled.div`
  position: relative;
  top: -100px;
  left: 0;
  width: 100%;
`;
const UserWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const UserLeft = styled.div`
  display: flex;
`;
const UserImage = styled.img`
  position: relative;
  width: 48px;
  height: 48px;
  margin-right: 15.5px;
  border-radius: 50%;
`;
const UserData = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  z-index: -1;
  p {
    color: #5f5f5f;
  }
`;
const UserRight = styled.div`
  width: 76px;
  height: 40px;
  padding: 11px;
`;
const Completed = styled.button`
  width: 76px;
  height: 40px;
  padding: 11px;
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
const DogImage = styled.img`
  position: relative;
  width: 341px;
  height: 230px;
  z-index: 10;
`;
const DetailWrap = styled.div`
  background-color: #ebebeb;
  border-radius: 30px 30px 0 0;
  padding: 20px 20px 140px 20px;
  z-index: -10;
`;
const DogDesc = styled.div``;
const DogInfo = styled.div`
  margin: 108px 0 27px 0;
  font-size: 16px;
  span {
    margin-bottom: 5px;
    font-weight: bold;
  }
`;
const DogCategory = styled.div`
  display: flex;
  justify-content: space-around;
  div {
    width: 63px;
    height: 32px;
    line-height: 32px;
    background-color: #c4c4c4;
    border-radius: 20px;
    font-size: 14px;
  }
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
const FlexButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;
const DeleteButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border-radius: 10px;
`;
const EditButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border-radius: 10px;
`;
const Map = styled.div`
  width: 100%;
  height: 600px;
`;
export default Detail;
