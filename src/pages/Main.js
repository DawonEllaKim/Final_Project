import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Slider from "react-slick";

// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as UserActions } from "../redux/modules/user";
// 컴포넌츠
import Card from "../components/Card";
import DogSize from "../components/MainSideBar/Filters/DogSize";
import DogGender from "../components/MainSideBar/Filters/DogGender";
import DogAge from "../components/MainSideBar/Filters/DogAge";
import LocationCategory from "../components/MainSideBar/Filters/LocationCategory";
import NavBar from "../components/NavBar";

// 리액트 아이콘
import { AiOutlineFilter } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";

// 슬라이드
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import caution1 from "../image/caution1.png";

const Main = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.main);

  // console.log(postList)
  // 슬라이드 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

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
  useEffect(() => {
    dispatch(postActions.getMainMD());
  }, []);

  return (
    <Wrap ref={sideBarRef} onClick={closeSideBar}>
      {/* 필터 + 산책할개 + 알람 */}
      <Head>
        <div onClick={showSideBar}>
          <AiOutlineFilter />
        </div>
        <p>산책할개</p>
        <div>
          <GrNotification />
        </div>
      </Head>

      {/* 일러스트 슬라이드 */}
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/caution1");
        }}
      >
        <StyledSlider {...settings}>
          <div style={{ backgroundColor: "pink" }}>
            <img src={caution1} />
            <SlideRight>
              <h3>1. 목줄착용</h3>
              <p>목줄 착용은 선택이 아닌 필수입니다</p>
            </SlideRight>
          </div>
          <div>
            <Img src="https://images.unsplash.com/photo-1544567708-827a79119a78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80" />
          </div>
          <div>
            <Img src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
          </div>
        </StyledSlider>
      </div>

      {/* 사이드 바*/}
      <SideWrap>
        {/* 햄버거 메뉴 누르면 열리는 사이드 바 */}
        <SideBarNav sideBar={sideBar}>
          <BarWrap>
            <Filter onClick={showSideBar}>
              <AiOutlineFilter
                style={{ width: "23px", height: "23px", marginRight: "10px" }}
              />
              <p>Filter</p>
              <button>초기화</button>
            </Filter>

            <SubMenuWrap>
              <DogSize />
              <DogGender />
              <DogAge />
              <LocationCategory />
            </SubMenuWrap>
          </BarWrap>
        </SideBarNav>
      </SideWrap>

      {/* 각 게시물에 대한 카드들 */}
      <Body>
        <Text>같이 산책하실래요?</Text>
        {postList.map((post, index) => {
          return (
            <div onClick={() => history.push(`/posts/${post.post_id}`)}>
              <Card post={post} key={index} />
            </div>
          );
        })}
      </Body>
      <NavBar />
    </Wrap>
  );
};

const StyledSlider = styled(Slider)`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 350px;
  height: 215px;
  padding: 37px 16px;
  border: 2px solid #000;

  .slick-slide div {
    outline: none;
  }

  margin-bottom: 12px;
  border-radius: 25px;

  img {
    width: 144px;
    height: 144px;
    border-radius: 50%;
  }
  h1 {
  }
`;

const SlideRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 350px;
  height: 220px;
  background-size: cover;
  border-radius: 25px;
`;
const Wrap = styled.div`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 390px;
  margin: auto;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 322px;
  margin: 30px auto 24px auto;
  padding: 0 34px;
  div {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  p {
    width: 150px;
    font-weight: 700;
    font-size: 24px;
    line-height: 35px;
    color: #393939;
    cursor: pointer;
  }
`;
const Slide = styled.div`
  width: 350px;
  height: 220px;
  margin-bottom: 12px;
  border-radius: 25px;
  background-color: #c4c4c4;
`;
const SideWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const SideBarNav = styled.div`
  position: fixed;
  top: 0;
  left: ${({ sideBar }) => (sideBar ? "0" : "-100%")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  transition: 350ms;
  z-index: 10;
`;
const BarWrap = styled.div`
  background-color: #c4c4c4;
  width: 308px;
  height: 100%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: 44px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
  text-decoration: none;
  cursor: pointer;
  p {
    font-size: 18px;
    margin-right: 130px;
  }
  button {
    border: none;
    background-color: transparent;
    font-size: 18px;
  }
`;
const SubMenuWrap = styled.div`
  width: 100%;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  width: 152px;
  height: 16px;
  margin: 32px 0 24px 0;
  font-size: 16px;
  font-weight: 700;
`;
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
  padding: 20px;
  border-radius: 20px;
  width: 274px;
  height: 60px;
  background-color: #5c5c5c;
  border-radius: 20px;
`;
const FooterRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #5c5c5c;
  border-radius: 50%;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

export default Main;
