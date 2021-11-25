// All.js - 산책가자 페이지에서 산책목록 전체 모여있는 페이지
import React from "react";
import styled from "styled-components";
import Cards from "../AllList/Cards";

const All = ({ postList }) => {
  return (
    <Wrap>
      {postList.length === 0 ? (
        <EmptyPost>등록된 산책목록이 없습니다.</EmptyPost>
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
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
const EmptyPost = styled.div`
  padding: 20px;
`;

export default All;
