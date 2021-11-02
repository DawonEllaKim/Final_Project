import React, { useEffect } from "react";
import styled from "styled-components";

import Map from './Map';

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Detail = (props) => {
  useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);
  const dispatch = useDispatch();
  const post_info = useSelector((state) => state.post?.list) || "";
  console.log(post_info);
  const postId = props.match.params.id;
  console.log("파람즈 id", postId);

  const postInfo = post_info.filter(
    (postInfo) => postInfo.id === Number(postId)
  )[0];
  console.log(postInfo);

    const categoryInfo = postInfo?.locationCategory;
    const dateInfo = postInfo?.meetingDate;
    const timeInfo = postInfo?.meetingTime;
    const wishInfo = postInfo?.wishDesc;

  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  return (
    <>
      <Wrap>
        <DogImage></DogImage>
        <DataWrap>  
          <UserWrap>
            <UserLeft>
              <UserImage></UserImage>
              <UserData>
                <UserName>김효진</UserName>
                <UserDetail>30대, 여</UserDetail>
              </UserData>
            </UserLeft>
            <UserRight>
              <Completed>모집 마감</Completed>
              <Edit onClick={() => history.push(`/write/${postId}`)}>수</Edit>
              <Delete onClick={deletePost}>삭</Delete>
            </UserRight>
          </UserWrap>
          <DetailWrap>
            <DogDesc>
              <DogDetail> 가을이, 5세</DogDetail>
              <WishDesc> {wishInfo} </WishDesc>
              <FilterWrap>
                <DogSize>소형견</DogSize>
                <DogGender>남</DogGender> 
                <DogNeutral>중성화 Y</DogNeutral>
                <DogBreed>비숑</DogBreed>
              </FilterWrap>
            </DogDesc>
            <Line></Line>
            <TimeWrap>
              <Title>예약 시간</Title>
              <MeetingTime>{dateInfo + " " + timeInfo}</MeetingTime>
            </TimeWrap>
            <Line></Line>
            <LocationWrap>
              <Title>예약 장소</Title>
              <MeetingLocation>{categoryInfo}</MeetingLocation>
            </LocationWrap>
            <Line></Line>
            <MapWrap>
              <Map />
            </MapWrap>
          </DetailWrap> 
        </DataWrap>
        <NavWrap>
          <NavBar>
            <Home onClick={()=>{history.push('/')}}>홈</Home>
            <Chatting>채팅</Chatting>
            <MyPage onClick={() =>{history.push('/myPage')}}>My</MyPage>
          </NavBar>
          <NavMap>지도</NavMap>
        </NavWrap> 
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: relative;
  max-width: 390px;
  margin: 0 auto;
  font-size: 14px;
  text-align:center;
`;
const DogImage = styled.img`
  border: 1px solid green;
  box-sizing: border-box;
  display: block;
  width:100%;
  height: 422px;
`;

const DataWrap = styled.div`
  position: absolute;
  top: 240px;
  left: 0;
  width: 100%;
`
const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const UserLeft = styled.div`
  display: flex;
`
const UserImage = styled.img`
  display: block;
  width: 64px;
  height: 64px;
  border: 1px solid #e6e6e6;
  border-radius: 32px;
`;
const UserData = styled.div`
  padding:12px 0 0 12px;
`;
const UserName = styled.div``;
const UserDetail = styled.div``;

const UserRight = styled.div`
  padding-top: 12px;
`
const Completed = styled.button`
  width: 76px;
  height: 40px;
  border: none;
  border-radius: 20px;
`;
const Edit = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 8px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
const Delete = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const DetailWrap = styled.div`
  background-color: #ebebeb;
  border-radius: 30px 30px 0 0;
  padding: 20px 20px 140px 20px;
`;
const DogDesc = styled.div``;
const DogDetail = styled.div``;
const WishDesc = styled.div`
  margin: 8px 0 20px 0;
`;
const FilterWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const DogSize = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const DogGender = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const DogNeutral = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const DogBreed = styled.div`
  width: 68px;
  height: 32px;
  line-height: 32px;
  background-color: #c4c4c4;
  border-radius: 20px;
`;
const Line = styled.span`
  display: block;
  width:80px;
  border: 1px solid #dbdbdb;
  margin: 20px auto;
`
const Title = styled.div`
  margin-bottom: 8px;
`;

const TimeWrap = styled.div``;
const MeetingTime = styled.div``;

const LocationWrap = styled.div``;
const MeetingLocation = styled.div``;

const MapWrap = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 20px;
`;

const NavWrap = styled.div`
  max-width: 390px;
  display: flex;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`
const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 274px;
  height: 60px;
  border-radius: 20px;
  background-color: #5c5c5c;
  margin-right: 12px;
`
const Home = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`
const Chatting = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
const MyPage = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
`;
const NavMap = styled.button`
  width: 60px;
  height: 60px;
  color: #fff;
  border: none;
  border-radius: 30px;
  background-color: #5c5c5c;
  cursor: pointer;
`;

export default Detail;
