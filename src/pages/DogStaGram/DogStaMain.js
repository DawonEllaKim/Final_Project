// DogStaMain.js - 개스타그램의 메인 페이지 (모든 게시물)
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from 'react-intersection-observer'

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Loading from "../../components/Loading";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";

// 이미지 + 아이콘
import dog from "../../image/dog.png";

const DogStaMain = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const postList = useSelector((state) => state.dogsta.mainList); // 개스타그램의 모든 게시물 리스트
  
  const postList = useSelector((state) => state.dogsta.mainListTest)
  console.log(postList);
  const postLike = useSelector((state) => state.dogsta.mainLikeList); // 개스타그램 좋아요 순 리스트

  const [status, setStatus] = useState(); // 최신순, 추천순 중 택1
  const [focus, setFocus] = useState(); // 최신, 추천 중 택1 해서 글자 밑에 빨간 밑줄
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() =>{
    dispatch(dogstaActions.getFirstRecentMD(pageNumber));
    // dispatch(dogstaActions.getMoreRecentMD(pageNumber));
  },[])

  // useEffect(() =>{
  //   // dispatch(dogstaActions.getFirstRecentMD(pageNumber));
  //   dispatch(dogstaActions.getMoreRecentMD(pageNumber));
  // },[pageNumber])

  // 무한스크롤 intersection observer
  const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [cardLists, setCardLists] = useState([]);
  const [ref, inView] = useInView();

  // useEffect(() =>{
  //   console.log(cardLists);
  // },[cardLists]);

  const getMoreCard = async() =>{
    setLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // let Cards = [1,2,3,4,5,6,7,8,9,10];
    // setCardLists((cardLists) => cardLists.concat(Cards));

    setPageNumber(pageNumber + 1);
    setLoading(false);
    console.log(pageNumber)
  }

  //   useEffect(() =>{
  //   console.log(pageNumber)
  // },[pageNumber])

  // const onIntersect = async ([entry], observer) =>{
  //   if (entry.isIntersecting && !loading){
  //     observer.unobserve(entry.target);
  //     await getMoreCard();
  //     // setLoading(true);
  //     // setLoading(false);
  //     observer.observe(entry.target);
  //   }
  // }

  // useEffect(()=>{
  //   let observer;
  //   if(target) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.5,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target])
  
  useEffect(() =>{
    if(inView) {
      getMoreCard();
      console.log('로딩중')
    }
  },[inView])


  // 최신 순 버튼을 누르면 status값을 최신 순으로 변경
  const newest = () => {
    setStatus("newest");
    setFocus("newest");
  };

  // 추천 순 버튼을 누르면 status값을 추천 순으로 변경
  const mostLiked = () => {
    setStatus("mostLiked");
    setFocus("mostLiked");
  };



  useEffect(() => {
    setStatus("newest");
    setFocus("newest");
    
    dispatch(dogstaActions.getAllPostMD()); // 개스타그램의 모든 게시물 불러오기
    dispatch(dogstaActions.getLikePostMD()); // 개스타그램 게시물 좋아요순


    // dispatch(dogstaActions.getFirstRecentMD(1))
    // dispatch(dogstaActions.getMoreRecentMD(pageNumber))

  }, []);

  if(loading){
    return <Loading />
  }
  console.log(inView)


  return (
    <>
      {" "}
      <Wrap>
        {/* 제일 상단 고정 버튼 */}
        <TopBar home>
          <TopBarImg src={dog} />
          <span>개스타그램</span>
        </TopBar>

        {/* 추천, 최신 정렬 + 게시물 추가 버튼 */}
        <Head>
          <Category>
            <button
              onClick={newest}
              onFocus={() => setFocus("newest")}
              style={{
                borderBottom: focus === "newest" ? "4px solid red" : "",
                color: focus === "newest" ? "#ff5656" : "#000",
              }}
            >
              최신
            </button>
            <button
              onClick={mostLiked}
              onFocus={() => setFocus("mostLiked")}
              style={{
                borderBottom: focus === "newest" ? "" : "4px solid red",
                color: focus === "newest" ? "#000" : "#ff5656",
              }}
            >
              추천
            </button>
          </Category>
        </Head>

        {/* 게시물 목록 - 최신순, 추천순*/}
        {status === "newest" ? (
          // 최신순 정렬
          <Body>
            {/* 개스타그램 게시물의 유무 판단*/}
            {postList.length == 0 ? (
              <>
                <NoCard>게시물이 아직 없습니다. 작성해주세요.</NoCard>
                <Button
                  onClick={() => {
                    history.push("/dogStaWrite");
                  }}
                >
                  게시물 작성하기
                </Button>
              </>
            ) : (
              <Posts>
                {postList.map((post, index) => {
                  return (
                    
                    <Card key={index}>
                      {/* 포스트 사진 */}
                      <ImageWrap>
                        <CardImage
                          src={post.dogPostImage}
                          onClick={() =>
                            history.push(
                              `/dogStaDetail/${post.userId}/${post.dogPostId}`
                            )
                          }
                        />
                      </ImageWrap>

                      {/* 포스트 정보 */}
                      <PostInfo>
                        <WriterInfo
                          onClick={() => {
                            history.push(`/mypage/${post.userId}`);
                          }}
                        >
                          <UserImage src={post.userImage} />
                          <span>{post.userNickname}</span>
                        </WriterInfo>
                        <LikeInfo>
                          <span>like</span>
                          {post.count}
                        </LikeInfo>
                      </PostInfo>
                    </Card>
                    
                  );
                })}
              </Posts>
            )}
                {/* intersection observer */}
                <div ref={ref}>
                  {loading && <Loading />}
                </div>
          </Body>
        ) : (
          // 추천순 정렬
          <Body>
            {/* 개스타그램 게시물의 유무 판단*/}
            {postList.length == 0 ? (
              <>
                <NoCard>게시물이 아직 없습니다. 작성해주세요.</NoCard>
                <Button
                  onClick={() => {
                    history.push("/dogStaWrite");
                  }}
                >
                  게시물 작성하기
                </Button>
              </>
            ) : (
              <Posts>
                {postLike.map((post, index) => {
                  return (
                    <Card key={index}>
                      {/* 포스트 사진 */}
                      <ImageWrap>
                        <CardImage
                          src={post.dogPostImage}
                          onClick={() =>
                            history.push(
                              `/dogStaDetail/${post.userId}/${post.dogPostId}`
                            )
                          }
                        />
                      </ImageWrap>

                      {/* 포스트 정보 */}
                      <PostInfo>
                        <WriterInfo
                          onClick={() => {
                            history.push(`/mypage/${post.userId}`);
                          }}
                        >
                          <UserImage src={post.userImage} />
                          <span>{post.userNickname}</span>
                        </WriterInfo>
                        <LikeInfo>
                          <span>like</span>
                          {post.count}
                        </LikeInfo>
                      </PostInfo>
                    </Card>
                  );
                })}
              </Posts>
            )}

            {/* 하단 고정 버튼  */}
          </Body>
        )}
      </Wrap>
      <NavBar add_dogsta />
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /* margin: auto; */
  padding: 0 5%;
`;
const NoCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 20px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 160px;
  padding: 16px 0;
  margin: 30px auto;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 10px;
  border: 1px gray;
`;
const TopBarImg = styled.img`
  width: 24px;
  height: 24px;
  margin: -4px 10px;
`;
const Head = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    box-sizing: border-box;
    width: 70px;
    margin: 0 10px;
    padding-bottom: 10px;
    background-color: transparent;
    border: none;
    text-align: center;
    cursor: pointer;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Posts = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 48% 48%;
  row-gap: 20px;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;
const Card = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;
const ImageWrap = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
`;
const CardImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;
const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 10px 8px 10px;
`;
const WriterInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  span {
    font-size: 14px;
  }
`;

const UserImage = styled.img`
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 4px;
`;

const LikeInfo = styled.div`
  margin-right: 4px;
  span {
    display: inline-block;
    font-size: 14px;
    color: #888;
    margin: 0 4px 2px 0;
  }
`;

export default DogStaMain;
