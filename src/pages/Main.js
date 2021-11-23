// Main.js - 메인 페이지
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as dogStaActions } from "../redux/modules/dogsta";

// 컴포넌츠
import Weather from "../components/Weather";
import MainCard from "../components/MainCard";
import MainDogsta from "../components/MainDogsta";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Spinner from "../shared/Spinner";

// 이미지
// import logo from "../image/loginLogo.png";
import LoginLogoImg from "../image/Login.png";
// import loginText from "../image/loginText.png";
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

const Main = (props) => {
  const [page, setPage] = useState();
  const dispatch = useDispatch();
  const dogStaPostList = useSelector((state) => state.dogsta.mainList);
  const is_loading = useSelector((state) => state.sign.is_loading);
  const userId = localStorage.getItem("userId");

  // 올림픽공원
  const olympicList = useSelector((state) => state.post.olympic);
  const olympic = olympicList.slice(0, 4);
  const olympicListLength = olympicList.length;
  const [olympicTitle, setOlympicTitle] = useState("올림픽공원");
  const [olympicImage, setOlympicImage] = useState(Hangang);
  const [olympicDogName, setOlympicDogName] = useState();
  const [olympicTime, setOlympicTime] = useState();
  const [olympicLocation, setOlympicLocation] = useState("");
  const [postId, setPostId] = useState();

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

  // 날씨 + 주의사항 슬라이드 세팅
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

  // 개스타그램 슬라이드 세팅
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

  useEffect(() => {
    dispatch(dogStaActions.getAllPostMD());
    dispatch(postActions.getOlympicMD());
    dispatch(postActions.getSeoulMD());
    dispatch(postActions.getBanpoMD());
  }, []);

  if (is_loading) {
    return <Spinner />;
  }

  return (
    <>
      {/* 로고 + 알람 버튼 */}
      <TopWrap>
        <TopBar only_right>
          <img src={MainPageLogo} style={{ height: "30px" }} />
        </TopBar>
      </TopWrap>

      <Wrap>
        {/* 날씨 + 주의사항 슬라이드 */}
        <Slide>
          {!userId ? (
            <StyledSlider {...topSettings}>
              <Logo src={LoginLogoImg} onClick={() => history.push("/login")} />
            </StyledSlider>
          ) : (
            <StyledSlider {...topSettings} style={{ cursor: "pointer" }}>
              <Weather />
              <CautionCard
                onClick={() => {
                  history.push("/caution1");
                }}
              >
                <img src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80" />
                <div>
                  <h3>1. 목줄 착용</h3>
                  <p>목줄 착용은 <br /> 선택이 아닌 필수입니다</p>
                </div>
              </CautionCard>
              <CautionCard
                onClick={() => {
                  history.push("/caution2");
                }}
              >
                <img src="https://images.unsplash.com/photo-1544567708-827a79119a78?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80" />
                <div>
                  <h3>2. 사람 주의</h3>
                  <p>개를 무서워하는 사람들을<br/>주의 해야합니다.</p>
                </div>
              </CautionCard>
              <CautionCard
                onClick={() => {
                  history.push("/caution3");
                }}
              >
                <img src="https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" />
                <div>
                  <h3>3. 식물 주의</h3>
                  <p>상처가 날 수 있는 식물을<br />주의해야합니다.</p>
                </div>
              </CautionCard>
            </StyledSlider>
          )}
        </Slide>

        {/* 개스타그램 모음 */}
        <DogSta>
          <Header>
            <Text>오늘의 개스타</Text>
            <MoreBtn
              onClick={() => {
                history.push("/dogStaMain");
              }}
            >
              더보기
            </MoreBtn>
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

            <WholeCardWrap>
              <Part
                onClick={() => {
                  history.push(`/posts/${postId}`);
                }}
              >
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
                    setPostId(post.postId);
                  };

                  return (
                    <MainCardWrap onClick={hover}>
                      <MainCard post={post} key={index}>
                        <Image src={dogImage} />
                      </MainCard>
                    </MainCardWrap>
                  );
                })}
              </SubLists>
            </WholeCardWrap>
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

            <WholeCardWrap>
              <Part
                onClick={() => {
                  history.push(`/posts/${postId}`);
                }}
              >
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
                    setPostId(post.postId);
                  };

                  return (
                    <MainCardWrap onClick={hover}>
                      <MainCard post={post} key={index}>
                        <Image src={dogImage} />
                      </MainCard>
                    </MainCardWrap>
                  );
                })}
              </SubLists>
            </WholeCardWrap>
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

            <WholeCardWrap>
              <Part
                onClick={() => {
                  history.push(`/posts/${postId}`);
                }}
              >
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
                    setPostId(post.postId);
                  };

                  return (
                    <MainCardWrap onClick={hover}>
                      <MainCard post={post} key={index}>
                        <Image src={dogImage} />
                      </MainCard>
                    </MainCardWrap>
                  );
                })}
              </SubLists>
            </WholeCardWrap>
          </BanpoBodyWrap>
        </Body>
      </Wrap>

      <NavBar />
    </>
  );
};

const TopWrap = styled.div`
  margin: 0 30px;
`;
const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #c4c4c4;
  position: relative;
  margin-bottom: -40px;
`;
const Slide = styled.div`
  background-color: #fff;
  padding: 0 30px 40px 30px;
  box-sizing: border-box;
`;
const StyledSlider = styled(Slider)`
border: 1px solid blue;
  width: 100%;
  position: relative;
  /* aspect-ratio: 4 / 2; */
  /* padding-bottom: 50%; */
  overflow: hidden;
  border-radius: 14px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const Logo = styled.img`
  width: 80%;
  padding: 10px 50px;
`;
const CautionCard = styled.div`
  /* display: flex;
  flex-direction: row; */
  /* display: grid;
  grid-template-columns:48% 48% ;
  justify-content: space-between; */
  /* align-items: center; */
  /* position: relative; */
  /* aspect-ratio: 4 / 2; */
  height: 100%;
  border-radius: 14px;
  /* padding: 10px 20px; */
  img {
    /* position: absolute;
    top: 15%;
    left: 7%; */
    width: 50%;
    padding: 12px; 
    aspect-ratio: 1 / 1;
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25));
    border-radius: 14px;
    object-fit: cover;
    float: left;
  }
  div {
    /* position: absolute;
    top: 15%;
    right: 5%; */
    width: 50%;
    height: 100%;
    padding: 12px;
    float:right;
  }
  h3{
    padding-top:12px;
  }
  p{
    padding: 12px 0;
  }
`;

const WholeCardWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Part = styled.div`
  width: 100%;
  margin-bottom: 17px;
  background-color: #000;
  border-radius: 14px;
  cursor: pointer;
  position: relative;
  padding-bottom: 75%;
  overflow: hidden;
`;
const PartImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  opacity: 0.6;
  position: absolute;
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

const MainCardWrap = styled.div`
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
  width: 100%;
  margin-bottom: 32px;
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
