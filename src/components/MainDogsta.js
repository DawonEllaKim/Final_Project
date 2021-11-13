import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

function MainDogsta({ post }) {
  return (
    <div>
      <Dogsta
        onClick={() =>
          history.push(`/dogStaDetail/${post.userId}}/${post.dogPostId}`)
        }
        style={{ cursor: "pointer" }}
        src={post.dogPostImage}
      ></Dogsta>
    </div>
  );
}

const Dogsta = styled.img`
  width: 80px;
  height: 80px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  object-fit: cover;
  /* margin: 0 20px; */
`;

export default MainDogsta;
