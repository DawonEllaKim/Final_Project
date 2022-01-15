import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

function MainDogsta({ post }) {
  return (
    <Wrap>
      <ImageWrap
        onClick={() =>
          history.push(`/dogStaDetail/${post.userId}/${post.dogPostId}`)
        }
      >
        <Dogsta src={post.dogPostImage} />
      </ImageWrap>
      <p>{post.dogName}</p>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  padding-top: 22px;
  p {
    margin-top: 10px;
    font-size: 12px;
  }
`;

const ImageWrap = styled.div`
  width: 85%;
  position: relative;
  padding-bottom: 85%;
  overflow: hidden;
  margin-left: 7.5%;
`;
const Dogsta = styled.img`
  width: 85%;
  height: 95%;
  position: absolute;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  background-color: pink;
  display: block;
  margin-bottom: 14px;
`;

export default MainDogsta;
