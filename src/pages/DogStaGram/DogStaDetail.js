// DogStaDetail.js - 개스타그램 게시물 하나에 대한 상세페이지
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Comment from "../../components/DogstaComment/Comment";

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
  
  console.log(post);
  console.log(postId);
  console.log(currentPostUserId);
  console.log(userId);

  const likeCnt = useSelector((state) => state.dogsta.likeCnt.count); // 게시물 좋아요 수
  const myLike = useSelector((state) => state.dogsta.likeExist) // 게시물 좋아요 여부

  console.log(likeCnt);
  console.log(myLike);

  // const [liked, setLiked] = useState(!myLike);
  const [liked,setLiked] = useState(Boolean)
  const [likeCount, setLikeCount] = useState(likeCnt);

  console.log(liked);
  const toggleLike = () => {
  //   // setLiked(!liked);

    if(liked === true){
      setLiked(false);
      setLikeCount(likeCount - 1);
      if(likeCount<0){
        return;
      }
    }else{
      setLiked(true);
      setLikeCount(likeCount +1);
    }
    dispatch(dogstaActions.toggleLikeMD(postId, liked));
  };

  console.log(liked)
  console.log(likeCount)
  
  const editPost = () => {

    history.push(`/dogStaEdit/${currentPostUserId}/${postId}`)

  };

  const deletePost = () => {
    dispatch(dogstaActions.deletePostMD(postId)); // 삭제하기 함수
  };

  useEffect(() => {
    dispatch(dogstaActions.getPostMD(currentPostUserId, postId)); // 현재 개스타그램 게시물 정보 불러오기
    dispatch(dogstaActions.getLikesMD(postId)); // 현재 게시물 좋아요 갯수
    dispatch(dogstaActions.getMyLikeMD());

    setLiked(myLike);
    console.log(myLike);
  }, [myLike]);

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
            <span style={{ fontWeight: "400" }}>{post.userNickname}</span>
            <span style={{ color: "#5F5F5F" }}>{post.userLocation}</span>
          </div>
        </UserRight>
      </UserInfo>

      {/* 게시물 부분 */}
      <Write>
        {/* 게시물 이미지 */}
        <img src={post.dogPostImage} />

        {/* 작성자 이미지 + 작성자 닉네임 + 게시물 글*/}
        <PostInfo>
          <img src={post.userImage} />
          <UserNickname>{post.userNickname}</UserNickname>
          <Like>
          {/* 좋아요 버튼 토글 */}
          {liked ? (
            <FavoriteIcon 
              onClick={toggleLike} 
              style={{ color: "red" }} 
            />
          ) : (
            <FavoriteBorderIcon 
              onClick={toggleLike} 
            />
          )}
          {likeCount}
          </Like>
        </PostInfo>
        <PostDesc>{post.dogPostDesc}</PostDesc>
      </Write>

      {/* 댓글 */}
      <Comment
        post={post}
        currentPostUserId={currentPostUserId}
        userId={userId}
      />

      {/* 현재 게시물을 적은 유저 = 현재 로그인 한 유저가 같을때에는 수정하기 삭제하기 버튼 보여주기 */}
      {currentPostUserId === userId && (
        <BottomBtn>
          <button onClick={editPost}>수정하기</button>
          <button onClick={deletePost}>삭제하기</button>
        </BottomBtn>
      )}

      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
  );
};
const Wrap = styled.div`
  box-sizing: border-box;
  width: 390px;
  margin: auto;
  padding: 0 20px 150px 20px;
`;
const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 88px;
  margin-bottom: 24px;
  cursor: pointer;
`;
const UserInfoLeft = styled.div`
  position: relative;
  width: 91px;
  height: 88px;
  margin-right: 16px;
`;
const UserRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const UserImg = styled.img`
  width: 83px;
  height: 83px;
  padding: 2px;

  margin-right: 14.5px;
  border-radius: 50%;
  object-fit: cover;
`;
const Write = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  img {
    width: 100%;
    object-fit: cover;
  }
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
    border-radius: 50%;
  }
`;
const UserNickname = styled.p`
  margin-right: 10px;
`;
const Like = styled.p``
const PostDesc = styled.p``;
const BottomBtn = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 52px;
  margin: 30px auto 130px auto;
  button {
    width: 160px;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 1px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

export default DogStaDetail;
