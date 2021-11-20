import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";

const Comment = (props) => {
  const { post, currentPostUserId, userId } = props;

  // 댓글 작성한 페이지 포스트아이디
  const dogPostId = post.dogPostId;
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.commentList);

  useEffect(() => {
    dispatch(commentActions.getCommentMD(userId, dogPostId));
  }, [userId, dogPostId]);

  return (
    <div>
      <Wrap>
        <Count>댓글 10개</Count>
        <CommentWrap>
          {commentList.map((comment, index) => {
            return (
              <div>
                <CommentList comment={comment} key={index} />
              </div>
            );
          })}
        </CommentWrap>
        <CommentWrite
          post={post}
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
