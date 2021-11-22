import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import comment, {
  actionCreators as commentActions,
} from "../../redux/modules/comment";

import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";

const Comment = (props) => {
  const { post, currentPostUserId, userId } = props;

  // 댓글 작성한 페이지 포스트아이디
  const dogPostId = post.dogPostId;
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.commentList);
  console.log(commentList);

  //   현재 게시물 페이지 id와 작성한 댓글 페이지 id가 같은 경우
  //   해당 페이지에서 작성한 댓글만 가져오기
  // const postCommentList = commentList.filter((comment, index) => {
  //   return comment.dogPostId == dogPostId;
  // });
  // console.log(postCommentList);

  useEffect(() => {
    dispatch(commentActions.getCommentMD(dogPostId));
  }, [dogPostId]);

  return (
    <div>
      <Wrap>
        <Count>댓글 {commentList.length}개</Count>
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
