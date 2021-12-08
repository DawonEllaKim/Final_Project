import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";

const GaeStaCard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = props.userId; // 현재 페이지의 유저아이디
  const postList = useSelector((state) => state.dogsta.myList); //현재 페이지 유저의 모든 개스타그램 게시물
  // console.log("postList", postList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(dogstaActions.getMyPostMD(userId)); //현재 페이지 유저의 모든 개스타그램 게시물 불러오기
  }, [userId]);

  return (
    <>
      <Wrap>
        {/* 개스타그램 게시물의 유무 판단*/}
        {postList.length == 0 ? (
          <>
            <NoCard>게시물이 아직 없습니다. 작성해주세요.</NoCard>
            <Button
              onClick={() => {
                history.push("/dogStaWrite");
              }}
            >
              게시물 작성하기
            </Button>
          </>
        ) : (
          <Posts>
            {postList.map((post, index) => {
              return (
                <Card
                  key={index}
                  onClick={() =>
                    history.push(`/dogStaDetail/${userId}/${post.dogPostId}`)
                  }
                >
                  {/* 포스트 사진 */}
                  <img src={post.dogPostImage} />
                </Card>
              );
            })}
          </Posts>
        )}
        {/* 고정 버튼 */}
      </Wrap>
      <NavBar add_dogsta />
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
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
const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 160px;
  padding: 16px 0;
  margin: 30px auto;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 10px;
  border: 1px gray;
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  row-gap: 20px;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    position: absolute;
  }
`;
const Card = styled.div`
  width: 100%;
  border-radius: 10px;
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
`;

export default GaeStaCard;
