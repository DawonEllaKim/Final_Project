// Detail.js - 각 산책 게시물에 대한 상세페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

// 컴포넌츠
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import { toilet, trash, water, dog } from "../components/MarkerList/MarkerList";
import {
  polygon1,
  polygon2,
  polygon3,
} from "../components/MarkerList/PolygonList";
import { olympic, seoul, hangang } from "../components/MarkerList/ParkList";
import { list1, list2, list3 } from "../components/MarkerList/RoadList";
import Spinner from "../shared/Spinner";

// 리덕스
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as chatActions } from "../redux/modules/chat";

// 아이콘 + 이미지
import { BsCalendarCheck } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { RiPinDistanceFill } from "react-icons/ri";
import { FaDog } from "react-icons/fa";
import startMarker from "../image/end.png";
import endMarker from "../image/start.png";

// 마커 이미지
import BlackMarker from "../image/toil.png";
import trashMarker from "../image/tra.png";
import waterMarker from "../image/water-tap.png";
import dogMarker from "../image/DogRun.png";

// 카카오맵
const { kakao } = window;

const Detail = (props) => {
  const [alreadySubmit, setAlreadySubmit] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state.post.list);
  const postId = props.match.params.id;
  const dog = localStorage.getItem("checkDog")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(postActions.getPostMD(postId));
    setWalk(post.walk ? post.walk : list1);
    setStart(post.start ? post.start : olympic);
  }, [post.walk, post.start]);

  const [walk, setWalk] = useState(post.walk ? post.walk : list1);
  const [start, setStart] = useState(post.start ? post.start : olympic);
  const is_loading = useSelector((state) => state.post.is_loading);

  const get_id = localStorage.getItem("userId");

  // 유저 정보
  const userImage = post.userImage;
  const userNickname = post.userNickname;
  const userAge = post.userAge;
  const userGender = post.userGender;
  const userId = post.userId;
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
  const dogCo = post.dogCount;
  const wishDesc = post.wishDesc;

  // 산책 정보
  const meetingDate = post.meetingDate;
  const completed = post.completed;
  const locationCategory = post.locationCategory;

  //산책로 찾기
  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  const repeat = useSelector((state) => state.chat.alreadySubmit);
  console.log(repeat);
  useEffect(() => {
    let dott = [];
    for (let i = 0; i < walk.length; i++) {
      dott[i] = new kakao.maps.LatLng(walk[i].Ma, walk[i].La);
    }

    let polygonPath1 = [];

    for (let i = 0; i < polygon2.length; i++) {
      polygonPath1[i] = new kakao.maps.LatLng(polygon2[i].Ma, polygon2[i].La);
    }

    let polygonPath2 = [];

    for (let i = 0; i < polygon1.length; i++) {
      polygonPath2[i] = new kakao.maps.LatLng(polygon1[i].Ma, polygon1[i].La);
    }

    let polygonPath3 = [];

    for (let i = 0; i < polygon3.length; i++) {
      polygonPath3[i] = new kakao.maps.LatLng(polygon3[i].Ma, polygon3[i].La);
    }

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(start.Ma, start.La), // 지도의 중심좌표
        level: 6, // 지도의 확대 레벨
      };

    var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
    var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var imageSrc5 = startMarker;
    var imageSize5 = new kakao.maps.Size(30, 30);

    // 마커 이미지를 생성합니다
    var markerImage5 = new kakao.maps.MarkerImage(imageSrc5, imageSize5);
    let sp = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(walk[0].Ma, walk[0].La),
      image: markerImage5, // 마커를 표시할 위치
      // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    });
    var iwContent = `<div style="padding:5px;">출발점 :${post.startLocationAddress}<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    var imageSrc6 = endMarker;
    var imageSize6 = new kakao.maps.Size(30, 30);

    // 마커 이미지를 생성합니다
    var markerImage6 = new kakao.maps.MarkerImage(imageSrc6, imageSize6);

    let lp = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: new kakao.maps.LatLng(
        walk[walk.length - 1].Ma,
        walk[walk.length - 1].La
      ), // 마커를 표시할 위치
      // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      image: markerImage6,
    });
    var iwContent2 = `<div style="padding:5px;">종점 :${post.endLocationAddress}<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition2 = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다1
    var infowindow2 = new kakao.maps.InfoWindow({
      content: iwContent2,
    });
    kakao.maps.event.addListener(
      lp,
      "mouseover",
      makeOverListener(map, lp, infowindow2)
    );
    kakao.maps.event.addListener(lp, "mouseout", makeOutListener(infowindow2));
    kakao.maps.event.addListener(
      sp,
      "mouseover",
      makeOverListener(map, sp, infowindow)
    );
    kakao.maps.event.addListener(sp, "mouseout", makeOutListener(infowindow));
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
    //쓰레기통
    var imageSrc = trashMarker;

    for (let i = 0; i < trash.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(14, 14);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(trash[i].Ma, trash[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      var iwContent =
          '<div style="font-size:3px;">쓰레기통:쓰레기는 쓰레기통에!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.close(map, marker);
      });
    }

    var imageSrc2 = waterMarker;

    for (let i = 0; i < water.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize2 = new kakao.maps.Size(14, 14);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc2, imageSize2);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(water[i].Ma, water[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      var iwContent2 =
          '<div style="font-size:3px;">식수대:강아지에게 물을 주세요!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성합니다
      var infowindow2 = new kakao.maps.InfoWindow({
        content: iwContent2,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow2.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow2.close(map, marker);
      });
    }

    var imageSrc3 = BlackMarker;

    for (let i = 0; i < toilet.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize3 = new kakao.maps.Size(14, 14);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc3, imageSize3);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(toilet[i].Ma, toilet[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      var iwContent3 =
          '<div style="font-size:3px;">화장실: 강아지의 발을 닦아주세요!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성합니다
      var infowindow3 = new kakao.maps.InfoWindow({
        content: iwContent3,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow3.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow3.close(map, marker);
      });
    }

    var imageSrc4 = dogMarker;

    for (let i = 0; i < dog.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize4 = new kakao.maps.Size(14, 14);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc4, imageSize4);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(dog[i].Ma, dog[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      var iwContent4 =
          '<div style="font-size:3px;">들판:강아지가 달리게 목줄을 풀어주세요! </div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 인포윈도우를 생성합니다
      var infowindow4 = new kakao.maps.InfoWindow({
        content: iwContent4,
        removable: iwRemoveable,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow4.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow4.close(map, marker);
      });
    }

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다

    clickLine = new kakao.maps.Polyline({
      map: map, // 선을 표시할 지도입니다
      path: [dott],
      // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: post.routeColor, // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });
    new kakao.maps.Polygon({
      path: polygonPath1, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#39DE2A", // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "longdash", // 선의 스타일입니다
      fillColor: "#A2FF99", // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: map,
    });
    new kakao.maps.Polygon({
      path: polygonPath2, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#39DE2A", // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "longdash", // 선의 스타일입니다
      fillColor: "#A2FF99", // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: map,
    });
    new kakao.maps.Polygon({
      path: polygonPath3, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#39DE2A", // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "longdash", // 선의 스타일입니다
      fillColor: "#A2FF99", // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: map,
    });
    dispatch(chatActions.alreadySubmit());
    setAlreadySubmit(repeat);
  }, [walk, start]);
  console.log(alreadySubmit);
  console.log(useSelector((state) => state));
  return (
    <>
      <Wrap>
        <TopBar>산책 정보</TopBar>
        {/* 게시물 올린 보호자의 정보 */}
        <UserWrap>
          {/* 보호자 사진, 닉네임, 나이대, 성별 */}
          <UserLeft
            onClick={() => {
              history.push(`/mypage/${post.userId}`);
            }}
          >
            <UserImage src={userImage} />
            <UserData>
              <span>{userNickname}</span>
              <span style={{ color: " #5f5f5f" }}>
                {userAge}, {userGender}
              </span>
            </UserData>
          </UserLeft>

          <UserRight>
            <button>{completed ? "마감" : "진행중"}</button>
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
              <DogName>
                {dogName} / {dogAge}
              </DogName>
              <DogBreed>{dogBreed}</DogBreed>
              <Comment>{dogComment}</Comment>
            </DogInfo>

            {/* 강아지 카테고리 모음 */}
            <DogCategory>
              <div>{dogSize}</div>
              <div>{dogGender === "남" ? "남아" : "여아"}</div>
              <div>{neutral === "true" ? "중성화 O" : "중성화 X"}</div>
            </DogCategory>
          </DogWrap>

          {/* 예약 시간 */}
          <TimeWrap>
            <Box>
              <RedIcon>
                <BsCalendarCheck
                  style={{
                    color: "#fff",
                    width: "24px",
                    height: "24px",
                    fontWeight: "bold",
                  }}
                />
              </RedIcon>
              <BoxDiv>
                <MeetingTime>{meetingDate}</MeetingTime>
                <MeetingLocation>
                  {location} {post.routeName}
                </MeetingLocation>
              </BoxDiv>
            </Box>

            <Box>
              <RedIcon>
                <RiPinDistanceFill
                  style={{
                    color: "#fff",
                    width: "24px",
                    height: "24px",
                    fontWeight: "bold",
                  }}
                />
              </RedIcon>
              <BoxDiv>
                <div>출발: {post.startLocationAddress}</div>
                <div>도착: {post.endLocationAddress}</div>
                <div>
                  총 {post.totalDistance}, {post.totalTime} 코스
                </div>
              </BoxDiv>
            </Box>

            <Box>
              <RedIcon>
                <FaDog
                  style={{
                    color: "#fff",
                    width: "24px",
                    height: "24px",
                    fontWeight: "bold",
                  }}
                />
              </RedIcon>
              <BoxDiv>
                <Title>모집 강아지 수</Title>
                <MeetingLocation>{dogCo + "마리"}</MeetingLocation>
              </BoxDiv>
            </Box>

            <Box>
              <RedIcon>
                <BiEditAlt
                  style={{
                    color: "#fff",
                    width: "24px",
                    height: "24px",
                    fontWeight: "bold",
                  }}
                />
              </RedIcon>
              <BoxDiv>
                <Title>소개/유의사항</Title>
                <MeetingLocation>{wishDesc}</MeetingLocation>
              </BoxDiv>
            </Box>
          </TimeWrap>

          {/* 지도 */}
          <MapWrap id="map"></MapWrap>

          {/* 버튼 */}
          {
            
               dog!="false"&&
          (get_id == post.userId ? (
            <FlexButton>
              <DeleteButton onClick={deletePost}>삭제하기</DeleteButton>
              <EditButton onClick={() => history.push(`/mapEdit/${postId}`)}>
                수정하기
              </EditButton>
            </FlexButton>
          ) : (
            <FlexButton>
              {alreadySubmit === true || repeat == "already" ? (
                <EditButton  onClick={() => {
                  dispatch(chatActions.sendNotificationMD(userId, 2, postId));
                }} style={{ color: "black" }}>
                  이미 신청되었습니다.
                </EditButton>
              ) : (
                <EditButton
                  onClick={() => {
                    dispatch(chatActions.sendNotificationMD(userId, 2, postId));
                  }}
                >
                  산책 신청하기
                </EditButton>
              )}
              <DeleteButton
                onClick={() => {
                  history.push(`/chatwrite/${post.userId}`);
                }}
              >
                쪽지하기
              </DeleteButton>
            </FlexButton>
          ))
              }
        </DetailWrap>

        {/* 고정 버튼들 */}
      </Wrap>
      <NavBar />
    </>
  );
};
const Wrap = styled.div`
  box-sizing: border-box;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 0 5%;

  font-size: 14px;
  text-align: center;
`;
const UserWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-bottom: 20px;
`;
const UserLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 48px;
  cursor: pointer;
`;
const UserImage = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 17px;
  border-radius: 50%;
  object-fit: cover;
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

  display: flex;
  align-items: center;
  button {
    width: 76px;
    height: 40px;
    background-color: #ff5656;
    border: 1px gray;
    border-radius: 20px;
    font-size: 14px;
  }
`;
const DogImage = styled.img`
  /* position: relative; */
  width: 100%;
  aspect-ratio: 4/2.5;
  margin-bottom: 20px;
  border-radius: 14px;
  /* z-index: 10; */
  object-fit: cover;
`;
const DetailWrap = styled.div`
  width: 100%;
`;
const DogWrap = styled.div`
  width: 100%;
  height: 160px;
  margin-bottom: 25px;
`;
const DogInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;

  color: #000;
`;
const DogName = styled.span`
  margin-bottom: 2px;
  font-size: 20px;
`;
const DogBreed = styled.span`
  color: #5c5c5c;
  margin-bottom: 2px;
  font-weight: normal;
  font-size: 16px;
`;
const Comment = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
`;

const DogCategory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;

  div {
    width: 25%;
    height: 32px;
    /* margin: 0 10px; */
    line-height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px gray;
    border-radius: 20px;
    font-size: 14px;
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
  }
`;
const Title = styled.div`
  margin-bottom: 8px;
  color: #5c5c5c;
`;
const TimeWrap = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-bottom: 29px;
`;

const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: left;
  width: calc(100% - 48px);
`;
const RedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: #ff5656;
  border-radius: 50%;
  margin-right: 25px;
`;
const MeetingTime = styled.div`
  font-size: 16px;
`;
const MeetingLocation = styled.div`
  word-break: break-all;
`;
const MapWrap = styled.div`
  width: 90%;
  height: 300px;
  margin: auto;
  box-sizing: border-box;
  border-radius: 20px;
`;

const FlexButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  margin: 30px auto 0 auto;

  button {
    width: 40%;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 1px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    margin: 0 10px;
  }
`;
const DeleteButton = styled.button`
  cursor: pointer;
  width: 25%px;
  height: 48px;
  border-radius: 10px;
  border: 1px gray;
`;
const EditButton = styled.button`
  cursor: pointer;
  width: 25%px;
  height: 48px;
  border-radius: 10px;
  border: 1px gray;
`;

export default Detail;
