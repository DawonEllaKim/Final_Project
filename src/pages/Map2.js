import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";
import "../components/react-datepicker.css";
import DatePicker from "react-datepicker";
import { actionCreators as PostActions } from "../redux/modules/post";
import {FaSearch,FaMapMarkedAlt} from "react-icons/fa"
const Map2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const markerName = useSelector((state) => state.marker.marker);

  const [startDate, setStartDate] = useState(); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음
  const [wishDesc, setWishDesc] = useState(); //desc설명

  console.log(startDate);
  console.log(markerName)
  const SubmitLocation = () => {
    const Info = {
      longitude: markerName.longitude,
      latitude: markerName.latitude,
      location_address: markerName.placename,
      wish_desc: wishDesc,
      location_category: markerName.locationCategory,
      meeting_date: startDate,
      completed:false,
    };
    dispatch(PostActions.addPostMD(Info));
  };

  //지도 표시할 div

  return (
    <Frame>
      {/* {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null } */}
      <InputArea>
        <Text>산책로 설정</Text>
        <Text>
       
       <WalkButton
         onClick={() => {
           history.push("/MapContainer3");
         }}
       > <FaSearch style={{}} size="20"/>
           <div style={{marginLeft:"10px"}}>
           산책로를 수정하실건가요?{" "}
             </div>
          
       </WalkButton>
     </Text>

     <Text2> <CircleDiv><FaMapMarkedAlt/></CircleDiv>
        <Address>상세 주소: <div>{markerName.placename}</div>
        </Address>
        </Text2>

        <Text1>산책 일시</Text1>
        <Flex>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            inline
          />
        </Flex>
        <Text1>소개/유의사항</Text1>
        <Flex>
          <TextArea onChange={(e) => setWishDesc(e.target.value)}></TextArea>
        </Flex>
        <EndFlex>
          <Button onClick={SubmitLocation}>산책 등록</Button>
  
        </EndFlex>
      </InputArea>
    </Frame>
  );
};

export default Map2;
const Frame = styled.div`
  max-width: 390px;
  margin: 0 auto;
  text-align: center;
`;
const Button = styled.button`
  cursor: pointer;

  width: 132px;
height: 48px;
border-radius:12px;
`;
const WalkButton = styled.button`
  cursor: pointer;
  background: #FFFFFF; 
  border-radius: 14px;
  text-align:left;
  width:350px;
  height:48px;
  display:flex;
  align-items:center;
`;

const InputArea = styled.div`
  background: #e0e0e0;
  height: 800px;
  padding: 0px 20px;
`;

const Text = styled.div`
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
  margin-bottom: 10px;
`;
const Text1 = styled.div`
  width: 390px;
  height: 35px;
  position: relative;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Text2 = styled.div`
  width: 100%;
  height: 45px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  color: #000000;
  margin-bottom: 10px;
`;

const Flex = styled.div`
  width: 350px;
  display: inline;

  padding-top: 10px;
`;

const TextArea = styled.textarea`
  width: 313px;
  height: 138px;

  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  border-radius: 14px;
  color: #5f5f5f;
  padding: 10px;
  margin-bottom: 15px;
`;

const EndFlex = styled.div`
  padding: 0px 30px;
  display: inline;
`;

const CircleDiv = styled.div
`
display:flex;
width:48px;
height:48px;
border-radius:24px;
text-align:center;
align-items:center;
justify-content:center;
background-color:white;
`
const Address =styled.div
`
margin-left:15px;
text-align:left;
font-size:12px;

`
