import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { GrNotification } from "react-icons/gr";

import Card from "../components/Card";
import UserCard from "../components/UserCard";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as signActions } from "../redux/modules/sign";
import { useHistory } from "react-router";

import {FiLogOut,FiMail} from "react-icons/fi";
import DogCard from "../components/DogCard"
const MyPage = (props) => {
  const dispatch = useDispatch();
  const pageList = useSelector((state) => state.user.page);
  console.log(pageList);
  const userInfo = useSelector((state) => state.user.list);
  console.log(userInfo);
  const history = useHistory();
  const [check,setCheck] = useState(true);
  useEffect(() => {
    dispatch(userActions.getMypageMD());
  }, []);

  const siteLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      dispatch(signActions.logOut());
      history.replace('/');
    } else {
      console.log('로그인 유지');
    }
  };

  return (
    <Wrap>
      <TopWrap>
        <MdArrowBackIosNew
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          onClick={() => {
            history.goBack();
          }}
        />
        <TopTitle>마이페이지</TopTitle>
        <GrNotification style={{ width: "24px", height: "24px" }} />
      </TopWrap>
      <DogImage src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></DogImage>
      <DataWrap>
   
       <FlexBetween>
       <DogProfile
            onClick={siteLogout}
          >
            <CircleButton >
          <FiLogOut size="30" />
        </CircleButton>
            <Title>로그아웃</Title>
          </DogProfile>
          <DogProfile
            onClick={() => {
              history.push("/dogProfile");
            }}
          >
            <CircleButton >
            <FiMail size="30" />
        </CircleButton>
            <Title>쪽지</Title>
          </DogProfile>
         </FlexBetween>

         {/* 등록정보,산책목로 */}
        <ProfileWrap>
          
          <DogProfile
            onClick={() => {
              setCheck(true)
            }}
          >
    
            <Title>등록정보</Title>
          </DogProfile>
        
          <UserProfile
            onClick={() => {
              setCheck(false)
            }}
          >
           
            <Title>산책목록</Title>
          </UserProfile>
        </ProfileWrap>
        {
          check
          ?
          <CardWrap>
           <List >보호자 정보</List>
          <UserCard post={userInfo}/>
          <List>반려견 정보</List>
          <DogCard post={userInfo}/>
          </CardWrap>
           :
         <CardWrap>
            {pageList.length === 1 ? (
            <NoCard>등록된 산책 목록이 없습니다.</NoCard>
          ) : (
            <div>
              {pageList.map((page, index) => {
                if(index>0)
                return (
                  
                  <div onClick={() => history.push(`/posts/${page.post_id}`)}>
                    <Card index={index} key={index} post={page} />
                  </div>
                );
              })}
            </div>
          )}
           </CardWrap>
        }
       
         
        
      </DataWrap>
      <NavBar />
    </Wrap>
  );
};

const NoCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 20px;
`;
const Wrap = styled.div`
  position: relative;
  max-width: 390px;
  font-size: 14px;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
`;

const FlexBetween = styled.div
`
display: flex;
justify-content: space-around;
align-items:center;

`
const CircleButton = styled.button
`
cursor:pointer;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 8px;
border-radius:50%;
width: 60px;
height: 60px;
margin-bottom:5px;
`
const TopWrap = styled.div`


  display: flex;
  justify-content: space-between;
  align-items:center;
  width: 390px;
  margin-top:20px;
`;
const TopTitle = styled.div`
  font-size: 16px;
`;

const DogImage = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  padding: 0;
  margin: 20px 0px;
  border-radius:18px;
  
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  
`;
const DataWrap = styled.div`
  padding: 0 20px;
`;
const UserWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: left;
`;
const UserImage = styled.img`
  position: absolute;
  top: -30px;
  width: 80px;
  height: 80px;
  background-color: #ebebeb;
  box-sizing: border-box;
  border-radius: 50%;
  /* src:pageList.user_image; */
`;


const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #c4c4c4;
 
  padding: 22px 0;
  margin: 28px 0;
`;
const Title = styled.div`
font-weight: bold;
font-size: 16px;
&:hover {
  color:red;
  border-bottom: 3px solid red;
}
`;
const DogProfile = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align:center;
`;

const UserProfile = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const CardWrap = styled.div`
  text-align: left;
`;
const List = styled.div`
  margin-bottom: 20px;
`;

export default MyPage;
