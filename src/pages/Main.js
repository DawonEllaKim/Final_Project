import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

import Card from "../components/Card";
import DogSize from "../components/MainSideBar/Filters/DogSize";
import DogGender from "../components/MainSideBar/Filters/DogGender";
import DogAge from "../components/MainSideBar/Filters/DogAge";
import LocationCategory from "../components/MainSideBar/Filters/LocationCategory";

const Main = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post?.list) || "";

  // 사이드 바
  const sideBarRef = useRef();
  const [sideBar, setSideBar] = useState(false);

  const showSideBar = () => {
    setSideBar(!sideBar);
  };

  const closeSideBar = (e) => {
    if (sideBarRef.current === e.target) {
      setSideBar(false);
    }
  };

  // 게시물 불러오기
  React.useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <Wrap ref={sideBarRef} onClick={closeSideBar}>
      {/* 메세지 + 날씨 + 로그인하기 버튼 */}
      <Head>
        <h1>보호자님,</h1>
        <p>반려견을 등록해주세요</p>
        <button>로그인하러가기</button>
      </Head>
      {/* 게시물 필터 모음 + 사이드 바*/}
      <SubHead>
        <div>
          {/* Menu */}
          <HamburgerNav onClick={showSideBar}>menu</HamburgerNav>
          {/* 햄버거 메뉴 누르면 열리는 사이드 바 */}
          <SideBarNav sideBar={sideBar}>
            <Filter onClick={showSideBar}>나가기</Filter>
            <SubMenuWrap>
              <DogSize />
              <DogGender />
              <DogAge />
              <LocationCategory />
            </SubMenuWrap>
          </SideBarNav>
        </div>
        <p>크기</p>
        <p>성별</p>
        <p>위치</p>
        <p>마감여부</p>
      </SubHead>
      {/* 각 게시물에 대한 카드들 */}
      <Body>
        {postList.map((post, index) => {
          return (
            <div onClick={() => history.push(`/posts/${post.id}`)}>
              <Card index={index} key={index} post={post} />
            </div>
          );
        })}
      </Body>
      {/* 고정 버튼들 */}
      <Footer>
        <FooterLeft>
          <Button onClick={() => history.push("/login")}>로그아웃</Button>
          <Button>채팅방</Button>
          <Button onClick={() => history.push("/mypage")}>마이페이지</Button>
        </FooterLeft>

        <FooterRight>
          <Button onClick={() => history.push("/write")}>산책 등록</Button>
        </FooterRight>
      </Footer>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// 메세지 + 날씨 + 로그인하기 버튼
const Head = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 0;
  /* z-index: 2; */
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  width: 100%;
  height: 264px;
  padding: 5%;
  background-color: pink;
  h1 {
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: 400;
  }
  p {
    margin-bottom: 45px;
  }
  button {
    width: 186px;
    height: 40px;
    margin: auto auto 15% auto;
    border-radius: 20px;
    border: none;
  }
`;
// 게시물 필터 모음 + 사이드 바
const SubHead = styled.div`
  position: relative;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color: #efefef;
  border-radius: 14px;
  /* z-index: 9; */
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 32px;
    font-size: 14px;
    border-radius: 20px;
    background-color: #c4c4c4;
  }
`;
const HamburgerNav = styled.div`
  /* position: fixed;
  top: 0;
  left: 0; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  /* margin: 50px 24px; */
  background: #c4c4c4;
  border-radius: 50%;
  color: purple;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: red;
    transition: 350ms;
  }
`;
const SideBarNav = styled.div`
  position: fixed;
  top: 0;
  left: ${({ sideBar }) => (sideBar ? "0" : "-100%")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 65%;
  height: 100vh;
  margin-top: 44px;
  border-radius: 0 20px 20px 0;
  background: #c4c4c4;
  transition: 350ms;
  z-index: 10;
`;
const Filter = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 82px;
  padding-left: 26.26px;
  font-size: 18px;
  font-weight: 400;
  color: purple;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: red;
    transition: 350ms;
  }
`;
const SubMenuWrap = styled.div`
  width: 100%;
`;
// 각 게시물에 대한 카드들
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// 고정 버튼들
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 1%;
`;
const FooterLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  height: 60px;
  margin: 12px;
  border-radius: 20px;

  width: 274px;
  height: 60px;

  background-color: pink;
  border-radius: 20px;
`;
const FooterRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: pink;
  border-radius: 50%;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;
export default Main;
