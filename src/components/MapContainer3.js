import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MapContainer3.css";
import styled from "styled-components";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import MarkerModal from "../components/MarkerModal";
const { kakao } = window;
const MapContainer3 = () => {
  const [check, setCheck] = useState();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [is_modal, setModal] = useState(false); //마커를 찍고 모달을 검색
  const [placename, setPlacename] = useState();

  useEffect(() => {
    var markers = [];

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      // var keyword = document.getElementById('keyword').value;

      // if (!keyword.replace(/^\s+|\s+$/g, '')) {
      //     alert('키워드를 입력해주세요!');
      //     return false;
      // }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(check, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        // displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      var listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        var marker = addMarker(placePosition, i);
        var itemEl = getListItem(i, places[i]);
        kakao.maps.event.addListener(marker, "click", function () {
          setLatitude(latitude);
          setLongitude(longitude);
          setPlacename(placename);

          console.log(latitude, longitude);
          setModal(true);
        });
        console.log(places[i]);
        const latitude = places[i].y;
        const longitude = places[i].x;
        const placename = places[i].place_name; // 검색 결과 항목 Element를 생성합니다
        console.log(placePosition);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다

        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement("div");
      // itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
      //             '<div class="info">' +
      //             '   <h5>' + places.place_name + '</h5>';

      // if (places.road_address_name) {
      //     itemStr += '    <span>' + places.road_address_name + '</span>' +
      //                 '   <span class="jibun gray">' +  places.address_name  + '</span>';
      // } else {
      //     itemStr += '    <span>' +  places.address_name  + '</span>';
      // }

      //   itemStr += '  <span class="tel">' + places.phone  + '</span>' +
      //             '</div>';

      // el.innerHTML = itemStr;
      // el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, [check]);

  const closeModal = () => {
    setModal(false);
  };
  return (
    <Crapper>
      <div
        id="map"
        style={{
          width: "390px",
          height: "600px",
        }}
      >
        <div id="menu_wrap" class="bg_white">
          <div class="option">
            <div>
              <form onsubmit="searchPlaces(); return false;">
                <Box sx={{ minWidth: 300 }}>
                  <FormControl sx={{ width: 300 }}>
                    <NativeSelect
                      sx={{ width: 300 }}
                      defaultValue=""
                      value={check}
                      onChange={(e) => {
                        setCheck(e.target.value);
                      }}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="">어디서 산책하실건가요?</option>
                      <option value="서울숲">서울숲</option>
                      <option value="올림픽공원">올림픽공원</option>
                      <option value="반포한강공원">반포 한강공원</option>
                      <option value="여의도한강공원">여의도 한강공원</option>
                      <option value="뚝섬한강공원">뚝섬 한강공원</option>
                      <option value="부산시민공원">부산 시민공원</option>
                      <option value="부산광안리해수욕장">
                        부산 광안리해수욕장
                      </option>
                      <option value="대구수성못">대구 수성못</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                {/* 키워드 <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}id="keyword" size="10"/> 
                    <button onClick={handleSubmit}>검색하기</button>  */}
              </form>
            </div>
          </div>
        </div>
        {is_modal ? (
          <MarkerModal
            close={closeModal}
            locationCategory={check}
            latitude={latitude}
            longitude={longitude}
            placename={placename}
          />
        ) : null}
      </div>

      <div id="placesList"></div>
      {/* <div id="pagination"></div> */}
    </Crapper>
  );
};

const Crapper = styled.div`
  margin: 0 auto;
  width: 390px;
  height: 600px;
`;

export default MapContainer3;
