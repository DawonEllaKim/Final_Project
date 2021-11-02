import React from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
import { FaDog } from 'react-icons/fa'
import { BsChatRightDots } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";

import Card from "../components/Card";
import NavBar from '../components/NavBar';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

const MyPage = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.list);
  // console.log(postList);
  console.log(useSelector((state) => state));

  React.useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <Wrap>
      <TopWrap>
        <MdArrowBackIosNew 
          style={{width: '24px', height:'24px', cursor:'pointer'}}
          onClick={() => {
            history.goBack();
          }}
        />
        <TopTitle>마이페이지</TopTitle>
        <GrNotification 
          style={{width: '24px', height:'24px'}}
        />
      </TopWrap>
      <DogImage></DogImage>
      <DataWrap>
      <UserWrap>
        <UserImage></UserImage>
        <UserData>
          <Username>김효진</Username>
          <Userdetail>30대, 여</Userdetail>
        </UserData>
      </UserWrap>
      <ProfileWrap>
        <DogProfile onClick = {() => {history.push('/dogProfile')}}>
          <FaDog 
            style={{width: '24px', height:'24px'}}
          />
          <Title>반려견 정보</Title>
        </DogProfile>
        <Chatting>
          <BsChatRightDots 
            style={{width: '24px', height:'24px'}}
          />
          <Title>쪽지</Title>
        </Chatting>
        <UserProfile onClick = {() => {history.push('/userProfile')}}>
          <BsPerson 
          style={{width: '24px', height:'24px'}}
          />
          <Title>보호자 정보</Title>
        </UserProfile>
      </ProfileWrap>
      <CardWrap>
        <List>산책 목록</List>
        {postList.map((post, index) => {
          return (
            <div onClick={() => history.push(`/posts/${post.id}`)}>
              <Card index={index} key={index} post={post} />
            </div>
          );
       })}
      </CardWrap>
      </DataWrap>
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  max-width: 390px;
  font-size: 14px;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
`
const TopWrap = styled.div`
  position: absolute;
  top: 60px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 32px;
`
const TopTitle = styled.div`
  font-size: 16px;
`

const DogImage = styled.img`
  display: block;
  width: 100%;
  height: 292px;
  padding: 0;
  margin: 0;
`
const DataWrap = styled.div`
  padding: 0 20px;
`
const UserWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
`
const UserImage = styled.img`
  position: absolute;
  top: -30px;
  width: 80px;
  height: 80px;
  background-color: #ebebeb;
  box-sizing: border-box;
  border-radius: 50%;
`
const UserData = styled.div`
  text-align: left;
  margin-left: 90px;
`
const Username = styled.div`
  padding: 4px 0;
`
const Userdetail = styled.div``

const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  padding: 22px 0;
  margin: 28px 0;
`
const Title = styled.div``
const DogProfile = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`
const Chatting = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`
const UserProfile = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`
const CardWrap = styled.div`
  text-align: left;
`
const List = styled.div`
  margin-bottom: 20px;
`

export default MyPage;
