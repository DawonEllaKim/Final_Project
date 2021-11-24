// Olympic.js - 산책가자 페이지에서 올림픽공원 산책목록이 모여있는 페이지
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cards from "../AllList/Cards";
import { actionCreators as postActions } from "../../redux/modules/post";

const Olympic = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.olympic);

  useEffect(() => {
    dispatch(postActions.getOlympicMD());
  }, []);

  return (
    <Wrap>
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
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;

export default Olympic;
