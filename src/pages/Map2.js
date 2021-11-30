import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";

// 데이트 피커
import DatePicker from "react-datepicker";
import "../components/react-datepicker.css";

// 컴포넌츠
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/Modal/SuccessModal";

// 리덕스
import { actionCreators as PostActions } from "../redux/modules/post";

// 이미지 + 아이콘
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import search from "../image/search.png";
import detailAddress from "../image/detailAddress.png";
import detailFilter from "../image/detailFilter.png";

const Map2 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const markerName = useSelector((state) => state.marker.marker);
  const moment = require("moment");
  const get_modal = useSelector((state) => state.chat.modal);

  const [modal, setModal] = useState("");
  const [startDate, setStartDate] = useState();
  const [wishDesc, setWishDesc] = useState();
  const [dogCount, setDogCount] = React.useState("");
  const [is_modal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  const handleChange = (event) => {
    setDogCount(event.target.value);
  };

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

    if (
      markerName.totalDistance == "" ||
      markerName.totalTime == "" ||
      markerName.routeColor == "" ||
      markerName.routeName == "" ||
      markerName.startLocationAddress == "" ||
      markerName.endLocationAddress == "" ||
      markerName.locationCategory == "" ||
      wishDesc == undefined ||
      wishDesc == "" ||
      dogCount == ""
    ) {
      setIsModal(true);
    } else {
      dispatch(PostActions.addPostMD(Info));
    }
  };

  useEffect(() => {
    setModal(get_modal);
  }, []);

  return (
    <>
      <Wrap>
        {/* 헤더 */}
        <TopBar>산책 등록</TopBar>
        {/* 산책로 */}
        <div>
          <Title>산책로 설정</Title>
          <SearchWrap>
            <WalkButton
              onClick={() => {
                history.push("/MapPractice");
              }}
            >
              <img src={search} />
              <div>어디서 산책하실건가요? </div>
            </WalkButton>
          </SearchWrap>

          {/* 상세주소 선택 후 나오는 정보 모음 */}
          {markerName.routeName && (
            <div>
              <AdressWrap>
                <CircleDiv>
                  <img src={detailAddress} />
                </CircleDiv>
                <Address>
                  <Detail>상세주소</Detail>
                  <Detail>출발: {markerName.startLocationAddress}</Detail>
                  <Detail>도착: {markerName.endLocationAddress}</Detail>
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
        </div>
        {/* 산책 일시 */}
        <div>
          <Title>산책 일시</Title>
          <Calendar>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeInputLabel="산책시간"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
              inline
            />
          </Calendar>
        </div>
        {/* 강아지 마리 수  */}
        <div>
          <CustomBox sx={{ minWidth: 120 }}>
            <CustomFormControl fullWidth>
              <CustomInputLabel id="demo-simple-select-label">
                모집 강아지 수
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
        </div>
        {/* 소개/유의사항 */}
        <div>
          <Title>소개/유의사항</Title>
          <TextArea
            placeholder="예) 소형견만 산책 가능, 수컷만 가능..."
            onChange={(e) => setWishDesc(e.target.value)}
          ></TextArea>
        </div>
        {/* 등록 버튼 */}
        <AddButton onClick={SubmitLocation}>산책 등록하기</AddButton>
        {is_modal ? (
          <ErrorModal
            close={closeModal}
            text={"입력하지 않은 정보가 있습니다."}
          />
        ) : null}
      </Wrap>
      <NavBar />
    </>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 5%;
  text-align: center;
`;
const Calendar = styled.div`
  box-shadow: 0px 10px 60px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
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
  padding-left: 12px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px gray;
  margin-bottom: 20px;
  img {
    margin-left: 4px;
  }

  div {
    margin-left: 10px;
  }
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
  font-size: 16px;
  line-height: 26px;
  margin: 12px 0;
  width: 100%;
  font-weight: bold;
  margin: 30px 0;
`;
const TextArea = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  width: 100%;
  height: 138px;
  font-size: 14px;
  line-height: 20px;
  border: 1px gray;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  color: #5f5f5f;
  padding: 20px 24px;
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

export default Map2;
