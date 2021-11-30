import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Cards from "../AllList/Cards";
import { actionCreators as walkActions } from "../../redux/modules/walk";
import Spinner from "../../shared/Spinner";

import { useInView } from "react-intersection-observer"

const SeoulForest = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.walk.page_seoul);
  const [pageNum,setPageNum] = useState(1);
  useEffect(() => {
    dispatch(walkActions.pageSeoulMD(pageNum));
  }, [pageNum]);
      //무한 스크롤
   

   const [isLoaded, setIsLoaded] = useState(false);
   const [ref, inView] = useInView()

   const getMoreItem = async () => {
    setIsLoaded(true)
     setPageNum(pageNum+1)
    setIsLoaded(false)

   }  

   useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView ) {
     getMoreItem();

    }
  }, [inView])


  return (<>
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
           
            return <Cards Info={Info} key={index}/>;
          })}
          <div ref={ref}> </div>
        </>
      )}
    
    </Wrap>
   
      </>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
export default SeoulForest;

