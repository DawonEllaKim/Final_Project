import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../components/NavBar"; // 컴포넌츠
import { actionCreators as postActions } from "../redux/modules/dogsta"; // 액션 불러오기

const DogStaGram = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const postList = useSelector((state) => state.dogsta.mainList);
  // console.log("모든 개스타그램 포스트리스트", postList);

  useEffect(() => {
    dispatch(postActions.getAllPostMD());
  }, []);

  return (
    <Wrap>
      <h1>현재 디자인 중</h1>

      {/* 임시 - ADD 버튼 */}
      <button
        onClick={() => {
          history.push("/dogstawrite");
        }}
      >
        ADD
      </button>

      {/* 게시물 */}
      <Posts>
        {postList.map((post, index) => {
          return (
            <div>
              <div post={post} key={index}>
                <img
                  src={post.dogPostImage}
                  onClick={() =>
                    history.push(
                      `/dogstadetail/${post.userId}}/${post.dogPostId}`
                    )
                  }
                />
                <button
                  post={post}
                  onClick={() => {
                    history.push(`/mypage/${post.userId}`);
                  }}
                >
                  {post.userNickname}
                </button>
                <p>{post.createdAt}</p>
              </div>
            </div>
          );
        })}
      </Posts>

      {/* 하단 고정 버튼  */}
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 390px;
  /* padding: 0 20px; */
  margin: 100px auto;

  border-top: 1px solid #c4c4c4;
`;
const Posts = styled.div`
  width: 100%;
  height: 100%;

  cursor: pointer;

  img {
    width: 100%;
    height: 390px;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default DogStaGram;
