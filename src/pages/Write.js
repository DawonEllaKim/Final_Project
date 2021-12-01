import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// 리덕스
import { actionCreators as postActions } from "../redux/modules/post";

const Write = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);
  const postId = props.match.params.id;

  let is_edit = postId ? true : false;
  const post = is_edit ? postList.find((p) => p.id === Number(postId)) : null;

  const [location, setLocation] = useState(post ? post.locationCategory : "");
  const [meetingDate, setMeetingDate] = useState(post ? post.meetingDate : "");
  const [meetingTime, setMeetingTime] = useState(post ? post.meetingTime : "");
  const [dogCount, setDogCount] = useState(post ? post.dogCount : "");
  const [wishDesc, setWishDesc] = useState(post ? post.wishDesc : "");

  const locationChange = (e) => {
    setLocation(e.target.value);
  };

  const countChange = (e) => {
    setDogCount(e.target.value);
  };

  const descChange = (e) => {
    setWishDesc(e.target.value);
  };

  // 수정
  const updateMeeting = () => {
    const post = {
      locationCategory: location,
      meetingDate: meetingDate,
      meetingTime: meetingTime,
      dogCount: dogCount,
      wishDesc: wishDesc,
    };
    dispatch(postActions.updatePostMD(postId, post));
  };

  // 추가
  const addMeeting = () => {
    const post = {
      locationCategory: location,
      meetingDate: meetingDate,
      meetingTime: meetingTime,
      dogCount: dogCount,
      wishDesc: wishDesc,
    };
    dispatch(postActions.addPostMD(post));
  };

  return (
    <>
      <Wrap>
        <Left>
          <Map />
        </Left>
        <Right>
          <Location>
            <Title>위치</Title>
            <select value={location} onChange={locationChange}>
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
          <Date>
            <Title>산책 일시</Title>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
            />
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
            />
          </Date>
          <Count>
            <Title>최대 인원</Title>
            <select value={dogCount} onChange={countChange}>
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
            {is_edit ? (
              <AddBtn onClick={updateMeeting}>수정</AddBtn>
            ) : (
              <AddBtn onClick={addMeeting}>등록</AddBtn>
            )}
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
const Textarea = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
`;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;
const CancleBtn = styled.button``;
const AddBtn = styled.button``;

export default Write;
