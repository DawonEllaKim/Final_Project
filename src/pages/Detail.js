// Detail.js - 각 산책 게시물에 대한 상세페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toilet,trash,water,dog } from "../components/MarkerList/MarkerList";
import { polygon1,polygon2,polygon3 } from "../components/MarkerList/PolygonList";
import { olympic,seoul,hangang } from "../components/MarkerList/ParkList";
//산책로리스트
import BlackMarker from '../image/toilet.png'
import trashMarker from '../image/trash.png'
import waterMarker from '../image/water.png'
import dogMarker from '../image/dog.png'
import { list1,list2,list3 } from "../components/MarkerList/RoadList";
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


const { kakao } = window;

const Detail = (props) => {
  const history = useHistory();
  const post = useSelector((state) => state.post.list);
  const [walk,setWalk] = useState(post.walk? post.walk:list1);
  const [start,setStart] = useState(post.start? post.start :olympic);
  useEffect(()=>{
    dispatch(postActions.getPostMD(postId));
  },[])
  const is_loading = useSelector((state) => state.post.is_loading);

  const get_id = localStorage.getItem("user_id");

  const postId = props.match.params.id;
  const dispatch = useDispatch();




 
   


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
  
  // 산책 정보
  const meetingDate = post.meetingDate;
  const completed = post.completed;
  const locationCategory = post.locationCategory;

  //산책로 찾기

 




  console.log(postId);
  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };


  
//  const walk = post.walk;
//  const start = post.start;
     
     
  useEffect(() => {
 
    let dott=   [
    ];
    for(let i=0;i<walk.length;i++)
    {
       dott[i]= new kakao.maps.LatLng(walk[i].Ma,walk[i].La)
    }

    let polygonPath1 = [ ];

    for (let i=0;i<polygon2.length;i++)
    {
        polygonPath1[i]= new kakao.maps.LatLng(polygon2[i].Ma,polygon2[i].La)
    }

    let polygonPath2 = [ ];

    for (let i=0;i<polygon1.length;i++)
    {
        polygonPath2[i]= new kakao.maps.LatLng(polygon1[i].Ma,polygon1[i].La)
    }
    
    let polygonPath3 = [ ];

    for (let i=0;i<polygon3.length;i++)
    {
        polygonPath3[i]= new kakao.maps.LatLng(polygon3[i].Ma,polygon3[i].La)
    }

    console.log(dott)
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(start.Ma, start.La), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

 

    
var clickLine // 마우스로 클릭한 좌표로 그려질 선 객체입니다
var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다  
var map = new kakao.maps.Map(mapContainer, mapOption); 

// new kakao.maps.Marker({
//     map: map, // 마커를 표시할 지도
//     position: new kakao.maps.LatLng(walk[0].Ma,walk[0].La), // 마커를 표시할 위치
//     // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다

    
// });
// new kakao.maps.Marker({
//     map: map, // 마커를 표시할 지도
//     position: new kakao.maps.LatLng(walk[walk.length-1].Ma,walk[walk.length-1].La), // 마커를 표시할 위치
//     // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다

    
// });
//쓰레기통
var imageSrc = trashMarker; 

for (let i = 0; i < trash.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(20, 20); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(trash[i].Ma,trash[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
    var iwContent = '<div style="font-size:3px;">쓰레기통:쓰레기는 쓰레기통에!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    var infowindow = new kakao.maps.InfoWindow({
        content : iwContent,
        removable : iwRemoveable
    });
    
    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'mouseover', function() {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);  
    });
    kakao.maps.event.addListener(marker, 'mouseout', function() {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.close(map, marker);  
    });
}

var imageSrc2 = waterMarker;
 
for (let i = 0; i < water.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize2 = new kakao.maps.Size(20, 20); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc2, imageSize2); 
    
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(water[i].Ma,water[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });

    var iwContent2 = '<div style="font-size:3px;">식수대:강아지에게 물을 주세요!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

// 인포윈도우를 생성합니다
var infowindow2 = new kakao.maps.InfoWindow({
content : iwContent2,
removable : iwRemoveable
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'mouseover', function() {
  // 마커 위에 인포윈도우를 표시합니다
  infowindow2.open(map, marker);  
});
kakao.maps.event.addListener(marker, 'mouseout', function() {
// 마커 위에 인포윈도우를 표시합니다
infowindow2.close(map, marker);  
});
}

var imageSrc3 = BlackMarker;
 
for (let i = 0; i < toilet.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize3 = new kakao.maps.Size(20, 20); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc3, imageSize3); 
    
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(toilet[i].Ma,toilet[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });

    var iwContent3 = '<div style="font-size:3px;">화장실: 강아지의 발을 닦아주세요!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

// 인포윈도우를 생성합니다
var infowindow3 = new kakao.maps.InfoWindow({
    content : iwContent3,
    removable : iwRemoveable
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'mouseover', function() {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow3.open(map, marker);  
});
kakao.maps.event.addListener(marker, 'mouseout', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow3.close(map, marker);  
});
}

var imageSrc4 = dogMarker;
 
for (let i = 0; i < dog.length; i ++) {

    // 마커 이미지의 이미지 크기 입니다
    var imageSize4 = new kakao.maps.Size(20, 20); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc4, imageSize4); 
    
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(dog[i].Ma,dog[i].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
        
    });
    var iwContent4 = '<div style="font-size:3px;">들판:강아지가 달리게 목줄을 풀어주세요! </div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwRemoveable = false; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

// 인포윈도우를 생성합니다
var infowindow4 = new kakao.maps.InfoWindow({
    content : iwContent4,
    removable : iwRemoveable
});

// 마커에 클릭이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'mouseover', function() {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow4.open(map, marker);  
});
kakao.maps.event.addListener(marker, 'mouseout', function() {
    // 마커 위에 인포윈도우를 표시합니다
    infowindow4.close(map, marker);  
});
}




// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다

clickLine = new kakao.maps.Polyline({
    map: map, // 선을 표시할 지도입니다 
    path:[dott],   
      // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
    strokeWeight: 3, // 선의 두께입니다 
    strokeColor: "red", // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
    strokeStyle: 'solid' // 선의 스타일입니다
});
 new kakao.maps.Polygon({
    path:polygonPath1, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: '#39DE2A', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'longdash', // 선의 스타일입니다
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7, // 채우기 불투명도 입니다
    map:map
});
new kakao.maps.Polygon({
    path:polygonPath2, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: '#39DE2A', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'longdash', // 선의 스타일입니다
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7, // 채우기 불투명도 입니다
    map:map
});
 new kakao.maps.Polygon({
    path:polygonPath3, // 그려질 다각형의 좌표 배열입니다
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: '#39DE2A', // 선의 색깔입니다
    strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'longdash', // 선의 스타일입니다
    fillColor: '#A2FF99', // 채우기 색깔입니다
    fillOpacity: 0.7, // 채우기 불투명도 입니다
    map:map
});
    
}, [walk,start])
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
            <MeetingLocation>{post.routeName}</MeetingLocation>
          </LocationWrap>
          <Line />

          {/* 지도 */}
          <MapWrap id="map">
        
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

const MapWrap = styled.div`
width: 350px;
height:500px;
box-sizing: border-box;
border-radius: 20px;
`;

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
