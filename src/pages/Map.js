/*global kakao*/ 
import React, { useEffect } from 'react'



const Map=()=>{

  useEffect(()=>{
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		    mapOption = {
		        center: new kakao.maps.LatLng(37.56737, 126.97471), // 지도의 중심좌표
		        level: 3, // 지도의 확대 레벨
		        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
		    }; 

		// 지도를 생성한다 
		var map = new kakao.maps.Map(mapContainer, mapOption); 
        


       var MarkerList = [
           [37.56737, 126.97471, `<div style="padding: 5px">산책</div>`],
           [37.56512155806611, 126.98001100059243, `<div style="padding: 5px">산책</div>`],

       ]


		// 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
		kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
			console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
            const address= mouseEvent.latLng.toString();
            const realAddress = Number(address.slice(1).slice(0,address.length-2).split(',')[0]);
            const realtwoAddress = Number(address.slice(1).slice(0,address.length-2).split(',')[1]);
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(realAddress,realtwoAddress), // 마커의 좌표
                map: map // 마커를 표시할 지도 객체
            });
           console.log(realtwoAddress)
            MarkerList.push([realAddress,realtwoAddress,`<div style="padding: 5px">산책</div>`])
            console.log(MarkerList)
		});	

		// 지도에 마커를 생성하고 표시한다
        for(var i=0; i< MarkerList.length; i++)
        {   console.log(MarkerList[i][0])
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(MarkerList[i][0],MarkerList[i][1]), // 마커의 좌표
                map: map // 마커를 표시할 지도 객체
            });
    
        }
		
		// 마커에 클릭 이벤트를 등록한다 (우클릭 : rightclick)
		kakao.maps.event.addListener(marker, 'click', function() {
		    alert('마커를 클릭했습니다!');
		});
    }, [])


    return (
        <div>
        <div id="map" style={{width:"100px", height:"100px"}}></div>
       
        </div>
    )
}

export default Map;