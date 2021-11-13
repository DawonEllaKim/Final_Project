import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../components/NavBar"; // 컴포넌츠
import { actionCreators as postActions } from "../redux/modules/dogsta"; // 액션 불러오기

import TopBar from "../components/TopBar";
import dog from "../image/dog.png";

const DogStaGram = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const postList = useSelector((state) => state.dogsta.mainList);
  // console.log("모든 개스타그램 포스트리스트", postList);

  useEffect(() => {
    dispatch(postActions.getAllPostMD());
  }, []);

  return (
    <Overall>
      <TopBar>
        <img
          src={dog}
          style={{ width: "24px", height: "24px", margin: "-4px 10px" }}
        />
        <span>개스타그램</span>
      </TopBar>
      <Top>
        <Category>
          <span style={{ borderBottom: "4px solid red" }}>추천</span>
          <span>최신</span>
        </Category>
        <AddBtn
          onClick={() => {
            history.push("/dogstawrite");
          }}
        >
          게시물 추가하기
        </AddBtn>
      </Top>
      <Wrap>
        {/* 게시물 */}
        <Posts>
          {postList.map((post, index) => {
            return (
              <div>
                <Card post={post} key={index}>
                  <img
                    src={post.dogPostImage}
                    onClick={() =>
                      history.push(
                        `/dogstadetail/${post.userId}}/${post.dogPostId}`
                      )
                    }
                  />

                  <Text>
                    <p>{post.dogPostDesc}</p>

                    <div
                      post={post}
                      onClick={() => {
                        history.push(`/mypage/${post.userId}`);
                      }}
                    >
                      <img src={post.userImage} />
                      <span style={{ marginRight: "45px" }}>
                        {post.userNickname}
                      </span>
                      {/* <img src={emptyHeart} />
                      <span>12</span> */}
                    </div>
                  </Text>
                </Card>
              </div>
            );
          })}
        </Posts>

        {/* 하단 고정 버튼  */}
        <NavBar />
      </Wrap>
    </Overall>
  );
};

const Overall = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 0 20px;
  margin: auto;
  margin-bottom: 150px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 40px 32px 40px;
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  width: 110px;
  /* margin: auto; */

  /* border: 1px solid black; */
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AddBtn = styled.button`
  border: none;
  background-color: #fff;
  width: 100px;
  cursor: pointer;
  font-size: 15px;
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: 168px 168px;
  /* grid-template-rows: 300px 300px; */
  gap: 20px 20px;
  width: 100%;
  cursor: pointer;

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
  border-radius: 20px;
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.25);
  padding-bottom: 10px;
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

export default DogStaGram;
