import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 리덕스
import { actionCreators as commentActions } from "../../redux/modules/comment";
import { history } from "../../redux/configureStore";

// 아이콘
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

const CommentList = ({ comment }) => {
  const dispatch = useDispatch();
  const [commentDesc, setCommentDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const userId = localStorage.getItem("userId"); // 로그인한 유저 id
  const commentId = comment.commentId; // 댓글 id

  const userNickname = comment.userNickname;
  const desc = comment.commentDesc;
  const time = comment.AGOTIME;
  const dogPostId = comment.dogPostId;
  const commentUserId = comment.userId;

  // 댓글 수정
  const editComment = () => {
    setEdit(true);
  };

  const commentChangeHandler = (e) => {
    setCommentDesc(e.target.value);
  };

  // 댓글 삭제
  const delComment = () => {
    dispatch(commentActions.deleteCommentMD(dogPostId, commentId));
  };

  // 댓글 수정 완료
  const completeEdit = () => {
    const newComment = {
      commentDesc,
    };
    dispatch(commentActions.editCommentMD(dogPostId, commentId, newComment));
    setEdit(false);
  };

  // 댓글 수정 취소
  const cancleEdit = () => {
    setEdit(false);
  };

  useEffect(() => {
    setCommentDesc(desc);
  }, [desc]);

  return (
    <div>
      <Wrap>
        <TextWrap>
          <Left>
            <User
              onClick={() => {
                history.push(`/mypage/${commentUserId}`);
              }}
            >
              {userNickname}
            </User>
          </Left>
          <Right>
            {/* 댓글 수정시 input창으로 바뀜 */}
            {edit ? (
              <div>
                <EditText
                  type="text"
                  value={commentDesc}
                  onChange={commentChangeHandler}
                />
                <Time>{time}</Time>
              </div>
            ) : (
              <div>
                <Desc>{desc}</Desc>
                <Time>{time}</Time>
              </div>
            )}
          </Right>
          {/* <Comment>댓글 달기</Comment> */}
        </TextWrap>

        {/* 댓글 작성한 본인만 수정/삭제 가능 */}
        {comment.userId == userId ? (
          <BtnWrap>
            {edit ? (
              <div>
                <Edit onClick={completeEdit} size='120'>
                  <DoneIcon sx={{ fontSize: 22 }} />
                </Edit>
                <Cancle onClick={cancleEdit}>
                  <CloseIcon sx={{ fontSize: 20 }} />
                </Cancle>
              </div>
            ) : (
              <div>
                <Edit onClick={editComment}>
                  <ModeEditIcon sx={{ fontSize: 22 }} />
                </Edit>
                <Delete onClick={delComment}>
                  <CloseIcon sx={{ fontSize: 22 }} />
                </Delete>
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
  font-size: 14px;
  padding: 2px 0;
`;
const TextWrap = styled.div`
  display: flex;
  justify-content: left;
  width: calc(100% - 68px);
`;
const Left = styled.div`
  margin-right: 12px;
`;
const User = styled.span`
  font-weight: 600;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
const Desc = styled.div`
  word-break: break-all;
`;
const Time = styled.span`
  font-size: 12px;
  color: #bdbdbd;
`;
const EditText = styled.input`
  display: block;
  width: 100%;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
  padding: 4px;
  &:focus {
    outline: none;
  }
`;

const BtnWrap = styled.div`
  width: 58px;
`;
const Edit = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #bdbdbd;
  margin-right: 8px;
`;
const Delete = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #bdbdbd;
`;
const Cancle = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #bdbdbd;
`;

export default CommentList;
