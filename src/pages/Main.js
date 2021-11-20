import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Slider from "react-slick";
import Weather from "../components/Weather";
// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";

// 컴포넌츠
import Card from "../components/Card";
import DogSize from "../components/MainSideBar/Filters/DogSize";
import DogGender from "../components/MainSideBar/Filters/DogGender";
import DogAge from "../components/MainSideBar/Filters/DogAge";
import LocationCategory from "../components/MainSideBar/Filters/LocationCategory";
import MainDogsta from "../components/MainDogsta";
import NavBar from "../components/NavBar";

// 상단바
import TopBar from "../components/TopBar";

// 리액트 아이콘
import { AiOutlineFilter } from "react-icons/ai";
import { GrNotification } from "react-icons/gr";
import { actionCreators as dogStaActions } from "../redux/modules/dogsta"; // 액션 불러오기

// 로그인 이미지
import logo from "../image/loginLogo.png";
import login from "../image/login.png";
import loginText from "../image/loginText.png";

// 슬라이드
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 스피너
import Spinner from "../shared/Spinner";

import caution1 from "../image/caution1.png";
import caution2 from "../image/caution2.png";
import caution3 from "../image/caution3.png";
import dogsta from "../redux/modules/dogsta";
import { FaBullseye } from "react-icons/fa";

const Main = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.main);
  const userInfo = useSelector((state) => state.user.list);

  const dogStaPostList = useSelector((state) => state.dogsta.mainList);
  // console.log(dogStaPostList);


  //소켓
  const userId = localStorage.getItem("userId");
  



  // 스피너
  const is_loading = useSelector((state) => state.sign.is_loading);

  // 슬라이드 세팅
  const topSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const bottomSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
    pauseOnHover: true,
  };

  
  console.log(userId);

  // 사이드 바
  const sideBarRef = useRef();
  const [sideBar, setSideBar] = useState(false);
  const [page, setPage] = useState();

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
    dispatch(dogStaActions.getAllPostMD());
  }, []);

  if (is_loading) {
    return <Spinner />;
  }
  console.log(dogStaPostList);
  return (
    <Wrap ref={sideBarRef} onClick={closeSideBar}>
      <TopBar> 산책할개 </TopBar>

      {/* 일러스트 슬라이드 */}

      {!userId ? (
        <StyledSlider {...topSettings} style={{ cursor: "pointer" }}>
          <div onClick={() => history.push("/login")}>
            <LoginImg>
              <Logo src={logo} />
              <Login src={login} />
              <LoginText src={loginText} />
            </LoginImg>
          </div>
        </StyledSlider>
      ) : (
        <StyledSlider {...topSettings} style={{ cursor: "pointer" }}>
          <Weather />
          <div
            onClick={() => {
              history.push("/caution1");
            }}
          >
            <Img src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80" />
          </div>
          <div
            onClick={() => {
              history.push("/caution2");
            }}
          >
            <Img src="https://images.unsplash.com/photo-1544567708-827a79119a78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80" />
          </div>
          <div
            onClick={() => {
              history.push("/caution3");
            }}
          >
            <Img src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
          </div>
        </StyledSlider>
      )}

      {/* 사이드 바*/}
      {/* <SideWrap> */}
      {/* 햄버거 메뉴 누르면 열리는 사이드 바 */}
      {/* <SideBarNav sideBar={sideBar}>
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
      </SideWrap> */}

      {/* 개스타그램 모음 */}
      <Body>
        <Text>오늘의 개스타</Text>
        <DogstaSlide {...bottomSettings} style={{ cursor: "pointer" }}>
          {dogStaPostList.map((post, index) => {
            return (
              <div onClick={() => history.push()}>
                <MainDogsta post={post} key={index} />
              </div>
            );
          })}
        </DogstaSlide>
      </Body>
      <div>
        <button
          onFocus={() => {
            setPage("olympic");
          }}
          onClick={() => {
            history.push(`/alllist/${page}`);
          }}
        >
          올림픽
        </button>
        <button
          onFocus={() => {
            setPage("seoul");
          }}
          onClick={() => {
            history.push(`/alllist/${page}`);
          }}
        >
          서울
        </button>
        <button
          onFocus={() => {
            setPage("banpo");
          }}
          onClick={() => {
            history.push(`/alllist/${page}`);
          }}
        >
          반포
        </button>
      </div>

      {/* 각 게시물에 대한 카드들 */}
      <Body>
        <Text>같이 산책하실래요?</Text>
        <div>dd</div>
        <div>
          {postList.map((post, index) => {
            return (
              <div onClick={() => history.push(`/posts/${post.postId}`)}>
                <Card post={post} key={index} />
              </div>
            );
          })}
        </div>
      </Body>
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  text-align: center;
  position: relative;
  width: 390px;
  margin: 0 auto;
  padding: 0 20px 60px 20px;
  box-sizing: border-box;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }

  width: 350px;
  height: 172px;
  margin-bottom: 12px;
  border-radius: 25px;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const LoginImg = styled.div`
  position: relative;
  width: 350px;
  height: 172px;
  border-radius: 25px;
  cursor: pointer;
  object-fit: cover;
`;
const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Login = styled.img`
  position: absolute;
  top: 56.5%;
  left: 33%;
  z-index: 3;
  object-fit: cover;
`;
const LoginText = styled.img`
  position: absolute;
  top: 68%;
  left: 50%;
  transform: translateX(-50%);
  object-fit: cover;
`;

const Img = styled.img`
  width: 350px;
  height: 172px;
  background-size: cover;
  border-radius: 25px;
  object-fit: cover;
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

const DogstaSlide = styled(Slider)`
  display: flex;
  justify-content: left;
  /* gap: 20px; */
  width: 320px;
  height: 80px;
  .slick-prev:before,
  .slick-next:before {
    color: gray;
  }
  div {
    width: 100%;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 28px 0;
  border-top: 1px solid #c4c4c4;
`;
const Text = styled.p`
  width: 152px;
  height: 16px;
  margin: 12px 0 24px 0;
  font-size: 16px;
  font-weight: 700;
`;

export default Main;
