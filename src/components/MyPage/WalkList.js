// WalkList.js - 내가 등록한 산책 약속 목록 모음
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import NavBar from "../../components/NavBar";
import Cards from "../AllList/Cards";
import { actionCreators as postActions } from "../../redux/modules/post";

const WalkList = ({ post, userId }) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.myList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(postActions.getMyPostMD(userId)); // 나의 산책 게시물 불러오기
  }, []);

  return (
    <Wrap>
      {postList.length < 1 ? (
        <NoCard>등록된 산책 목록이 없습니다.</NoCard>
      ) : (
        <div>
          {postList.map((post, index) => {
            const dogImage = post.dogImage;
            const dogName = post.dogName;
            const dogGender = post.dogGender;
            const dogAge = post.dogAge;
            const meetingDate = post.meetingDate;
            const Info = {
              dogImage,
              dogName,
              dogGender,
              dogAge,
              meetingDate,
              post,
            };
            return <Cards Info={Info} key={index} />;
          })}
        </div>
      )}
      <NavBar />
    </Wrap>
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

export default WalkList;
