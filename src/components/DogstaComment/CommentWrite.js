import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentWrite = (props) => {
  const { dogPostId, userId } = props;
  const dispatch = useDispatch();
  console.log(dogPostId, userId);
  // 댓글작성 유저 아이디(내아이디) => 닉네임으로 바꿔야함
  const userNickname = localStorage.getItem("userNickname");
  console.log(userNickname);

  const [commentDesc, setCommentDesc] = useState("");

  const commentChange = (e) => {
    setCommentDesc(e.target.value);
  };

  const addComment = () => {
    const comment = {
      commentDesc,
      userNickname,
      dogPostId,
      userId,
    };
    // console.log(comment);
    dispatch(commentActions.addCommentMD(dogPostId, comment));
    setCommentDesc("");
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
  display: flex;
  justify-content: space-between;
`;
const CommentInput = styled.input``;
const CommentAdd = styled.button``;

export default CommentWrite;
