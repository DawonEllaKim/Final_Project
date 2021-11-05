import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { actionCreators as PostActions } from "../redux/modules/post";
import { actionCreators as postActions } from "../redux/modules/post";
const MapEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();


  // useSelecotr, dispatch, 리덕스
  const postId= props.match.params.id;
  useEffect(() => {
    dispatch(postActions.getMapMD(postId));
    setWishDesc(wish_desc)
    setStartDate(meeting_date)
  }, []);
  const post = useSelector((state)=>state.post.list)
 const location_address = post.location_address;
 const meeting_date = post.meeting_date;
 const wish_desc= post.wish_desc;
 const markerName = useSelector((state) => state.marker.marker);

 const [startDate, setStartDate] = useState(); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음
 const [wishDesc, setWishDesc] = useState(wish_desc); //desc설명
 
 const editLongitude = (markerName.longitude ? markerName.longitude: post.longitude)
 const editLatitude = (markerName.latitude ? markerName.latitude: post.latitude)
 const editLocationaddress = (markerName.placename ? markerName.placename: post.location_address)
 const editLocationCategory = (markerName.locationCategory ? markerName.locationCategory : post.location_category)
 console.log(editLongitude,editLatitude,editLocationaddress,editLocationCategory)

  const editLocation = () => {
    const Info = {
      longitude: editLongitude,
      latitude: editLatitude,
      location_address: editLocationaddress,
      wish_desc: wishDesc,
      location_category: editLocationCategory,
      meeting_date: startDate,
      completed:false,
    };
    dispatch(PostActions.updatePostMD(postId,Info));
  };
 
  const dateHandler = (date) => {
    if(date)
    setStartDate(date)
    else
    setStartDate(meeting_date)
  }
  const wishHandler = (e) => {
      if(e.target.value)
      setWishDesc(e.target.value)
      else
      setWishDesc(wish_desc)
  }
  //지도 표시할 div
  console.log(meeting_date)
   console.log(startDate)
  return (
    <Frame>
      {/* {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null } */}
      <InputArea>
        <Text>산책로 설정</Text>
        <Text>
          산책로를 수정하실건가요?{" "}
          <Button
            onClick={() => {
              history.push("/MapContainer3");
            }}
          >
            산책로 수정
          </Button>
        </Text>

        <Text>상세 주소: {markerName.placename?markerName.placename:location_address}</Text>

        <Text1>산책 일시</Text1>
        <Flex>
          <DatePicker
            selected={startDate}
            onChange={dateHandler}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            inline
          />
        </Flex>
        <Text1>소개/유의사항</Text1>
        <Flex>
          <TextArea value={wishDesc ? wishDesc : wish_desc} onChange={wishHandler}></TextArea>
        </Flex>
        <EndFlex>
          <Button onClick={editLocation}>산책 등록</Button>
          <Button>산책 취소</Button>
        </EndFlex>
      </InputArea>
    </Frame>
  );
};

export default MapEdit;
const Frame = styled.div`
  max-width: 390px;
  margin: 0 auto;
  text-align: center;
`;
const Button = styled.button`
  cursor: pointer;
  margin: 30px;
`;

const InputArea = styled.div`
  background: #e0e0e0;
  height: 800px;
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

const Flex = styled.div`
  width: 100%;
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
