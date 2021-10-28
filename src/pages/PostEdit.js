import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import { history } from "../redux/configureStore";
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import reactDom from "react-dom";

const Write = (props) => {
    const updatePost = useSelector((state) => state.post?.list)||""
    console.log(updatePost)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.getUpdatePostMD(postId))
   
  },[])
  
  const [meetingDate, setMeetingDate] = useState();
  const [meetingTime, setMeetingTime] = useState();
  const timeChange = (e) => {
    if(e.target.value)
    {
      console.log(e.target.value);
      setMeetingTime(e.target.value);
    }
    else
    setMeetingTime(updatePost.meetingTime)
};
const dateChange = (e) => {
    if(e.target.value)
    {
      console.log(e.target.value);
      setMeetingDate(e.target.value);
    }
    else
    setMeetingDate(updatePost.meetingDate)
};


 
  const [location, setLocation] = useState();

  const locationChange = (e) => {
      if(e.target.value)
      {
        console.log(e.target.value);
        setLocation(e.target.value);
      }
      else
      setLocation(updatePost.locationCategory)
  };




  const [dogCount, setDogCount] = useState();


  const countChange = (e) => {
    if(e.target.value)
    {
      console.log(e.target.value);
      setDogCount(e.target.value);
    }
    else
    setDogCount(updatePost.dogCount)
  };

  const [wishDesc, setWishDesc] = useState();

  const descChange = (e) => {

      console.log(e.target.value);
      setWishDesc(e.target.value);
    
    // else
    // setWishDesc(updatePost.wishDesc)
  };
  
  const postId = props.match.params.id;
  const addMeeting = () => {
    const post = {
      locationCategory: location,
      meetingTime: meetingTime,
      meetingDate: meetingDate,
      dogCount: dogCount,
      wishDesc: wishDesc,
    };

    console.log(post);
    dispatch(postActions.updatePostMD(postId,post));
  };

  
  
  return (
    <>
      <Wrap>
        <Left>
          <Map></Map>
        </Left>
        <Right>
          <Location>
            <Title>위치</Title>
            <select value={location ? location : updatePost.locationCategory} onChange={locationChange}>
              <option value="전체">전체</option>
              <option value="반포">반포</option>
              <option value="여의도">여의도</option>
              <option value="뚝섬">뚝섬</option>
              <option value="서울숲">서울숲</option>
              <option value="올림픽공원">올림픽공원</option>
              <option value="부산 시민 공원">부산 시민 공원</option>
              <option value="부산 광안리">부산 광인리</option>
              <option value="대구 수성못">대구 수성못</option>
              <option value="인천 인천대공원">인천 인천대공원</option>
            </select>
          </Location>
          {/* <Date>
            <Title>산책 일시</Title>
            <DatePicker
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              injectTimes={[
                setHours(setMinutes(date, 1), 0),
                setHours(setMinutes(date, 5), 12),
                setHours(setMinutes(date, 59), 23),
              ]}
              dateFormat="yyyy-MM-dd hh:mm aa"
              value={startDate ? startDate : updatePost.meetingTime}
            />
          </Date> */}
          <input type="date" value={meetingDate ? meetingDate : updatePost.meetingDate} onChange={dateChange}/>
          <input type="time" value={meetingTime ? meetingTime : updatePost.meetingTime} onChange={timeChange}/>

          <Count>
            <Title>최대 인원</Title>
            <select value={dogCount? dogCount :updatePost.dogCount} onChange={countChange}>
              <option value="2">2마리</option>
              <option value="3">3마리</option>
              <option value="4">4마리</option>
              <option value="5">5마리</option>
              <option value="6">6마리</option>
              <option value="7">7마리</option>
              <option value="8">8마리</option>
              <option value="9">9마리</option>
              <option value="10">10마리</option>
            </select>
          </Count>
          <Desc>
            <Title>소개 및 유의사항</Title>
            <Textarea
              defaultValue={wishDesc? wishDesc: updatePost.wishDesc}
              onChange={descChange}
              placeholder="간단한 소개 및 유의사항을 적어주세요"
            >
              {wishDesc}
            </Textarea>
          </Desc>
          <ButtonWrap>
            <CancleBtn
              onClick={() => {
                history.goBack();
              }}
            >
              취소
            </CancleBtn>
            <AddBtn onClick={addMeeting}>등록</AddBtn>
          </ButtonWrap>
        </Right>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  max-width: 390px;
  margin: 0 auto;
`;
const Left = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
  width: 45%;
`;
const Map = styled.div``;
const Right = styled.div`
  border: 1px solid green;
  box-sizing: border-box;
  width: 55%;
  text-align: left;
  padding-left: 10px;
`;
const Title = styled.div`
  padding: 10px 0;
`;
const Location = styled.div``;
const Date = styled.div``;
const Count = styled.div``;
const Desc = styled.div``;
const Textarea = styled.textarea``;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;
const CancleBtn = styled.button``;
const AddBtn = styled.button``;

export default Write;
