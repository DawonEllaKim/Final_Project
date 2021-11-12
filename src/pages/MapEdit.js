import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";

import DatePicker from "react-datepicker";
import { actionCreators as PostActions } from "../redux/modules/post";
import { actionCreators as postActions } from "../redux/modules/post";
import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "../elements/Button";
import backward from "../image/backward.png";
import notification from "../image/Notification.png";
import search from "../image/search.png";
import detailAddress from "../image/detailAddress.png";
import detailFilter from "../image/detailFilter.png";
import NavBar from "../components/NavBar";
const MapEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();


  const post = useSelector((state) => state.post.list);
  const count = post.dogCount
  const wish = post.wishDesc
  const moment = require('moment');

  // const meetingdate = useSelector((state) => state.post.list);
  // console.log(meetingdate)
  const newDate = localStorage.getItem("date")
  const newCount = localStorage.getItem("dogCount")
  console.log(newDate)

  const [startDate, setStartDate] = useState(new Date(moment(newDate).subtract(9,'h')._d)); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음
  console.log(new Date(startDate))
  const [wishDesc, setWishDesc] = useState(); //desc설명
  const [dogCount, setDogCount] = useState(newCount);
 
  useEffect(() => {
    dispatch(postActions.getPostMD(postId));
    setWishDesc(wish)
    setDogCount(Number(count))
  }, [wish,count]);

  const postId = props.match.params.id;
   
  const locationCategory =post.locationCategory
  const routeName = post.routeName
  console.log(post);
  





  let markerName = useSelector((state) => state.marker.marker);
  console.log(markerName)

  const handleChange = (event) => {
    setDogCount(event.target.value);
  };

  console.log(dogCount)

  const editLocationCategory = markerName.locationCategory
    ? markerName.locationCategory
    : post.locationCategory;
    const editTotalDistance = markerName.totalDistance
    ? markerName.totalDistance
    : post.totalDistance;
    const editTotalTime = markerName.totalTime
    ? markerName.totalTime
    : post.totalTime;
    const editRouteColor = markerName.routeColor
    ? markerName.routeColor
    : post.routeColor;
    const editRouteName = markerName.routeName
    ? markerName.routeName
    : post.routeName;
    const editStartLocationAddress = markerName.startLocationAddress
    ? markerName.startLocationAddress
    : post.startLocationAddress;
    const editEndLocationAddress = markerName.endLocationAddress
    ? markerName.endLocationAddress
    : post.endLocationAddress;

  console.log(
    editTotalTime,
    editTotalDistance,
    editRouteName,
    editRouteColor,
    editStartLocationAddress,
    editEndLocationAddress,
    editLocationCategory
  );


  const dateHandler = (date) => {
 setStartDate(date)
  };
  const wishHandler = (e) => {
    setWishDesc(e.target.value);
    console.log(e.target.value);
  };
  //지도 표시할 div
  console.log(post.mapedit_date);
  console.log(moment(startDate).subtract(9,'hours')._d);
  
  const editLocation = () => {

    const Info = {
      
     totalDistance: editTotalDistance,
     totalTime: editTotalTime,
     routeColor :editRouteColor,
     routeName : editRouteName,
     startLocationAddress: editStartLocationAddress,
     endLocationAddress: editEndLocationAddress,
      locationCategory: editLocationCategory,
      wishDesc: wishDesc,
      meetingDate: moment(startDate).add(9,'h')._d,
      completed: false,
      dogCount: dogCount,
    };
    console.log(Info)
    dispatch(PostActions.updatePostMD(postId, Info));
  };

  return (
    <Frame>
      {/* {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null } */}
      <InputArea>
      <TopWrap>
          <Button _onClick={() => history.goBack()}>
            <img src={backward} style={{ width: "10px", height: "18px" }} />
          </Button>
          <TopTitle>산책등록</TopTitle>
          <Button>
            <img src={notification} style={{ width: "24px", height: "24px" }} />
          </Button>
        </TopWrap>

        <SearchWrap>
          <WalkButton
            onClick={() => {
              history.push(`/editMapContainer3/${postId}`);
            }}
          >
            <img src={search} style={{ marginLeft: "4px" }} />
            <div style={{ marginLeft: "10px" }}>어디서 산책하실건가요? </div>
          </WalkButton>
        </SearchWrap>

        <div>
        <AdressWrap>
          <CircleDiv>
            <img src={detailAddress} />
          </CircleDiv>
          <Address>
       
            <Detail>{markerName.locationCategory?markerName.locationCategory:post.locationCategory}</Detail>
            <Detail>{markerName.routeName?markerName.routeName:post.routeName}</Detail>
          </Address>
        </AdressWrap>

        <AdressWrap>
          <CircleDiv>
            <img src={detailFilter} />
          </CircleDiv>
          <Address>
           
            <Detail>총{" "}{markerName.totalDistance?markerName.totalDistance:post.totalDistance}</Detail>
            <Detail>시간:{" "}{markerName.totalTime?markerName.totalTime:post.totalTime}</Detail>
          </Address>
        </AdressWrap>
        </div>

        <Title>산책 일시</Title>
     
          <DatePicker
            selected={startDate}
            onChange={dateHandler}
            timeInputLabel="Time:"
            showTimeInput
            inline
          />
        
        <Title>
        <CustomBox sx={{ minWidth: 120}}>
      <CustomFormControl fullWidth>
        <CustomInputLabel id="demo-simple-select-label">마리 수</CustomInputLabel>
        <CustomSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dogCount}
          label="마리 수"
          onChange={handleChange}
        >
          <MenuItem value={2}>2마리</MenuItem>
          <MenuItem value={3}>3마리</MenuItem>
          <MenuItem value={4}>4마리</MenuItem>
          <MenuItem value={5}>5마리</MenuItem>
          <MenuItem value={6}>6마리</MenuItem>
        </CustomSelect>
      </CustomFormControl>
    </CustomBox>
    </Title>
        <Title1>소개/유의사항</Title1>
       
          <TextArea defaultValue={wishDesc} onChange={wishHandler}></TextArea>
    
       
          <AddButton onClick={editLocation}>산책 수정</AddButton>
   
      </InputArea>
      <NavBar/>
    </Frame>
  );
};

export default MapEdit;
const Title1 = styled.div
`
box-sizing: border-box;
  height: 35px;
  font-size: 18px;
  line-height: 26px;
  margin: 80px 0 20px 0;
`
const CustomSelect =styled(Select)
`
border: 2px solid black;
  border-radius: 14px;
  display:flex;
  align-items: center;
  text-align:center;
`
const CustomInputLabel = styled(InputLabel)
`
display:flex;
align-items: center;
`;
const CustomFormControl = styled(FormControl)
`

`
const CustomBox = styled(Box)
`

`
const Frame = styled.div`
  max-width: 390px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  padding-bottom:100px;
 
  justify-content:center;
`;

const InputArea = styled.div`
  padding: 40px 20px;
  box-sizing: border-box;
  
`;

const TopWrap = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const TopTitle = styled.div`
  font-size: 18px;
  line-height: 52px;
`;

const SearchWrap = styled.div`
  width: 100%;
  height: 45px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

const WalkButton = styled.button`
  cursor: pointer;
  background: #ffffff;
  border-radius: 14px;
  text-align: left;
  width: 350px;
  height: 48px;
  display: flex;
  align-items: center;
  box-shadow:0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px gray;
`;

const AdressWrap = styled.div`
  width: 100%;
  height: 45px;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: flex-start;
  color: #000000;
  margin: 40px 0px;
`;

const CircleDiv = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;

`;
const Address = styled.div`
  margin-left: 15px;
  text-align: left;
  font-size: 12px;
`;
const Detail = styled.div`
  padding-top: 4px;
`;

const Title = styled.div`
  box-sizing: border-box;
  height: 35px;
  font-size: 18px;
  line-height: 26px;
  margin: 40px 0 20px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 138px;
  font-size: 14px;
  line-height: 20px;
  border:1px  gray;
  box-shadow:0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  color: #5f5f5f;
  padding: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  background-color:#F9F5C2;
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 164px;
  height: 48px;
  font-size: 16px;
  border-radius: 12px;
  background-color: transparent;
  border:1px  gray;
  box-shadow:0px 1px 4px rgba(0, 0, 0, 0.25);
`;

