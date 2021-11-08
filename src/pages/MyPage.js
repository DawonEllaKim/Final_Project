import React, { useEffect } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
import { FaDog } from "react-icons/fa";
import { BsChatRightDots } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

const MyPage = (props) => {
  const dispatch = useDispatch();
  const pageList = useSelector((state) => state.user.page);
  console.log(pageList);
  const userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);

  useEffect(() => {
    dispatch(userActions.getMypageMD());
  }, []);

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
      <DogImage></DogImage>
      <DataWrap>
        <UserWrap>
          <UserImage src={userInfo.user_image}></UserImage>
          <UserData>
            <Username>{userInfo.user_nickname}</Username>
            <Userdetail>
              {userInfo.user_age},{userInfo.user_gender}
            </Userdetail>
          </UserData>
        </UserWrap>
        <ProfileWrap>
          <DogProfile
            onClick={() => {
              history.push("/dogProfile");
            }}
          >
            <FaDog style={{ width: "24px", height: "24px" }} />
            <Title>반려견 정보</Title>
          </DogProfile>
          <Chatting>
            <BsChatRightDots style={{ width: "24px", height: "24px" }} />
            <Title>쪽지</Title>
          </Chatting>
          <UserProfile
            onClick={() => {
              history.push("/userProfile");
            }}
          >
            <BsPerson style={{ width: "24px", height: "24px" }} />
            <Title>보호자 정보</Title>
          </UserProfile>
        </ProfileWrap>
        <CardWrap>
          <List>산책 목록</List>

          {pageList.length === 1 ? (
            <NoCard>등록된 산책 목록이 없습니다.</NoCard>
          ) : (
            <div>
              {pageList.map((page, index) => {
                return (
                  <div onClick={() => history.push(`/posts/${page.post_id}`)}>
                    <Card index={index} key={index} post={page} />
                  </div>
                );
              })}
            </div>
          )}
        </CardWrap>
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
const TopWrap = styled.div`
  position: absolute;
  top: 60px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 32px;
`;
const TopTitle = styled.div`
  font-size: 16px;
`;

const DogImage = styled.img`
  display: block;
  width: 100%;
  height: 292px;
  padding: 0;
  margin: 0;
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
const UserData = styled.div`
  text-align: left;
  margin-left: 90px;
`;
const Username = styled.div`
  padding: 4px 0;
`;
const Userdetail = styled.div``;

const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
  padding: 22px 0;
  margin: 28px 0;
`;
const Title = styled.div``;
const DogProfile = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const Chatting = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
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
