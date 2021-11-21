import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentList = ({ comment }) => {
  const dispatch = useDispatch();
  console.log(comment);
  const [commentDesc, setCommentDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const userId = localStorage.getItem("userId");
  console.log("로그인한 유저 id", userId);
  const commentId = comment.commentId;
  console.log("댓글 id", commentId);

  const userNickname = comment.userNickname;
  const desc = comment.commentDesc;
  const time = comment.AGOTIME;

  const commentList = useSelector((state) => state.comment.commentList);
  console.log(commentList);
  const dogPostId = comment.dogPostId;

  const editComment = () => {
    setEdit(true);
    console.log(commentId)
  };

  const commentChangeHandler = (e) => {
    setCommentDesc(e.target.value);
  };
  
  const completeEdit = () =>{
    const newComment = {
      commentDesc
    }
    console.log(commentId)
    dispatch(commentActions.editCommentMD(dogPostId, commentId, newComment))
    setEdit(false);
  }

  const cancleEdit = () => {
    setEdit(false);
  };

  const delComment = () => {
    dispatch(commentActions.deleteCommentMD(dogPostId, commentId));
  };

  useEffect(() => {
    setCommentDesc(desc);
  }, [desc]);

  return (
    <div>
      <Wrap>
        <TextWrap>
          <User>{userNickname}</User>
          {edit ? (
            <input
              type="text"
              value={commentDesc}
              onChange={commentChangeHandler}
            />
          ) : (
            <Desc>{desc}</Desc>
          )}
          <Time>{time}</Time>
          {/* <Comment>댓글 달기</Comment> */}
        </TextWrap>

        {/* 댓글 작성한 본인만 수정/삭제 가능 */}
        {comment.userId == userId ? (
          <BtnWrap>
            {edit ? (
              <div>
                <Edit onClick={completeEdit}>완료</Edit>
                <button onClick={cancleEdit}>취소</button>
              </div>
            ) : (
              <div>
                <Edit onClick={editComment}>수정</Edit>
                <Delete onClick={delComment}>삭제</Delete>
              </div>
            )}
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
