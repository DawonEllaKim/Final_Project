// InBox.js - 받은 쪽지함
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

//쓰레기통 이미지
import trash from "../../image/tra.png"
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
  console.log(box);

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

      <Left
        onClick={() => {
          history.push(`/chatdetail/${chatId}`);
        }}
      >
        <img src={senderImage} />
  
        <span>{senderNickname}</span>
      </Left>
      <Right        >
    <Message  onClick={() => {
          history.push(`/chatdetail/${chatId}`);
        }}>{message}</Message>
 
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
`
const DeleteBtn = styled.div
`
img{
 
  width:15px;
  height:15px;
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

  box-shadow: 0 0.03em 0.03em rgba(0, 0, 0, 0.25);
  border: 0.01rem solid lightGray;
  border-radius:15px;
  position:relative;
`;

const Left = styled.div`
 display:block;

  padding-left:10px;
  padding-top:5px;

  height:100%;
  img {
    display:flex;
    justify-content: center;
    
    width: 4em;
    height: 4em;
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



export default InBox;
