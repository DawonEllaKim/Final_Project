import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentWrite = (props) => {
  const { postId, userId } = props;
  const dispatch = useDispatch();
  const userNickname = localStorage.getItem("userNickname");
  const [commentDesc, setCommentDesc] = useState("");

  const commentChange = (e) => {
    setCommentDesc(e.target.value);
  };

  const addComment = () => {
    const comment = {
      commentDesc,
      userNickname,
      postId,
      userId,
    };
    dispatch(commentActions.addCommentMD(postId, comment));
    setCommentDesc(null);
  };

  return (
    <div>
      <Wrap>
        <CommentInput
          placeholder="댓글을 입력하세요"
          onChange={commentChange}
        ></CommentInput>
        <CommentAdd onClick={addComment}>등록</CommentAdd>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const CommentInput = styled.input`
  display: block;
  width: 100%;
  border: none;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 33.5px;
  padding: 12px 60px 12px 20px;
  &:focus {
    outline: none;
  }
`;
const CommentAdd = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  border: none;
  background-color:transparent;
  color: #ff5656;
  font-weight: 600;
  cursor: pointer;
`;

export default CommentWrite;
