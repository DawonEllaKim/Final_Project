import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";

const Comment = (props) => {
  const { post, postId, currentPostUserId, userId } = props;
  console.log(post);

  console.log("현재 게시물 정보", post);
  console.log("현재 게시물 페이지 id", postId);
  console.log("현재 게시물 쓴 유저 id", currentPostUserId);
  console.log("로그인 한 유저 아이디", userId);

  // 댓글 작성한 페이지 포스트아이디
  const dogPostId = post.dogPostId;
  console.log("댓글작성 페이지 id", dogPostId);

  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.commentList);
  console.log(commentList);

  // 현재 게시물 페이지 id와 작성한 댓글 페이지 id가 같은 경우
  // 해당 페이지에서 작성한 댓글만 가져오기
  const postCommentList = commentList.filter((comment, index) => {
    return comment.dogPostId == postId;
  });
  console.log(postCommentList);

  useEffect(() => {
    dispatch(commentActions.getCommentMD());
  }, []);

  return (
    <div>
      <Wrap>
        <Count>댓글 10개</Count>
        <CommentWrap>
          {postCommentList.map((comment, index) => {
            return (
              <div>
                <CommentList comment={comment} key={index} />
              </div>
            );
          })}
        </CommentWrap>
        <CommentWrite
          post={post}
          postId={postId}
          currentPostUserId={currentPostUserId}
          userId={userId}
          dogPostId={dogPostId}
        />
      </Wrap>
    </div>
  );
};

const Wrap = styled.div``;
const Count = styled.div``;
const CommentWrap = styled.div`
  border-top: 1px solid #dbdbdb;
`;

export default Comment;
