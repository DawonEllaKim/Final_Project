// InBox.js - 받은 쪽지함
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//쓰레기통 이미지
import trash from "../../image/tra.png";
// 리덕스
import { history } from "../../redux/configureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";

const InBox = ({ box }) => {
  const dispatch = useDispatch();

  const chatId = box.chatId; // 받은 쪽지의 고유 아이디
  const senderImage = box.senderImage; // 쪽지 보낸 사람의 프로필 사진
  const senderNickname = box.senderNickname; // 쪽지 보낸 사람의 닉네임
  const message = box.message; // 받은 쪽지의 내용
  const time = box.createdAt; // 쪽지 받은 시간

  const deleteBtn = () => {
    const receiverId = box.receiverId;
    const senderId = Number(box.senderId);
    const chatId = box.chatId;
    dispatch(chatActions.deleteInMessageMD(receiverId, senderId, chatId));
  };
  useEffect(() => {
    // dispatch(chatActions.inBoxMD()); // 내가 받은 모든 쪽지 불러오기
  }, []);

  return (
    <Wrap>
      <Top>
        <Left
          onClick={() => {
            history.push(`/chatdetail/${chatId}`);
          }}
        >
          <img src={senderImage} />
        </Left>

        <Right>
          <div>{senderNickname}</div>
          <Message
            onClick={() => {
              history.push(`/chatdetail/${chatId}`);
            }}
          >
            {message}
          </Message>
        </Right>
      </Top>
      <Bottom>
        <Time>{box.AGOTIME}</Time>
        <DeleteBtn onClick={deleteBtn}>
          <img src={trash} />
        </DeleteBtn>
      </Bottom>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 4px 0;
  margin: 0.5rem;
  cursor: pointer;
  /* height: 6.5em; */

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius: 15px;
  position: relative;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

const Left = styled.div`
  img {
    width: 3em;
    height: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Right = styled.div`
  width: 80%;
  div {
    font-size: 14px;
    padding-bottom: 2px;
  }
`;
const Message = styled.div`
  max-height: 2.8rem;
  overflow: hidden;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;
const Time = styled.div`
  padding-right: 10px;
  padding-bottom: 2px;
  font-size: 12px;
`;
const DeleteBtn = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`;

export default InBox;
