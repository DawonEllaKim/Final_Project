import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

function MainDogsta({ post }) {
  return (
    <Wrap
      onClick={() =>
        history.push(`/dogStaDetail/${post.userId}}/${post.dogPostId}`)
      }
    >
      <Dogsta src={post.dogPostImage} />

      <p>{post.dogName}</p>
    </Wrap>
  );
}

const Wrap = styled.div`
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  p {
    margin-right: 10px;

    font-size: 12px;
  }
`;

const Dogsta = styled.img`
  width: 90%;
  aspect-ratio: 1 / 1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  background-color: pink;
  margin-bottom: 14px;
`;

export default MainDogsta;
