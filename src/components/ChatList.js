import React from "react";
import styled from "styled-components";

const ChatList = ({ list }) => {
  const myName = list.members.me;
  const otherName = list.members.other;
  const date = list.createdAt;
  console.log(myName, otherName, date);

  return (
    <div>
      <Wrap>
        <UserWrap>
          <UserImage></UserImage>
          <UserName>{otherName}</UserName>
        </UserWrap>
        <TextWrap>
          <Message>산책 같이해요~</Message>
          <Date>{date}</Date>
        </TextWrap>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
`;
const UserWrap = styled.div``;
const UserImage = styled.div``;
const UserName = styled.div``;
const TextWrap = styled.div``;
const Message = styled.div``;
const Date = styled.div``;

export default ChatList;
