// OutBox.js - 내가 보낸 쪽지들이 다 모여있는 보낸 쪽지함
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

// 리덕스
import { history } from "../../redux/configureStore";
import { actionCreators as chatActions } from "../../redux/modules/chat";
//쓰레기통 이미지
import trash from "../../image/tra.png"
const OutBox = ({ box }) => {
  const dispatch = useDispatch();

  const chatId = box.chatId; // 보낸 쪽지의 고유 아이디
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
      <Left
        onClick={() => {
          history.push(`/chatdetail/${chatId}`);
        }}
      >
        <img src={myImage} />
        <span>{myNickname}</span>
      </Left>

      <Right>
      <Message>{message}</Message>
 
      <Info>
    <Time>{box.AGOTIME}</Time>
      <DeleteBtn onClick={deleteBtn}><img src={trash}/></DeleteBtn>
     </Info>
      </Right>

    </Wrap>
  );
};

const Message = styled.div
`
display:flex;
width:100%;
height:80%;
justify-content:flex-start;
align-items:center;
padding-top:10px;
`
const Info = styled.div
`
display:flex;
width:100%;
justify-content:flex-end;
align-items:center;
padding-right:1rem;
`
const Time = styled.div
`
padding-right:10px;
padding-bottom:3px;
font-size:12px;
`
const DeleteBtn = styled.div
`
img{
 
  width:20px;
  height:20px;
}
`
const Wrap = styled.div`
margin: 0.5rem;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
  cursor:pointer;
  height: 6em;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid lightGray;
  border-radius:15px;
  position:relative;
`;

const Left = styled.div`
 display:block;

  padding-left:10px;
  padding-top:10px;

  height:100%;
  img {
    display:flex;
    justify-content: center;
    
    width: 3em;
    height: 3em;
    border-radius: 50%;
    object-fit: cover;
  }
  span {
    display:flex;
    justify-content: center;
    
    margin-bottom:5px;
  }
  button {
    display:flex;
  }
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;

  height:100%;
  justify-content: center;
  align-items: center;

  width:100%;
  margin-left: 10px;
 
 
`;


export default OutBox;
