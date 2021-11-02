import React,{useEffect,useState} from 'react'
import styled from 'styled-components';
import MarkerModal from '../components/MarkerModal';
import { useDispatch, useSelector } from 'react-redux';

const { kakao } = window
const MapContainer2 = ({location}) => {
    console.log(location)
    const dispatch = useDispatch();
    const normalMarker = useSelector((state) => state.marker.normal)
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [is_modal, setModal] = useState(false); //마커를 찍고 모달을 검색
   
    const options = {
        center: new kakao.maps.LatLng(location[0],location[1]),
        level: 6
    };
   
    useEffect(() => {
        const container = document.getElementById('map'); 
      
       const map = new kakao.maps.Map(container, options);
    //    setMap(map)
    
       var normalImageSrc = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png"
    
       //마커를 표시
    normalMarker.map((p,idx) => {
       var imageSize = new kakao.maps.Size(35,35);
       var markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize);
       const markers = new kakao.maps.Marker({
           map: map,
           position: new kakao. maps.LatLng(p.latitude, p.longitude),
           image: markerImage,
       });
    })
    
   

    const marker = new kakao.maps.Marker({
       position: map.getCenter(),
       map:map
    })


    const content = `
    <div style="background-color: red">
    상세위치를 표시해주세요!    
    </div>
    `
    const SubmitContent = `
    <div style="background-color: red">
    마커를 등록해주세요
    </div>
    `
   
    // 마커 위에 커스텀오버레이를 표시합니다
// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition()       
});
var overlay2 = new kakao.maps.CustomOverlay({
    content: SubmitContent,
    
    position: marker.getPosition()       
});

    //지도에 마커 클릭하면 표시
    kakao.maps.event.addListener(map, 'click', function(mouseEvent){
       const latlng = mouseEvent.latLng; //클릭한 위도, 정보를 가져옴
       
    
       //위도 경도 값을 useState를 써서 useEffect 밖으로 보내기
       setLatitude(latlng.getLat())
       setLongitude(latlng.getLng())
     
       //마커 위치를 클릭한 위치로 옮김
       marker.setPosition(latlng)
       overlay.setMap(null)
       //마커를 지도 상에 보여줌

        overlay2.setPosition(latlng)
        overlay2.setMap(map)
        
    //    overlay2 = new kakao.maps.CustomOverlay({
    //    content: SubmitContent,
    //     map: map,
    //     position: marker.getPosition(latlng)       
    // });
    
    })
  
    kakao.maps.event.addListener(marker, 'click', function(){
       setModal(true)
    } )
    }, [location] )
    
    const closeModal = () => {
    setModal(false)
    }
    
    return (
        <div>
             <Map id="map"location={location}>

</Map>
{is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null }
        </div>
    )
}
const Map = styled.div
`
width:390px;
height:200px;
margin: 0;



`

const Info = styled.div
`
background-color:white;

`


export default MapContainer2


