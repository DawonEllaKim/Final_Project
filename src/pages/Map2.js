import React, {useState, useEffect, forwardRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import DatePicker from "react-datepicker"
import { actionCreators as PostActions } from '../redux/modules/post';
const Map2 = (props) => {
   const history = useHistory();
    const dispatch = useDispatch();
    const markerName = useSelector((state)=>state.marker.marker)
   
    const [startDate, setStartDate] = useState();  //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음
    const [wishDesc,setWishDesc] = useState(); //desc설명
    
    console.log(startDate)

    
    const SubmitLocation = () => {
        const Info = {
            longtitude: markerName.longtitude,
            latitude: markerName.latitude,
            location_address: markerName.placename,
            wish_Desc: wishDesc,
            locationCategory: markerName.locationCategory,
            meetingTime: startDate,

        }
        dispatch(PostActions.addPostMD(Info))
    }

    
    
    
    //지도 표시할 div

    return (
        <Frame>
       


{/* {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null } */}
<InputArea>
 <Text>
     산책로 설정
 </Text>
 <Text>
   어디서 산책하실건가요? <Button onClick={()=>{history.push("/MapContainer3")}}>산책로 등록</Button>
    </Text>
    
    <Text>
    상세 주소: {markerName.placename}
      </Text>

    <Text1>
        산책 일시
        
    </Text1>
  <Flex>
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    timeInputLabel="Time:"
    dateFormat="MM/dd/yyyy h:mm aa"
    showTimeInput
   inline
  />
      </Flex>
    <Text1>
        소개/유의사항
        </Text1>
      <Flex>
        <TextArea onChange={(e)=>setWishDesc(e.target.value)}>
           
        </TextArea>
        </Flex>
     <EndFlex>
         <Button onClick={SubmitLocation}>산책 등록</Button>
         <Button>산책 취소</Button>
     </EndFlex>
</InputArea>
        </Frame>
           

    )
}

export default Map2
const Frame = styled.div    
`
max-width:390px;
margin: 0 auto;
text-align:center;
`
const Button = styled.button
`
cursor:pointer;
margin:30px;
`

const InputArea = styled.div
`
background: #E0E0E0;
height:800px;

`

const Text = styled.div
`

width: 100%;
height: 45px;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 18px;
display: flex;
align-items: center;
text-align: center;
justify-content: center;
color: #000000;
margin-bottom:10px;

`
const Text1= styled.div
`

width: 390px;
height: 35px;
position:relative;
font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 26px;
display: flex;
align-items: center;
text-align: center;
justify-content:center; 
margin-bottom:10px;
`


const Flex= styled.div
`
width:100%;
display:inline;

padding-top:10px;
`

const TextArea= styled.textarea
`
width: 313px;
height: 138px;

font-family: Noto Sans KR;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
border-radius: 14px;
color: #5F5F5F;
padding:10px;
margin-bottom:15px;
`

const EndFlex = styled.div
`
padding:0px 30px;
display:inline;
`