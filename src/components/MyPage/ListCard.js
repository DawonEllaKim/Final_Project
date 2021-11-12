import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card";
import { actionCreators as postActions } from "../../redux/modules/post";

const ListCard = ({ post, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.myList);

  useEffect(() => {
    dispatch(postActions.getMyPostMD(userId));
  }, []);

  return (
    <Wrap>
      <Title>산책목록</Title>

      {/* 해당 페이지 소유자가 등록된 산책이 없다면 삼항연산자로 문구 보여주기 */}
      <CardWrap>
        {postList.length === 0 ? (
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
  width: 350px;
  border-top: 1px solid #c4c4c4;
`;
const Title = styled.div`
  margin: 20px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
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
const CardWrap = styled.div`
  text-align: left;
`;

export default ListCard;
