import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";
import "../components/react-datepicker.css";
import DatePicker from "react-datepicker";
import { actionCreators as PostActions } from "../redux/modules/post";
import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// 상단바
import TopBar from "../components/TopBar";

// 버튼 이미지
import Button from "../elements/Button";
import backward from "../image/backward.png";
import notification from "../image/Notification.png";
import search from "../image/search.png";
import map from "../image/map.png";
import detailAddress from "../image/detailAddress.png";
import detailFilter from "../image/detailFilter.png";
const Map2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const markerName = useSelector((state) => state.marker.marker);

  const [startDate, setStartDate] = useState(); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음
  const [wishDesc, setWishDesc] = useState(); //desc설명
  const [dogCount, setDogCount] = React.useState("");

  const handleChange = (event) => {
    setDogCount(event.target.value);
  };
  const moment = require("moment");

  console.log(startDate);
  console.log(markerName);
  const SubmitLocation = () => {
    const Info = {
      totalDistance: markerName.totalDistance,
      totalTime: markerName.totalTime,
      routeColor: markerName.routeColor,
      routeName: markerName.routeName,
      startLocationAddress: markerName.startLocationAddress,
      endLocationAddress: markerName.endLocationAddress,
      locationCategory: markerName.locationCategory,
      wishDesc: wishDesc,
      dogCount: dogCount,
      meetingDate: moment(startDate).add(9, "h")._d,
    };
    console.log(Info);
    dispatch(PostActions.addPostMD(Info));
  };

  //지도 표시할 div

  return (
    <Frame>
      {/* {is_modal? <MarkerModal close={closeModal} latitude={latitude} longitude={longitude} /> : null } */}
      <TopBar>산책 등록</TopBar>
      <InputArea>
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

        {markerName.routeName && (
          <div>
            <AdressWrap>
              <CircleDiv>
                <img src={detailAddress} />
              </CircleDiv>
              <Address>
                <Detail>{markerName.locationCategory}</Detail>
                <Detail>{markerName.routeName}</Detail>
              </Address>
            </AdressWrap>

            <AdressWrap>
              <CircleDiv>
                <img src={detailFilter} />
              </CircleDiv>
              <Address>
                <Detail>총 {markerName.totalDistance}</Detail>
                <Detail>시간: {markerName.totalTime}</Detail>
              </Address>
            </AdressWrap>
          </div>
        )}
        <Title>산책 일시</Title>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="시작시간"
          dateFormat="MM/dd/yyyy h:mm aa"
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
        <TextArea
          placeholder="산책에 관한 글을 작성해주세요~"
          onChange={(e) => setWishDesc(e.target.value)}
        ></TextArea>
        <AddButton onClick={SubmitLocation}>산책 등록</AddButton>
      </InputArea>
      <NavBar />
    </Frame>
  );
};

export default Map2;
const Title1 = styled.div`
  box-sizing: border-box;
  height: 35px;
  font-size: 18px;
  line-height: 26px;
  margin: 80px 0 20px 0;
`;
const CustomSelect = styled(Select)`
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
`;
const CustomInputLabel = styled(InputLabel)`
  display: flex;
  align-items: center;
`;
const CustomFormControl = styled(FormControl)``;
const CustomBox = styled(Box)``;
const Frame = styled.div`
  max-width: 390px;
  padding: 0 20px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  padding-bottom: 100px;
  justify-content: center;
`;

const InputArea = styled.div`
  /* padding: 40px 0; */
  box-sizing: border-box;
`;

const SearchWrap = styled.div`
  width: 100%;
  height: 45px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 164px;
  height: 48px;
  font-size: 16px;
  border-radius: 12px;
  background-color: transparent;
  border: 1px gray;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
