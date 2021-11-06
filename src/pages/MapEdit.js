import React, { useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router";

import DatePicker from "react-datepicker";
import { actionCreators as PostActions } from "../redux/modules/post";
import { actionCreators as postActions } from "../redux/modules/post";
import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import {
  SentimentSatisfiedAltTwoTone,
  VerticalAlignCenter,
} from "@mui/icons-material";
const MapEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.map);

  const [startDate, setStartDate] = useState(); //받는 날짜 날짜 시간으로 받는 것이 아직 안 되어있음

  const map_date = new Date(post.mapedit_date);

  // useSelector, dispatch, 리덕스
  const postId = props.match.params.id;
  useEffect(() => {
    dispatch(postActions.getMapMD(postId));
    setWishDesc(post.wish_desc);
    setStartDate(new Date(post.mapedit_date));
  }, []);

  console.log(post);
  const Zapmap = new Date("2021-05-22");

  const location_address = post.location_address;
  console.log(post.mapedit_date);

  const wish_desc = post.wish_desc;
  const [wishDesc, setWishDesc] = useState(wish_desc); //desc설명
  const markerName = useSelector((state) => state.marker.marker);

  console.log(map_date);

  const editLongitude = markerName.longitude
    ? markerName.longitude
    : post.longitude;
  const editLatitude = markerName.latitude
    ? markerName.latitude
    : post.latitude;
  const editLocationaddress = markerName.placename
    ? markerName.placename
    : post.location_address;
  const editLocationCategory = markerName.locationCategory
    ? markerName.locationCategory
    : post.location_category;
  console.log(
    editLongitude,
    editLatitude,
    editLocationaddress,
    editLocationCategory
  );

  const editLocation = () => {
    const Info = {
      longitude: editLongitude,
      latitude: editLatitude,
      location_address: editLocationaddress,
      wish_desc: wishDesc,
      location_category: editLocationCategory,
      meeting_date: startDate,
      completed: false,
    };
    dispatch(PostActions.updatePostMD(postId, Info));
  };

  const dateHandler = (date) => {
    if (date) setStartDate(date);
    else setStartDate(map_date);
  };
  const wishHandler = (e) => {
    setWishDesc(e.target.value);
    console.log(e.target.value);
  };
  //지도 표시할 div
  console.log(post.mapedit_date);
  console.log(startDate);

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
              {markerName.placename ? markerName.placename : location_address}
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
        <Text>소개/유의사항</Text>
        <Flex>
          <TextArea value={wishDesc} onChange={wishHandler}></TextArea>
        </Flex>
        <EndFlex>
          <Button onClick={editLocation}>산책 등록</Button>
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
