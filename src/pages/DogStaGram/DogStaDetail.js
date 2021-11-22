// DogStaDetail.js - 개스타그램 게시물 하나에 대한 상세페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Comment from "../../components/DogstaComment/Comment";
import CommentList from "../../components/DogstaComment/CommentList";
import CommentWrite from "../../components/DogstaComment/CommentWrite";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";
import { actionCreators as commentActions } from "../../redux/modules/comment";

// 아이콘
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const DogStaDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => state.dogsta.eachList); // 현재 개스타그램 게시물 정보
  const postId = props.match.params.dogPostId; // 현재 개스타그램 게시물의 아이디
  const currentPostUserId = props.match.params.userId; // 현재 게시물을 쓴 사람의 아이디
  const userId = localStorage.getItem("userId"); // 현재 로그인 한 사람의 아이디

  const likeCnt = useSelector((state) => state.dogsta.likeCnt); // 게시물 좋아요 수
  const myLike = useSelector((state) => state.dogsta.likeExist); // 게시물 좋아요 여부
  const commentList = useSelector((state) => state.comment.commentList);

  const [liked, setLiked] = useState(Boolean);
  const [likeCount, setLikeCount] = useState();

  const toggleLike = () => {
    if (liked === true) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      if (likeCount < 0) {
        return;
      }
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
    dispatch(dogstaActions.toggleLikeMD(postId, liked));
  };

  const editPost = () => {
    history.push(`/dogStaEdit/${currentPostUserId}/${postId}`);
  };

  const deletePost = () => {
    dispatch(dogstaActions.deletePostMD(postId)); // 삭제하기 함수
  };

  useEffect(() => {
    dispatch(dogstaActions.getPostMD(currentPostUserId, postId)); // 현재 개스타그램 게시물 정보 불러오기
    dispatch(dogstaActions.getLikesMD(postId)); // 현재 게시물 좋아요 갯수
    dispatch(dogstaActions.getMyLikeMD(postId));
    dispatch(commentActions.getCommentMD(postId));
    setLiked(myLike);
    setLikeCount(likeCnt);
  }, [myLike, likeCnt, postId]);

  return (
    <Wrap>
      {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 */}
      <TopBar>{post.userNickname}님의 게시물</TopBar>

      {/* 유저 정보 */}
      <UserInfo
        onClick={() => {
          history.push(`/mypage/${post.userId}`);
        }}
      >
        <UserInfoLeft>
          {/* 유저 사진 */}
          <UserImg src={post.userImage} />
        </UserInfoLeft>

        <UserRight>
          {/* 유저 닉네임 + 유저 주소 */}
          <div>
            <span>{post.userNickname}</span>
            {/* <span style={{ color: "#5F5F5F" }}>{post.userLocation}</span> */}
          </div>
        </UserRight>
      </UserInfo>

      {/* 게시물 부분 */}
      <Write>
        {/* 게시물 이미지 */}
        <ImageWrap>
          <PostImage src={post.dogPostImage} />
        </ImageWrap>

        {/* 작성자 이미지 + 작성자 닉네임 + 게시물 글*/}
        <PostInfo>
          <Like>
            {/* 좋아요 버튼 토글 */}
            {liked ? (
              <FavoriteIcon onClick={toggleLike} style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon onClick={toggleLike} />
            )}
            {likeCount}
          </Like>

          <span>댓글 {commentList.length}</span>

          {/* 현재 게시물을 적은 유저 = 현재 로그인 한 유저가 같을때에는 수정하기 삭제하기 버튼 보여주기 */}
          {currentPostUserId === userId && (
            <BtnWrap>
              <button onClick={editPost}>수정</button>
              <button onClick={deletePost}>삭제</button>
            </BtnWrap>
          )}
        </PostInfo>
        <PostDesc>{post.dogPostDesc}</PostDesc>
        <Time>{post.AGOTIME}</Time>
      </Write>

      {/* 댓글 */}
      {/* <Comment
        post={post}
        currentPostUserId={currentPostUserId}
        userId={userId}
      /> */}

<CommentWrap>
          {commentList[0] ? (
            <div>
              {commentList.map((comment, index) => {
                return (
                  <div>
                    <CommentList comment={comment} key={index} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>등록된 댓글이 없습니다.</div>
          )}
        </CommentWrap>
        <CommentWrite
          // post={post}
          // currentPostUserId={currentPostUserId}
          // commentList = {commentList}
          userId={userId}
          postId={postId}
        />
      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
  );
};
const Wrap = styled.div`
  padding: 0 30px;
`;
const UserInfo = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  /* height: 88px; */
  margin-bottom: 24px;
  cursor: pointer;
`;
const UserInfoLeft = styled.div`
  /* position: relative; */
  /* width: 91px;
  height: 88px; */
  margin-right: 16px;
`;
const UserRight = styled.div`
  width: 100%;
  /* display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; */
  cursor: pointer;
  /* div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */
  span {
    font-weight: 600;
  }
`;
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  padding: 2px;
  border-radius: 50%;
  object-fit: cover;
`;
const Write = styled.div`
  width: 100%;
  border: 1px solid blue;
`;
const ImageWrap = styled.div`
  width: 100%;
  border-radius:14px;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  border-radius: 14px;
`;
const PostInfo = styled.div`
  border: 1px solid black;

  /* position: absolute; */
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  margin: 12px 0;
  /* img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
    border-radius: 50%;
  } */
`;
const Time = styled.div`
  font-size: 14px;
  color: #bdbdbd;
  margin: 12px 0; 
`
const UserNickname = styled.p`
  margin-right: 10px;
`;
const Like = styled.span``;
const BtnWrap = styled.div`
border: 1px solid red;
  position: relative;
  top: 0;
  right: 0;
  display: flex;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
const PostDesc = styled.p``;

const CommentWrap = styled.div`
  border-top: 1px solid #dbdbdb;
`;

export default DogStaDetail;
