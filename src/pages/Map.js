/*global kakao*/
import React, { useEffect } from "react";
import styled from 'styled-components';

const Map = () => {
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.56737, 126.97471), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    // 지도를 생성한다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var MarkerList = [
      [37.56737, 126.97471, `<div style="padding: 5px">산책</div>`],
      [37.56512155806611, 126.98001100059243, `<div style="padding: 5px">산책</div>`],
    ];

    // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      console.log(
        "지도에서 클릭한 위치의 좌표는 " +
          mouseEvent.latLng.toString() +
          " 입니다."
      );
      const address = mouseEvent.latLng.toString();
      console.log(address)
      const realAddress = Number(
        address
          .slice(1)
          .slice(0, address.length - 2)
          .split(",")[0]
      );
      const realtwoAddress = Number(
        address
          .slice(1)
          .slice(0, address.length - 2)
          .split(",")[1]
      );

      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(realAddress, realtwoAddress), // 마커의 좌표
        map: map, // 마커를 표시할 지도 객체
      });

      MarkerList.push([
        realAddress,
        realtwoAddress,
        `<div style="padding: 5px">산책</div>`,
      ]);
      console.log(MarkerList);
    });

    // 지도에 마커를 생성하고 표시한다
    for (var i = 0; i < MarkerList.length; i++) {
      console.log(MarkerList[i][0]);
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(MarkerList[i][0], MarkerList[i][1]), // 마커의 좌표
        map: map, // 마커를 표시할 지도 객체
      });
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ 
          content : MarkerList[i][2] 
      });

      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      // infowindow.open(map, marker); 

      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
  
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
    function makeOverListener(map, marker, infowindow) {
      return function() {
          infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow) {
      return function() {
          infowindow.close();
      };
    }
    // 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
    kakao.maps.event.addListener(marker, "click", function () {
      alert("마커를 클릭했습니다!");
    });
  }, []);

  return (
    <div>
      <Wrap id="map" ></Wrap>
    </div>
  );
};

const Wrap = styled.div`
  width: 350px;
  height:400px;
  padding-bottom: 100%;
  box-sizing: border-box;
  border-radius: 20px;
`

export default Map;
