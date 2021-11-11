import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

// 컴포넌츠
import Card from "../../components/Card";

const ListCard = ({ post }) => {
  const history = useHistory();

  return (
    <Wrap>
      <Title>산책목록</Title>

      <CardWrap>
        {post.length === 1 ? (
          <NoCard>등록된 산책 목록이 없습니다.</NoCard>
        ) : (
          <div>
            {post.map((page, index) => {
              return (
                <div onClick={() => history.push(`/posts/${page.post_id}`)}>
                  <Card index={index} key={index} post={page} />
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
