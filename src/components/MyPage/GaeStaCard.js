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

          <FlexButton>
            <DeleteButton
              onClick={() => {
                history.push("/dogstawrite");
              }}
            >
              게시물 작성하기
            </DeleteButton>
          </FlexButton>
          {/* 임시 - ADD 버튼 */}
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
const FlexButton = styled.div`
  display: flex;
  justify-content: center;
  width: 350px;
  height: 40px;
  margin: 30px auto 130px auto;

  button {
    width: 160px;
    height: 40px;
    background-color: #fff;
    border-radius: 14px;
    border: 1px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;
const DeleteButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 40px;
  border-radius: 10px;
  border: 1px gray;
`;
const Wrap = styled.div`
  width: 100%;
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: 168px 168px;
  /* grid-template-rows: 130px 130px; */
  gap: 20px 20px;

  width: 100%;
  /* height: 100%; */

  cursor: pointer;
  /* border-radius: 20px; */

  img {
    width: 100%;
    height: 150px;

    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
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
