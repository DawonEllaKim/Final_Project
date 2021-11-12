import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 액션 불러오기
import { actionCreators as postActions } from "../../redux/modules/dogsta";

const GaeStaCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = props.userId; // 현재 페이지의 유저아이디
  const postList = useSelector((state) => state.dogsta.eachList); //현재 페이지 유저의 모든 개스타그램 게시물
  // console.log("유저아이디", userId, "포스트리스트", postList);
  console.log(postList)
  useEffect(() => {
    dispatch(postActions.getMyPostMD(userId));
  }, []);

  return (
    <Wrap>
      {/* 게시물 */}
      {!postList ? (
        <>
          <NoCard>게시물이 아직 없습니다. 작성해주세요.</NoCard>

          {/* 임시 - ADD 버튼 */}
          <button
            onClick={() => {
              history.push("/dogstawrite");
            }}
          >
            ADD
          </button>
        </>
      ) : (
        <Posts>
          <>
            {/* 임시 - ADD 버튼 */}
            <button
              onClick={() => {
                history.push("/dogstawrite");
              }}
            >
              ADD
            </button>

            {postList.map((post, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    history.push(`/dogstadetail/${userId}/${post.dogPostId}`)
                  }
                >
                  <img src={post.dogPostImage} />
                </div>
              );
            })}
          </>
        </Posts>
      )}
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

    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
  }
`;
const NoCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 20px;
`;

export default GaeStaCard;
