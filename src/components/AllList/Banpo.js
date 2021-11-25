// Banpo.js - 산책가자 페이지에서 반포 한강공원 산책목록이 모여있는 페이지
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cards from "../AllList/Cards";
import { actionCreators as postActions } from "../../redux/modules/post";

const Banpo = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.banpo);

  useEffect(() => {
    dispatch(postActions.getBanpoMD());
  }, []);

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

export default Banpo;
