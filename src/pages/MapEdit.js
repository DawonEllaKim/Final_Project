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
const MapEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();


  const post = useSelector((state) => state.post.list);
  const count = post.dogCount
  const wish = post.wishDesc
  
  // const meetingdate = useSelector((state) => state.post.list);
  // console.log(meetingdate)
  const newDate = localStorage.getItem("date")
  const newCount = localStorage.getItem("dogCount")
  console.log(newDate)

  const [startDate, setStartDate] = useState(new Date(newDate)); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음

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
  console.log(startDate);
  
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
      meetingDate: startDate,
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
        <Text>산책로 설정</Text>
        <Text>
          <WalkButton
            onClick={() => {
              history.push(`/editMapContainer3/${postId}`);
            }}
          >
            {" "}
            <FaSearch style={{}} size="20" />
            <div style={{ marginLeft: "10px" }}>산책로를 수정하실건가요? </div>
          </WalkButton>
        </Text>

        <Text2>
          {" "}
          <CircleDiv>
            <FaMapMarkedAlt />
          </CircleDiv>
          <Address>
            상세 주소:{" "}
            <div>
              {markerName.locationCategory ? markerName.locationCategory : locationCategory}
              <br/>
              {markerName.routeName ? markerName.routeName : routeName}
            </div>
          </Address>
        </Text2>

        <Text>산책 일시</Text>
        <Flex>
          <DatePicker
            selected={startDate}
            onChange={dateHandler}
            timeInputLabel="Time:"
            showTimeInput
            inline
          />
        </Flex>
        <Title>
        <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">마리 수</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={dogCount}
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
        <Text>소개/유의사항</Text>
        <Flex>
          <TextArea defaultValue={wishDesc} onChange={wishHandler}></TextArea>
        </Flex>
        <EndFlex>
          <Button onClick={editLocation}>산책 수정</Button>
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

  width: 132px;
  height: 48px;
  border-radius: 12px;
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

const CircleDiv = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const Address = styled.div`
  margin-left: 15px;
  text-align: left;
  font-size: 12px;
`;
const Title = styled.div`
  box-sizing: border-box;
  height: 35px;
  font-size: 18px;
  line-height: 26px;
  margin: 40px 0 20px 0;
`;
