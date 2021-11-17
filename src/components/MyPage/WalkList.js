import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import Card from "../Card";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/post";

const WalkList = ({ post, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.myList); // 나의 산책 게시물 리스트

  useEffect(() => {
    dispatch(postActions.getMyPostMD(userId)); // 나의 산책 게시물 불러오기
  }, []);

  return (
    <Wrap>
      {/* 해당 페이지 소유자가 등록된 산책이 없다면 삼항연산자로 문구 보여주기 */}
      <CardWrap>
        {postList.length < 1 ? (
          <NoCard>등록된 산책 목록이 없습니다.</NoCard>
        ) : (
          <div>
            {postList.map((post, index) => {
              return (
                <div onClick={() => history.push(`/posts/${post.postId}`)}>
                  <Card index={index} key={index} post={post} />
                </div>
              );
            })}
          </div>
        )}
      </CardWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
const CardWrap = styled.div`
  text-align: left;
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
