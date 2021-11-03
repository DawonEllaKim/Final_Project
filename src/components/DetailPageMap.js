// DetailPageMap.js - 게시물 상세 페이지에서 상세 위치를 보여주는 지도
import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const DetailPageMap = ({ post }) => {
  // 지금 포스트의 위도 경도
  const longitude = post.longitude.toString();
  const latitude = post.latitude.toString();

  useEffect(() => {
    // 지도를 표시할 div
    var mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(longitude, latitude), // 지도를 열면 보이는 중심 좌표
        level: 3, // 지도 확대 레벨
      };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 생성
    var marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(longitude, latitude), // 마커 위치
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

  return (
    <>
      <Map id="map"></Map>
    </>
  );
};

const Map = styled.div`
  width: 100%;
  height: 600px;
`;

export default DetailPageMap;
