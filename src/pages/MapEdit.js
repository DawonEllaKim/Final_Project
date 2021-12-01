import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";

// 달력
import DatePicker from "react-datepicker";

// 리덕스
import { actionCreators as PostActions } from "../redux/modules/post";
import { actionCreators as postActions } from "../redux/modules/post";

// 컴포넌츠
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

// 이미지+아이콘
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import search from "../image/search.png";
import { BsCalendarCheck } from "react-icons/bs";
import { RiPinDistanceFill } from "react-icons/ri";

const MapEdit = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.list);
  const count = post.dogCount;
  const wish = post.wishDesc;
  const moment = require("moment");

  // const meetingdate = useSelector((state) => state.post.list);
  // console.log(meetingdate)
  const newDate = localStorage.getItem("date");
  const newCount = localStorage.getItem("dogCount");

  const [startDate, setStartDate] = useState(
    new Date(moment(newDate).subtract(9, "h")._d)
  ); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음

  const [wishDesc, setWishDesc] = useState(); //desc설명
  const [dogCount, setDogCount] = useState(newCount);

  useEffect(() => {
    dispatch(postActions.getPostMD(postId));
    setWishDesc(wish);
    setDogCount(Number(count));
  }, [wish, count]);

  const postId = props.match.params.id;

  const locationCategory = post.locationCategory;
  const routeName = post.routeName;

  let markerName = useSelector((state) => state.marker.marker);

  const handleChange = (event) => {
    setDogCount(event.target.value);
  };

  const changedDate = moment(startDate, "YYYY.MM.DD").format("YYYY.MM.DD");
  const changedTime = moment(startDate, "hh:mm").format("hh:mm");

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
console.log(editLocationCategory,editRouteName,editTotalTime)
  // console.log(
  //   editTotalTime,
  //   editTotalDistance,
  //   editRouteName,
  //   editRouteColor,
  //   editStartLocationAddress,
  //   editEndLocationAddress,
  //   editLocationCategory
  // );

  const dateHandler = (date) => {
    setStartDate(date);
  };
  const wishHandler = (e) => {
    setWishDesc(e.target.value);
  };
  //지도 표시할 div
  // console.log(post.mapedit_date);
  // console.log(moment(startDate).subtract(9, "hours")._d);

  const editLocation = () => {
    const Info = {
      totalDistance: editTotalDistance,
      totalTime: editTotalTime,
      routeColor: editRouteColor,
      routeName: editRouteName,
      startLocationAddress: editStartLocationAddress,
      endLocationAddress: editEndLocationAddress,
      locationCategory: editLocationCategory,
      wishDesc: wishDesc,
      meetingDate: moment(startDate).add(9, "h")._d,
      completed: false,
      dogCount: dogCount,
    };
    console.log(editTotalDistance,editLocationCategory)
    dispatch(PostActions.updatePostMD(postId, Info));
    history.goBack();
  };

  return (
    <Wrap>
      {/* {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null } */}

      <TopBar>산책 수정</TopBar>

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

      <TimeWrap>
        {/* 날짜/시간, 장소이름, 산책로 코스 */}
        <Box>
          <RedIcon>
            <BsCalendarCheck
              style={{
                color: "#fff",
                width: "24px",
                height: "24px",
                fontWeight: "bold",
              }}
            />
          </RedIcon>
          <BoxDiv>
            <MeetingTime>
              약속 시간: {changedDate + " " + changedTime}
            </MeetingTime>
            <MeetingLocation>
              약속 장소:
              {editLocationCategory + " " + editRouteName}
            </MeetingLocation>
          </BoxDiv>
        </Box>
        {/* 출발, 도착, 거리, 시간 */}
        <Box>
          <RedIcon>
            <RiPinDistanceFill
              style={{
                color: "#fff",
                width: "24px",
                height: "24px",
                fontWeight: "bold",
              }}
            />
          </RedIcon>
          <BoxDiv>
            <div>출발: {editStartLocationAddress}</div>
            <div>도착: {editEndLocationAddress}</div>
            <div>
              총 {editTotalDistance}, {editTotalTime} 코스
            </div>
          </BoxDiv>
        </Box>
      </TimeWrap>

      <Title>산책 일시</Title>

      <DatePicker
        selected={startDate}
        onChange={dateHandler}
        timeInputLabel="Time:"
        showTimeInput
        inline
      />

      <Title>
        <CustomBox sx={{ minWidth: 120 }}>
          <CustomFormControl fullWidth>
            <CustomInputLabel id="demo-simple-select-label">
              마리 수
            </CustomInputLabel>
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

      <NavBar />
    </Wrap>
  );
};

const TimeWrap = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-bottom: 29px;
`;

const BoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  text-align: left;
`;
const RedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: #ff5656;
  border-radius: 50%;
  margin-right: 25px;
`;
const MeetingTime = styled.div`
  font-size: 16px;
`;
const MeetingLocation = styled.div``;
export default MapEdit;
const Title1 = styled.div`
  box-sizing: border-box;
  height: 35px;
  font-size: 18px;
  line-height: 26px;
  margin: 80px 0 20px 0;
`;
const CategoryTitle = styled.div`
  margin-bottom: 8px;
  color: #5c5c5c;
`;
const CustomSelect = styled(Select)`
  border-radius: 14px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const CustomInputLabel = styled(InputLabel)`
  display: flex;
  align-items: center;
`;
const CustomFormControl = styled(FormControl)``;
const CustomBox = styled(Box)``;
const Wrap = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  justify-content: center;
  padding: 0 5% 0 5%;
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
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
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
  border: 1px gray;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  color: #5f5f5f;
  padding: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  background-color: #f9f5c2;
  font-family: "Noto Sans KR", sans-serif;
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 164px;
  height: 48px;

  border-radius: 12px;
  background-color: transparent;
  border: 1px gray;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
