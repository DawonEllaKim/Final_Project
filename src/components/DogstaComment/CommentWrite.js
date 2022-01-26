// CommentWrite.js - 개스타그램 댓글 작성 컴포넌트
import React, { useState } from "react";
import { history } from "../../redux/configureStore";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// 리덕스
import { actionCreators as commentActions } from "../../redux/modules/comment";

const CommentWrite = (props) => {
  const { postId, userId, userImage } = props;
  const dispatch = useDispatch();
  const userNickname = localStorage.getItem("userNickname");
  const [commentDesc, setCommentDesc] = useState("");
  // 댓글이 비었으면 경고문구
  const [alertComment, setAlertComment] = useState("");

  const commentChange = (e) => {
    setCommentDesc(e.target.value);
  };

  const addComment = () => {
    if (commentDesc == "") {
      setAlertComment("댓글이 입력되지 않았습니다");
      return;
    }
    const comment = {
      commentDesc,
      userNickname,
      postId,
      userId,
    };
    dispatch(commentActions.addCommentMD(postId, comment));
    setCommentDesc("");
    setAlertComment("");
  };

  return (
    <div>
      <Wrap>
        <WriteWrap>
          {/* 유저 이미지 */}
          <UserImage
            src={userImage}
            onClick={() => {
              history.push(`/mypage/${userId}`);
            }}
          />
          {/* 댓글 작성 input */}
          <CommentInput
            placeholder="댓글을 입력하세요"
            onChange={commentChange}
            value={commentDesc}
          ></CommentInput>
          <CommentAdd onClick={addComment}>등록</CommentAdd>
        </WriteWrap>
        <Alert>{alertComment ? alertComment : ""}</Alert>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
const WriteWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;
const UserImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
  cursor: pointer;
`;
const CommentInput = styled.input`
  display: block;
  width: calc(100% - 60px);
  height: 45px;
  font-size: 16px;
  border: 1px solid #bdbdbd;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 33.5px;
  padding: 0px 100px 0px 20px;
  &:focus {
    outline: none;
  }
`;
const CommentAdd = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  border: none;
  background-color: transparent;
  color: #ff5656;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Alert = styled.div`
  margin-left: 80px;
  color: #ff5656;
  font-size: 14px;
  margin-top: 4px;
`;

export default CommentWrite;
