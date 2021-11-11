import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 액션 불러오기
import { actionCreators as postActions } from "../../redux/modules/dogsta";

const GaeStaCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  const postList = useSelector((state) => state.dogsta.eachList);
  console.log(postList);

  useEffect(() => {
    dispatch(postActions.getMyPostMD(userId));
  }, []);

  return (
    <Wrap>
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
            <div
              onClick={() =>
                history.push(`/dogstadetail/${userId}/${post.dogPostId}`)
              }
            >
              <img post={post} key={index} src={post.dogPostImage} />
            </div>
          );
        })}
      </Posts>
    </Wrap>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  width: 350px;
  padding: 0 20px;
  margin: auto;
  border-top: 1px solid #c4c4c4;
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  /* grid-template-rows: 130px 130px; */

  width: 100%;
  height: 100%;

  cursor: pointer;

  img {
    width: 100%;
    height: 130px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default GaeStaCard;
