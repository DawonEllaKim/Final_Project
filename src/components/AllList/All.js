// All.js - 산책가자 페이지에서 산책목록 전체 모여있는 페이지

import styled from "styled-components";
import Cards from "../AllList/Cards";

const All = ({ postList }) => {
  return (
    <Wrap>
      {postList.length === 0 ? (
        "등록된 산책 목록이 없습니다."
      ) : (
        <>
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
            // if(index<10)
            if(index<10)
            return  <Cards Info={Info} key={index} />;
            
            
    
          })}
        </>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

export default All;
