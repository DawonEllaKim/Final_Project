import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as dogStaActions } from "../redux/modules/dogsta"; // 액션 불러오기

// 컴포넌츠
import Weather from "../components/Weather";
import MainCard from "../components/MainCard";
import MainDogsta from "../components/MainDogsta";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Spinner from "../shared/Spinner";

// 이미지
import logo from "../image/loginLogo.png";
import login from "../image/login.png";
import loginText from "../image/loginText.png";
import Hangang from "../image/Hangang.jpeg";
import Seoul from "../image/Seoul.png";
import Banpo from "../image/Banpo.jpeg";
import MainPageLogo from "../image/MainPageLogo.png";
import caution1 from "../image/caution1.png";
import caution2 from "../image/caution2.png";
import caution3 from "../image/caution3.png";

// 슬라이드
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import dogsta from "../redux/modules/dogsta";
import { FaBullseye } from "react-icons/fa";

const Main = (props) => {
  const dispatch = useDispatch();
  const dogStaPostList = useSelector((state) => state.dogsta.mainList);

  // 올림픽공원
  const olympicList = useSelector((state) => state.post.olympic);
  const olympic = olympicList.slice(0, 4);
  const olympicListLength = olympicList.length;
  const [olympicTitle, setOlympicTitle] = useState("올림픽공원");
  const [olympicImage, setOlympicImage] = useState(Hangang);
  const [olympicDogName, setOlympicDogName] = useState();
  const [olympicTime, setOlympicTime] = useState();
  const [olympicLocation, setOlympicLocation] = useState("");

  // 서울숲
  const seoulList = useSelector((state) => state.post.seoul);
  const seoul = seoulList.slice(0, 4);
  const seoulListLength = seoulList.length;
  const [seoulTitle, setSeoulTitle] = useState("서울숲");
  const [seoulImage, setSeoulImage] = useState(Seoul);
  const [seoulDogName, setSeoulDogName] = useState();
  const [seoulTime, setSeoulTime] = useState();
  const [seoulLocation, setSeoulLocation] = useState("");

  // 반포 한강공원
  const banpoList = useSelector((state) => state.post.banpo);
  const banpo = banpoList.slice(0, 4);
  const banpoListLength = banpoList.length;
  const [banpoTitle, setBanpoTitle] = useState("반포 한강공원");
  const [banpoImage, setBanpoImage] = useState(Banpo);
  const [banpoDogName, setBanpoDogName] = useState();
  const [banpoTime, setBanpoTime] = useState();
  const [banpoLocation, setBanpoLocation] = useState("");

  const [page, setPage] = useState();

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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1000,
    pauseOnHover: true,
  };

  // 게시물 불러오기
  useEffect(() => {
    // dispatch(postActions.getAllMD());
    dispatch(postActions.getOlympicMD());
    dispatch(postActions.getSeoulMD());
    dispatch(postActions.getBanpoMD());
    dispatch(dogStaActions.getAllPostMD());
  }, []);

  if (is_loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div style={{ margin: "0 30px" }}>
        <TopBar only_right>
          <img src={MainPageLogo} style={{ height: "30px" }} />
        </TopBar>
      </div>

      <Wrap>
        {/* 슬라이드 */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "0 30px 40px 30px",
            boxSizing: "border-box",
          }}
        >
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
              {/* <CautionCard
                onClick={() => {
                  history.push("/caution3");
                }}
              >
                <div>
                  <Img src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
                </div>
                <div>
                  <h1>1. 목줄착용</h1>
                  <p>ddvvddd</p>
                </div>
              </CautionCard> */}
            </StyledSlider>
          )}
        </div>

        {/* 개스타그램 모음 */}
        <DogSta>
          <Header>
            <Text>오늘의 개스타</Text>
            <MoreBtn>더보기</MoreBtn>
          </Header>

          <DogstaSlide {...bottomSettings}>
            {dogStaPostList.map((post, index) => {
              return <MainDogsta post={post} key={index} />;
            })}
          </DogstaSlide>
        </DogSta>

        {/* 각 게시물에 대한 카드들 */}
        <Body>
          {/* 올림픽공원 */}
          <BodyWrap>
            <Header>
              <Text>올림픽 공원</Text>
              <MoreBtn
                onFocus={() => {
                  setPage("olympic");
                }}
                onClick={() => {
                  history.push(`/alllist/${page}`);
                }}
              >
                더보기
              </MoreBtn>
            </Header>

            <TEST>
              <Part>
                <PartImg src={olympicImage} />

                <CardTextHere>
                  <Number>+{olympicListLength}</Number>

                  <CardText>
                    <div>{olympicTitle}</div>
                    <p>{olympicDogName}</p>
                    <span>
                      {olympicTime}
                      {olympicLocation}
                    </span>
                  </CardText>
                </CardTextHere>
              </Part>

              <SubLists>
                {olympic.map((post, index) => {
                  const dogImage = post.dogImage;
                  const hover = () => {
                    setOlympicTitle();
                    setOlympicImage(post.dogImage);
                    setOlympicDogName(post.dogName + "와 함께 산책하기");
                    setOlympicTime(post.meetingDate);
                    setOlympicLocation(post.locationCategory);
                  };
                  const hoverOut = () => {
                    setOlympicTitle("올림픽공원");
                    setOlympicImage(Hangang);
                    setOlympicDogName("");
                    setOlympicTime();
                    setOlympicLocation();
                  };

                  return (
                    <AAA
                      onMouseEnter={hover}
                      onMouseLeave={hoverOut}
                      onClick={() => history.push(`/posts/${post.postId}`)}
                    >
                      <MainCard post={post} key={index}>
                        <Image src={dogImage} />
                      </MainCard>
                    </AAA>
                  );
                })}
              </SubLists>
            </TEST>
          </BodyWrap>

          {/* 서울숲 */}
          <BodyWrap>
            <Header>
              <Text>서울숲</Text>
              <MoreBtn
                onFocus={() => {
                  setPage("seoul");
                }}
                onClick={() => {
                  history.push(`/alllist/${page}`);
                }}
              >
                더보기
              </MoreBtn>
            </Header>

            <TEST>
              <Part>
                <PartImg src={seoulImage} />

                <CardTextHere>
                  <Number>+{seoulListLength}</Number>

                  <CardText>
                    <div>{seoulTitle}</div>
                    <p>{seoulDogName}</p>
                    <span>
                      {seoulTime}
                      {seoulLocation}
                    </span>
                  </CardText>
                </CardTextHere>
              </Part>

              <SubLists>
                {seoul.map((post, index) => {
                  const dogImage = post.dogImage;
                  const hover = () => {
                    setSeoulTitle();
                    setSeoulImage(post.dogImage);
                    setSeoulDogName(post.dogName + "와 함께 산책하기");
                    setSeoulTime(post.meetingDate);
                    setSeoulLocation(post.locationCategory);
                  };
                  const hoverOut = () => {
                    setSeoulTitle("서울숲");
                    setSeoulImage(Seoul);
                    setSeoulDogName("");
                    setSeoulTime();
                    setSeoulLocation();
                  };

                  return (
                    <AAA
                      onMouseEnter={hover}
                      onMouseLeave={hoverOut}
                      onClick={() => history.push(`/posts/${post.postId}`)}
                    >
                      <MainCard post={post} key={index}>
                        <Image src={dogImage} />
                      </MainCard>
                    </AAA>
                  );
                })}
              </SubLists>
            </TEST>
          </BodyWrap>

          {/* 반포 한강공원 */}
          <BanpoBodyWrap>
            <Header>
              <Text>반포 한강공원</Text>
              <MoreBtn
                onFocus={() => {
                  setPage("banpo");
                }}
                onClick={() => {
                  history.push(`/alllist/${page}`);
                }}
              >
                더보기
              </MoreBtn>
            </Header>

            <TEST>
              <Part>
                <PartImg src={banpoImage} />

                <CardTextHere>
                  <Number>+{banpoListLength}</Number>

                  <CardText>
                    <div>{banpoTitle}</div>
                    <p>{banpoDogName}</p>
                    <span>
                      {banpoTime}
                      {banpoLocation}
                    </span>
                  </CardText>
                </CardTextHere>
              </Part>

              <SubLists>
                {banpo.map((post, index) => {
                  const dogImage = post.dogImage;
                  const hover = () => {
                    setBanpoTitle();
                    setBanpoImage(post.dogImage);
                    setBanpoDogName(post.dogName + "와 함께 산책하기");
                    setBanpoTime(post.meetingDate);
                    setBanpoLocation(post.locationCategory);
                  };
                  const hoverOut = () => {
                    setBanpoTitle("반포 한강공원");
                    setBanpoImage(Banpo);
                    setBanpoDogName("");
                    setBanpoTime();
                    setBanpoLocation();
                  };

                  return (
                    <AAA
                      onMouseEnter={hover}
                      onMouseLeave={hoverOut}
                      onClick={() => history.push(`/posts/${post.postId}`)}
                    >
                      <MainCard post={post} key={index}>
                        <Image src={dogImage} />
                      </MainCard>
                    </AAA>
                  );
                })}
              </SubLists>
            </TEST>
          </BanpoBodyWrap>
        </Body>
      </Wrap>

      <NavBar />
    </div>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #c4c4c4;
  /* text-align: center; */
  position: relative;
  margin-bottom: -40px;
`;
const Both = styled.div`
  /* position: relative; */
  background-color: #fff;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  line-height: 52px;
`;

const StyledSlider = styled(Slider)`
  /* .slick-slide div { */
  /* outline: none; */
  /* } */

  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 4 / 2;
  border-radius: 14px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
`;

const CautionCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  aspect-ratio: 4 / 2;
  border-radius: 14px;
  border: 1px solid black;
  img {
    width: 144px;
    height: 144px;

    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));

    border-radius: 14px;
    object-fit: cover;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 4 / 2;
  border-radius: 14px;
  object-fit: cover;
`;

const TEST = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Part = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 17px;
  background-color: #000;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
`;
const PartImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 2.5;
  object-fit: cover;
  border-radius: 14px;
  opacity: 0.6;
`;
const CardTextHere = styled.div``;
const Number = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 68px;
  height: 27px;
  background-color: #fff;
  color: #000;
  /* opacity: 0.6; */

  border-radius: 14px;
  font-size: 14px;
`;
const CardText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 16px;

  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  color: #fff;
  div {
    position: absolute;
    bottom: 120px;
    font-size: 30px;
  }

  span {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20.27px;
  }
`;
const SubLists = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
  height: 100%;
`;

const AAA = styled.div`
  width: 23%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  cursor: pointer;
`;

const LoginImg = styled.div`
  position: relative;
  width: 100%;
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

const DogSta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 8px 0;
  padding: 20px 30px;
  background-color: #fff;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 31px;
`;
const Text = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
`;
const MoreBtn = styled.button`
  border: none;
  background-color: transparent;
  line-height: 20px;
  font-size: 14px;
  opacity: 0.6;
  cursor: pointer;
`;

const DogstaSlide = styled(Slider)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* gap: 20px; */
  width: 100%;
  margin-bottom: 32px;
  /* height: 80px; */
  text-align: center;
  cursor: pointer;
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
  /* margin: 28px 0; */
`;

const BodyWrap = styled.div`
  padding: 20px 30px;
  background-color: #fff;
  margin-bottom: 8px;
`;
const BanpoBodyWrap = styled.div`
  padding: 20px 30px 20px 30px;
  background-color: #fff;
  margin-bottom: 8px;
`;

export default Main;
