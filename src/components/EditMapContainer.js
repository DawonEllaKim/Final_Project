
   
import React, {useEffect,useState} from 'react'
import styled from "styled-components";
import { useSelector,useDispatch } from 'react-redux';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { actionCreators as markerAction } from '../redux/modules/marker';
import BlackMarker from '../image/toilet.png'
import trashMarker from '../image/trash.png'
import waterMarker from '../image/water.png'
import dogMarker from '../image/dog.png'
import { distance1,distance2,distance3 } from '../components/MarkerList/DistanceList';
import { seoulDistance1, seoulDistance2, seoulDistance3 } from '../components/MarkerList/SeoulDistance';
import { hangang1,hangang2,hangang3 } from '../components/MarkerList/HangangList';
import { seoul1,seoul2,seoul3 } from '../components/MarkerList/SeoulList';
import { Han1,Han2,Han3 } from '../components/MarkerList/HangangDistance';
import { list1,list2,list3 } from '../components/MarkerList/RoadList';
import { polygon1,polygon2,polygon3 } from '../components/MarkerList/PolygonList';
import { trash, water,toilet, dog } from '../components/MarkerList/MarkerList';
import EditMarkerModal from "../components/EditMarkerModal";
import { GrDescend } from 'react-icons/gr';
const { kakao } = window;
const EditMapContainer = React.memo((props) => {
   
    // const dispatch =useDispatch();
    const [is_modal,setModal] = useState(false)
    const editId = props.match.params.id
    console.log(editId)
    const closeModal = () => {
        setModal(false);
      };
    const [distance,setDistance] = useState(distance1) //디스턴스정보
    const [walk,setWalk] = useState(list1);  //산책로 좌표정보
    const [road,setRoad] = useState();   //산책로이름
    const roadHandler = (name) => {    
      if(name==="list1")
      {
          setWalk(list1)
          setDistance(distance1)
      }
      if(name==="list2")
      {
          setWalk(list2)
          setDistance(distance2)
      }
      if(name==="list3")
      {
          setWalk(list3)
          setDistance(distance3)
          
      }  if(name==="seoul1")
      {
          setWalk(seoul1)
          setDistance(seoulDistance1)
      }
      if(name==="seoul2")
      {
          setWalk(seoul2)
          setDistance(seoulDistance2)
      }
      if(name==="seoul3")
      {
          setWalk(seoul3)
          setDistance(seoulDistance3)
          
      }
      if(name==="hangang1")
      {
          setWalk(hangang1)
          setDistance(Han1)
      }
      if(name==="hangang2")
      {
          setWalk(hangang2)
          setDistance(Han2)
      }
      if(name==="hangang3")
      {
          setWalk(hangang3)
          setDistance(Han3)
          
      }
      setRoad(name)   
    } 
    console.log(distance)
    const [check, setCheck] = useState();  //locationcategory
    const [start, setStart] = useState(
        {
          "La": 126.976826700157,
          "Ma": 37.57712223243067
        },
      )
    console.log(check)
    const checkHandler = (e) => {
        if(e.target.value=="서울숲")
          {
              setCheck(e.target.value)
              setStart(seoul)

          }
          if(e.target.value=="올림픽공원")
          {
              setCheck(e.target.value)
              setStart(olympic)

          }
          if(e.target.value=="반포한강공원")
          {
              setCheck(e.target.value)
              setStart(hangang[0])
          }
          if(e.target.value=="여의도한강공원")
          {
              setCheck(e.target.value)
              setStart(hangang[1])
          }
          if(e.target.value=="뚝섬한강공원")
          {
              setCheck(e.target.value)
              setStart(hangang[2])
          }
    }
    const olympic = 
    {
        "La": 127.12205323267196,
        "Ma": 37.51815414058323
      }
      
    const seoul = 
        {
          "La": 127.03998905765914,
          "Ma": 37.543456491543964
        }
      
    const hangang =[
        {
          "La": 126.99652764585831,
          "Ma": 37.510855950172676
        },
        {
          "La": 127.06992801191419,
          "Ma": 37.52928784143975
        },
        {
          "La": 126.93480367627295,
          "Ma": 37.526191102348754
        }
      ]
   
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
    
   let sp =new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(walk[0].Ma,walk[0].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    
        
    });
    var iwContent = `<div style="padding:5px;">출발점 :${distance.start}<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    position : iwPosition, 
    content : iwContent 
});
  
// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다


   let lp= new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(walk[walk.length-1].Ma,walk[walk.length-1].La), // 마커를 표시할 위치
        // title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
 
        
    });
    var iwContent2 = `<div style="padding:5px;">종점 :${distance.last}<br><a href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition2 = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다

// 인포윈도우를 생성합니다1
var infowindow2 = new kakao.maps.InfoWindow({

    content : iwContent2 
});
kakao.maps.event.addListener(lp,'mouseover',makeOverListener(map, lp,infowindow2)); 
kakao.maps.event.addListener(lp,'mouseout',makeOutListener(infowindow2)); 
kakao.maps.event.addListener(sp,'mouseover',makeOverListener(map, sp,infowindow)); 
kakao.maps.event.addListener(sp,'mouseout',makeOutListener(infowindow)); 
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
        strokeColor: distance.color, // 선의 색깔입니다
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
        
    }, [start,kakao,check,walk,distance])
    return (
        <Crap>
             <form onsubmit="searchPlaces(); return false;">
                <Box sx={{ minWidth: 300 }}>
                  <FormControl sx={{ width: 350 }}>
                    <NativeSelect
                      sx={{ width: 350 }}
                      defaultValue=""
                      value={check}
                      onChange={checkHandler}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value="">어디서 산책하실건가요?</option>
                      <option value="서울숲">서울숲</option>
                      <option value="올림픽공원">올림픽공원</option>
                      <option value="반포한강공원">반포 한강공원</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                </form>
               { 
                check=="올림픽공원"&&
                
                <div>
                     
                <form>
            <label>산책로A</label>
            <input type="radio" name="산책로A" value="list1" checked={road==="list1"} onClick={()=>roadHandler("list1")} />
            <label>산책로B</label>
            <input type="radio" name="산책로B" value="list2" checked={road==="list2"} onClick={()=>roadHandler("list2")} />
            <label>산책로C</label>
            <input type="radio" name="산책로C" value="list3" checked={road==="list3"} onClick={()=>roadHandler("list3")} />
             </form>
              {
                road=="list1" && <div>
                    거리:{distance1.distance}
                    <br/>
                   시간:{distance1.time}
                   <br/>
                   시작점:{distance1.start}
                   <br/>
                   종점:{distance1.last}
                    </div>
            }
             {
                road=="list2" && <div>
                    거리:{distance2.distance}
                    <br/>
                   시간:{distance2.time}
                   <br/>
                   시작점:{distance2.start}
                   <br/>
                   종점:{distance2.last}
                    </div>
            }
             {
                road=="list3" && <div>
                    거리:{distance3.distance}
                    <br/>
                   시간:{distance3.time}
                   <br/>
                   시작점:{distance3.start}
                   <br/>
                   종점:{distance3.last}
                    </div>
            }
            <button onClick={()=>setModal(true)} >산책로 등록</button>
            {is_modal ? (
          <EditMarkerModal
            close={closeModal}
            road={road}
            distance={distance}
            check={check}
            walk={walk}
            editId={editId}
          />
        ) : null}
            </div>
               } 

{ 
                check=="서울숲"&&
                
                <div>
                     
                <form>
            <label>산책로A</label>
            <input type="radio" name="산책로A" value="seoul1" checked={road==="seoul1"} onClick={()=>roadHandler("seoul1")} />
            <label>산책로B</label>
            <input type="radio" name="산책로B" value="seoul2" checked={road==="seoul2"} onClick={()=>roadHandler("seoul2")} />
            <label>산책로C</label>
            <input type="radio" name="산책로C" value="seoul3" checked={road==="seoul3"} onClick={()=>roadHandler("seoul3")} />
             </form>
              {
                road=="seoul1" && <div>
                    거리:{seoulDistance1.distance}
                    <br/>
                   시간:{seoulDistance1.time}
                   <br/>
                   시작점:{seoulDistance1.start}
                   <br/>
                   종점:{seoulDistance1.last}
                    </div>
            }
             {
                road=="seoul2" && <div>
                    거리:{seoulDistance2.distance}
                    <br/>
                   시간:{seoulDistance2.time}
                   <br/>
                   시작점:{seoulDistance2.start}
                   <br/>
                   종점:{seoulDistance2.last}
                    </div>
            }
             {
                road=="seoul3" && <div>
                    거리:{seoulDistance3.distance}
                    <br/>
                   시간:{seoulDistance3.time}
                   <br/>
                   시작점:{seoulDistance3.start}
                   <br/>
                   종점:{seoulDistance3.last}
                    </div>
            }
            <button onClick={()=>setModal(true)} >산책로 등록</button>
            {is_modal ? (
          <EditMarkerModal
            close={closeModal}
            road={road}
            distance={distance}
            check={check}
            walk={walk}
            editId={editId}
          />
        ) : null}
            </div>
               } 
               { 
                check=="반포한강공원"&&
                
                <div>
                     
                <form>
            <label>산책로A</label>
            <input type="radio" name="산책로A" value="hangang1" checked={road==="hangang1"} onClick={()=>roadHandler("hangang1")} />
            <label>산책로B</label>
            <input type="radio" name="산책로B" value="hangang2" checked={road==="hangang2"} onClick={()=>roadHandler("hangang2")} />
            <label>산책로C</label>
            <input type="radio" name="산책로C" value="hangang3" checked={road==="hangang3"} onClick={()=>roadHandler("hangang3")} />
             </form>
              {
                road=="hangang1" && <div>
                    거리:{Han1.distance}
                    <br/>
                   시간:{Han1.time}
                   <br/>
                   시작점:{Han1.start}
                   <br/>
                   종점:{Han1.last}
                    </div>
            }
             {
                road=="hangang2" && <div>
                    거리:{Han2.distance}
                    <br/>
                   시간:{Han2.time}
                   <br/>
                   시작점:{Han2.start}
                   <br/>
                   종점:{Han2.last}
                    </div>
            }
             {
                road=="hangang3" && <div>
                    거리:{Han3.distance}
                    <br/>
                   시간:{Han3.time}
                   <br/>
                   시작점:{Han3.start}
                   <br/>
                   종점:{Han3.last}
                    </div>
            }
            <button onClick={()=>setModal(true)} >산책로 등록</button>
            {is_modal ? (
          <EditMarkerModal
            close={closeModal}
            road={road}
            distance={distance}
            check={check}
            walk={walk}
            editId={editId}
          />
        ) : null}
            </div>
               } 
               

            <Wrap id="map"></Wrap>
            </Crap>
    )
})
const Crap = styled.div
`
width: 390px;
margin: 0 auto;
`
const Wrap = styled.div`
  width: 350px;
  height:500px;
  box-sizing: border-box;
  border-radius: 20px;
`;
const Filter = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 20px;
  text-align: left;
`;
const Title = styled.div`
  margin-bottom: 15px;
`;
const RadioWrap = styled.div``;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Label = styled.label`
  padding-top: 5px;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const UserAge = styled.input``;
export default EditMapContainer