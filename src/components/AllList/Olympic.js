// Olympic.js - 산책가자 페이지에서 올림픽공원 산책목록이 모여있는 페이지
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";

// 컴포넌츠
import Cards from "../AllList/Cards";
import Loading from "../Loading";
import Spinner from "../../shared/Spinner";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/post";
import { actionCreators as walkActions } from "../../redux/modules/walk";

const Olympic = () => {
  const dispatch = useDispatch();
  const olympicList = useSelector((state) => state.post.olympic);
  console.log(olympicList.length);
  const postList = useSelector((state) => state.walk.page_olympic);
  console.log(postList.length);

  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    dispatch(walkActions.pageOlympicMD(pageNum));
  }, [pageNum]);

  //무한 스크롤
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView();

  const getMoreItem = async () => {
    setIsLoaded(true);
    setPageNum(pageNum + 1);
    setIsLoaded(false);
  };

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  useEffect(() => {
    dispatch(postActions.getOlympicMD());
  });

  return (
    <>
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

              return <Cards Info={Info} key={index} />;
            })}
            {/* 무한스크롤 페이지 인식 */}
            <div ref={ref}> </div>
          </>
        )}
        {/* 로딩중 이미지 */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {inView && postList.length !== olympicList.length ? (
            <Loading />
          ) : null}
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Olympic;
