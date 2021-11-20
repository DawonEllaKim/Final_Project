// DogStaMain.js - 개스타그램의 메인 페이지 (모든 게시물)
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";

// 이미지 + 아이콘
import dog from "../../image/dog.png";

const DogStaMain = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const postList = useSelector((state) => state.dogsta.mainList); // 개스타그램의 모든 게시물 리스트
  console.log(postList);

  // const postLike = useSelector((state) => state.dogsta);
  // console.log(postLike);
  // const likeList = useSelector((state) => state.dogsta).likeList;
  // console.log(likeList);

  // const liked = postList.filter(like, index) =>{
  //   return like.
  // }

  const [status, setStatus] = useState(); // 최신순, 추천순 중 택1
  const [focus, setFocus] = useState(); // 최신, 추천 중 택1 해서 글자 밑에 빨간 밑줄

  // 최신 순 버튼을 누르면 status값을 최신 순으로 변경
  const newest = () => {
    setStatus("newest");
  };

  // 추천 순 버튼을 누르면 status값을 추천 순으로 변경
  const mostLiked = () => {
    setStatus("mostLiked");
  };

  useEffect(() => {
    setStatus("newest");
    setFocus("newest");
    dispatch(dogstaActions.getAllPostMD()); // 개스타그램의 모든 게시물 불러오기
    // dispatch(dogstaActions.getLikePostMD());
  }, []);

  return (
    <Wrap>
      {/* 제일 상단 고정 버튼 */}
      <TopBar>
        <TopBarImg src={dog} />
        <span>개스타그램</span>
      </TopBar>

      {/* 추천, 최신 정렬 + 게시물 추가 버튼 */}
      <Head>
        <Category>
          <button
            onClick={newest}
            onFocus={() => setFocus("newest")}
            style={{ borderBottom: focus === "newest" ? "4px solid red" : "" }}
          >
            최신
          </button>
          <button
            onClick={mostLiked}
            onFocus={() => setFocus("mostLiked")}
            style={{ borderBottom: focus === "newest" ? "" : "4px solid red" }}
          >
            추천
          </button>
        </Category>
      </Head>

      {/* 게시물 목록 - 최신순, 추천순*/}
      {status === "newest" ? (
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
                    <img
                      src={post.dogPostImage}
                      onClick={() =>
                        history.push(
                          `/dogStaDetail/${post.userId}/${post.dogPostId}`
                        )
                      }
                    />

                    {/* 포스트 정보 */}
                    <PostInfo>
                      <p
                        onClick={() =>
                          history.push(
                            `/dogStaDetail/${post.userId}/${post.dogPostId}`
                          )
                        }
                      >
                        {post.dogPostDesc}
                      </p>
                      <WriterInfo
                        onClick={() => {
                          history.push(`/mypage/${post.userId}`);
                        }}
                      >
                        <img src={post.userImage} />
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
          <NavBar add_dogsta />
        </Body>
      ) : (
        <div>아직 추천 순 정렬 x</div>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: auto;
  margin-bottom: 150px;
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
  height: 40px;
  margin: 30px auto 130px auto;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px 32px 40px;
`;
// const Category = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 16px;
//   width: 110px;
// `;
const Category = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
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
  border: 1px solid red;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 48% 48%;
  row-gap: 20px;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 150px;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
  }
`;
const Card = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  padding-bottom: 10px;
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3px 7px;
  /* margin: 4px; */
  p {
    margin-bottom: 20px;
  }
`;
const WriterInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  height: 20px;
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 4px;
  }
  span {
    margin-right: 45px;
  }
`;
const LikeInfo = styled.div``;

export default DogStaMain;
