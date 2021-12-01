// OutBox.js - 내가 보낸 쪽지들이 다 모여있는 보낸 쪽지함
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// 리덕스
import { history } from "../../redux/configureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";
//쓰레기통 이미지
import trash from "../../image/tra.png";
const OutBox = ({ box }) => {
  const dispatch = useDispatch();

  const chatId = box.chatId; // 보낸 쪽지의 고유 아이디
  const receiverImage = box.receiverImage;
  const receiverNickname = box.receiverNickname;
  const myNickname = localStorage.getItem("userNickname"); // 나의 닉네임
  const myImage = localStorage.getItem("image"); // 나의 프로필 사진
  const message = box.message; // 보낸 쪽지의 내용
  const time = box.createdAt; // 쪽지 보낸 시간

  const deleteBtn = () => {
    const receiverId = box.receiverId;
    const senderId = Number(box.senderId);
    const chatId = box.chatId;
    dispatch(chatActions.deleteOutMessageMD(receiverId, senderId, chatId));
  };

  return (
    <Wrap>
      <Top>
        <Left
          onClick={() => {
            history.push(`/chatdetail/${chatId}`);
          }}
        >
          <img src={receiverImage} />
        </Left>

        <Right>
          <div>{receiverNickname}님 에게</div>
          <Message
            onClick={() => {
              history.push(`/chatsend/${chatId}`);
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

export default OutBox;
