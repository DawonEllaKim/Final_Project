import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentList = ({ comment }) => {
  console.log(comment);
  const dispatch = useDispatch();
  const dogPostId = comment.dogPostId;
  console.log("댓글 작성한 포스트 id", dogPostId);
  const userId = localStorage.getItem("userId");
  console.log("로그인한 유저 id", userId);
  const commentId = comment.commentId;
  console.log("댓글 id", commentId);

  const userNickname = comment.userNickname;
  const desc = comment.commentDesc;
  const time = comment.AGOTIME;

  const commentList = useSelector((state) => state.comment.commentList);
  console.log(commentList);

  const editComment = () =>{
    
  }

  const delComment = () => {
    dispatch(commentActions.deleteCommentMD(dogPostId,commentId));
  };

  useEffect(() => {
    // dispatch(commentActions.getCommentMD( dogPostId));
  }, []);

  return (
    <div>
      <Wrap>
        <TextWrap>
          <User>{userNickname}</User>
          <Desc>{desc}</Desc>
          <Time>{time}</Time>
          {/* <Comment>댓글 달기</Comment> */}
        </TextWrap>

        {/* 댓글 작성한 본인만 수정/삭제 가능 */}
        {comment.userId == userId ? (
          <BtnWrap>
            <Edit onClick={editComment}>수정</Edit>
            <Delete onClick={delComment}>삭제</Delete>
          </BtnWrap>
        ) : null}
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TextWrap = styled.div``;
const User = styled.span``;
const Desc = styled.span``;
const Time = styled.span``;
const Comment = styled.button``;
const BtnWrap = styled.div``;
const Edit = styled.button``;
const Delete = styled.button``;

export default CommentList;
