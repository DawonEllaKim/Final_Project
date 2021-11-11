import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";
import "../components/react-datepicker.css";
import DatePicker from "react-datepicker";
import { actionCreators as PostActions } from "../redux/modules/post";
import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// 버튼 이미지
import Button from "../elements/Button";
import backward from "../image/backward.png";
import notification from "../image/Notification.png";
import search from "../image/search.png";
import map from "../image/map.png";
import { distance1 } from "../components/MarkerList/DistanceList";

const Map2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const markerName = useSelector((state) => state.marker.marker);

  const [startDate, setStartDate] = useState(); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음
  const [wishDesc, setWishDesc] = useState(); //desc설명
  const [dogCount, setDogCount] = React.useState('');

  const handleChange = (event) => {
    setDogCount(event.target.value);
  };

  
  console.log(startDate);
  console.log(markerName);
  const SubmitLocation = () => {
    const Info = {
      totalDistance: markerName.totalDistance,
      totalTime : markerName.totalTime,
      routeColor: markerName.routeColor,
      routeName : markerName.routeName,
      startLocationAddress: markerName.startLocationAddress,
      endLocationAddress: markerName.endLocationAddress,
      locationAddress: markerName.placename,
      locationCategory: markerName.locationCategory,
      coordinate: markerName.coordinate,
      wishDesc: wishDesc,
      meetingDate: startDate,
      completed: false,
      dogCount: dogCount,
    };
    dispatch(PostActions.addPostMD(Info));
  };

  //지도 표시할 div

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
              history.push("/MapPractice");
            }}
          >
            <img src={search} style={{ marginLeft: "4px" }} />
            <div style={{ marginLeft: "10px" }}>어디서 산책하실건가요? </div>
          </WalkButton>
        </SearchWrap>

        <AdressWrap>
          <CircleDiv>
            <img src={map} />
          </CircleDiv>
          <Address>
            상세 주소
            <Detail>{markerName.locationCategory}</Detail>
            <Detail>{markerName.routeName}</Detail>
          </Address>
        </AdressWrap>

        <Title>산책 일시</Title>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          inline
        />
         <Title>
        <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">마리 수</InputLabel>
        <Select
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
        </Select>
      </FormControl>
    </Box>
    </Title>
        <Title>소개/유의사항</Title>
        <TextArea onChange={(e) => setWishDesc(e.target.value)}></TextArea>
        <AddButton onClick={SubmitLocation}>산책 등록</AddButton>
      </InputArea>
      <NavBar />
    </Frame>
  );
};

export default Map2;

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
  margin-bottom: 10px;
`;

const CircleDiv = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
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
  border: 2px solid black;
  border-radius: 14px;
  color: #5f5f5f;
  padding: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 164px;
  height: 48px;
  font-size: 16px;
  border-radius: 12px;
  background-color: transparent;
  box-shadow: 0px 4px black;
`;
