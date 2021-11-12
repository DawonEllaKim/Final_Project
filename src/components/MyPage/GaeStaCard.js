import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 액션 불러오기
import { actionCreators as postActions } from "../../redux/modules/dogsta";

import emptyHeart from "../../image/emptyHeart.png";

const GaeStaCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = props.userId; // 현재 페이지의 유저아이디
  const postList = useSelector((state) => state.dogsta.eachList); //현재 페이지 유저의 모든 개스타그램 게시물
  console.log(postList);

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
            {/* <button
              onClick={() => {
                history.push("/dogstawrite");
              }}
            >
              ADD
            </button> */}

            {postList.map((post, index) => {
              return (
                <Card
                  key={index}
                  onClick={() =>
                    history.push(`/dogstadetail/${userId}/${post.dogPostId}`)
                  }
                >
                  <img src={post.dogPostImage} />

                  <Text>
                    <p>{post.dogPostDesc}</p>

                    <div>
                      <img src={post.userImage} />
                      <span style={{ marginRight: "45px" }}>
                        {post.userNickname}
                      </span>
                      {/* <img src={emptyHeart} />
                      <span>12</span> */}
                    </div>
                  </Text>
                </Card>
              );
            })}
          </>
        </Posts>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: 160px 160px;
  /* grid-template-rows: 130px 130px; */
  gap: 20px 30px;

  width: 100%;
  /* height: 100%; */

  cursor: pointer;
  /* border-radius: 20px; */

  img {
    width: 100%;
    /* height: 130px; */

    background-position: center;
    background-repeat: no-repeat;
    /* object-fit: cover; */
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;
const Card = styled.div`
  width: 160px;

  border-radius: 20px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);
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
const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 3px 7px;
  margin: 4px;
  p {
    margin-bottom: 20px;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    height: 20px;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 4px;
  }
`;

export default GaeStaCard;
