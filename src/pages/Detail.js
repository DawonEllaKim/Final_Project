// Detail.js - 각 산책 게시물에 대한 상세페이지
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 컴포넌츠
import NavBar from "../components/NavBar";

// 리덕스
import { useHistory } from "react-router";
import { actionCreators as postActions } from "../redux/modules/post";
import Spinner from "../shared/Spinner";
import Button from "../elements/Button";

// 리액트 아이콘
import notification from "../image/Notification.png";
import backward from "../image/backward.png";

import MapEdit from "./MapEdit";
const { kakao } = window;

const Detail = (props) => {
  const history = useHistory();
  const is_loading = useSelector((state) => state.post.is_loading);

  const get_id = localStorage.getItem("user_id");

  const postId = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getPostMD(postId));
  }, [postId]);

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

  // 유저 정보
  const userImage = post.userImage;
  const userNickname = post.userNickname;
  const userAge = post.userAge;
  const userGender = post.userGender;
  console.log(userImage);

  // 강아지 정보
  const dogImage = post.dogImage;
  const dogName = post.dogName;
  const dogAge = post.dogAge;
  const dogSize = post.dogSize;
  const dogGender = post.dogGender;
  const neutral = post.neutral;
  const dogBreed = post.dogBreed;
  const dogComment = post.dogComment;
  const location = post.locationCategory;
  console.log(post.latitude, post.longitude);

  // 산책 정보
  const meetingDate = post.meetingDate;
  const completed = post.completed;
  console.log(post);

  console.log(postId);
  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  if (is_loading) {
    return <Spinner />;
  }
  return (
    <>
      {/* {post_info && ( */}
      <Wrap>
        {/* 뒤로가기 버튼 + 상세페이지 + 알람 */}
        <Header>
          <Button
            _onClick={() => {
              history.goBack();
            }}
          >
            <img src={backward} style={{ width: "10px", height: "18px" }} />
          </Button>
          <p>상세 페이지</p>
          <Button>
            <img src={notification} style={{ width: "24px", height: "24px" }} />
          </Button>
        </Header>

        {/* 게시물 올린 보호자의 정보 */}
        <UserWrap>
          {/* 보호자 사진, 닉네임, 나이대, 성별 */}
          <UserLeft>
            <UserImage src={userImage} />
            <UserData>
              <span>{userNickname}</span>
              <span style={{ color: " #5f5f5f" }}>
                {userAge}, {userGender}
              </span>
            </UserData>
          </UserLeft>

          {/* 마감 여부, 게시물 수정, 삭제버튼 */}
          <UserRight>
            {/* 모집 마감 데이터가 불린형으로 true이면 마감 false이면 진행중 */}
            <button>{completed ? "마감" : "진행중"}</button>
            {/* <Edit onClick={() => history.push(`/write/${postId}`)}>
              수정하기
            </Edit> */}
            {/* <Delete onClick={deletePost}>삭제</Delete> */}
          </UserRight>
        </UserWrap>

        {/* 강아지 사진 */}
        <DogImage src={dogImage} />

        {/* 산책 정보 */}

        <DetailWrap>
          {/* 강아지 정보 */}
          <DogWrap>
            {/* 강아지 이름, 강아지 나이, 강아지 소개 */}
            <DogInfo>
              <span>
                {dogName} / {dogAge}
              </span>
              <span
                style={{
                  color: "#5c5c5c",
                  fontWeight: "normal",
                  marginBottom: "12px",
                }}
              >
                {dogBreed}
              </span>
            </DogInfo>
            {/* 강아지 카테고리 모음 */}
            <DogCategory>
              <div>{dogSize}</div>
              <div>{dogGender === "남" ? "남아" : "여아"}</div>
              <div>{neutral === true ? "중성화O" : "중성화X"}</div>
            </DogCategory>
            <Comment>{dogComment}</Comment>
          </DogWrap>
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

          {/* 버튼 */}
          {get_id == post.user_id && (
            <FlexButton>
              <DeleteButton onClick={deletePost}>삭제하기</DeleteButton>
              <EditButton onClick={() => history.push(`/mapEdit/${postId}`)}>
                수정하기
              </EditButton>
            </FlexButton>
          )}
        </DetailWrap>

        {/* 고정 버튼들 */}
        <NavBar />
      </Wrap>
      {/* )} */}
    </>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  max-width: 390px;
  margin: auto;
  padding: 0 20px;

  font-size: 14px;
  text-align: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 52px;
  margin: 46px auto 18px auto;
  font-size: 18px;
`;
const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 48px;
  margin-bottom: 13px;
`;
const UserLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 48px;
`;
const UserImage = styled.img`
  /* position: relative; */
  width: 48px;
  height: 48px;
  margin-right: 17px;
  border-radius: 50%;
`;
const UserData = styled.div`
  /* position: relative; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  color: #000;
`;
const UserRight = styled.div`
  width: 76px;
  height: 40px;
  padding: 11px;
  button {
    width: 76px;
    height: 40px;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 20px;
    font-size: 14px;
  }
`;
const DogImage = styled.img`
  /* position: relative; */
  width: 352px;
  height: 230px;
  margin-bottom: 34px;
  border-radius: 20px;
  z-index: 10;
`;
const DetailWrap = styled.div``;

const DogWrap = styled.div`
  width: 100%;
  height: 160px;
`;
const DogInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
  font-size: 16px;
  color: #000;

  span {
    margin-bottom: 4px;
    font-weight: bold;
  }
`;
const DogCategory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 218px;
  height: 32px;
  margin: 0 auto 38px auto;

  div {
    width: 68px;
    height: 32px;
    margin-right: 7px;
    line-height: 32px;

    background-color: #9de8df;
    border: 2px solid #000;
    border-radius: 20px;
    font-size: 14px;
  }
`;
const Comment = styled.div`
  font-size: 16px;
`;
const Line = styled.hr`
  /* display: block; */
  width: 88px;
  border: 0.25px solid #000;
  margin: 26px auto;
`;
const Title = styled.div`
  margin-bottom: 8px;
`;
const TimeWrap = styled.div`
  font-size: 16px;
`;
const MeetingTime = styled.div`
  font-size: 16px;
`;
const LocationWrap = styled.div`
  font-size: 16px;
`;
const MeetingLocation = styled.div``;

const MapWrap = styled.div``;

const FlexButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 52px;
  margin: 30px auto 130px auto;

  button {
    width: 160px;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 2px solid #000;
    box-shadow: 0 4px 0px #000;
    cursor: pointer;
  }
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
  width: 350px;
  height: 207px;
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
export default Detail;
