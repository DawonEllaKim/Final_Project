import React, { useEffect } from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Detail = (props) => {
  useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);
  const dispatch = useDispatch();
  const post_info = useSelector((state) => state.post?.list) || "";
  console.log(post_info);
  const postId = props.match.params.id;
  console.log("파람즈 id", postId);

  const postInfo = post_info.filter(
    (postInfo) => postInfo.id === Number(postId)
  )[0];
  console.log(postInfo);

  const categoryInfo = postInfo?.locationCategory;
  const timeInfo = postInfo?.meetingTime;
  const wishInfo = postInfo?.wishDesc;

  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  return (
    <>
      <Wrap>
        <DogWrap>
          <DogImage></DogImage>
          <DogInfo>
            <DogName>
              <Title>강아지이름</Title>
              <span></span>
            </DogName>
            <DogGender>
              <Title>성별</Title>
              <span></span>
            </DogGender>
            <DogBreed>
              <Title>견종</Title>
              <span></span>
            </DogBreed>
            <DogSize>
              <Title>크기</Title>
              <span></span>
            </DogSize>
            <DogAge>
              <Title>나이</Title>
              <span></span>
            </DogAge>
            <DogNeutral>
              <Title>중성화 여부</Title>
              <span></span>
            </DogNeutral>
            <DogComment>
              <Title>강아지 소개</Title>
              <span></span>
            </DogComment>
          </DogInfo>
        </DogWrap>
        <DetailWrap>
          <DetailInfo>
            <OwnerInfo>
              <OwnerImage></OwnerImage>
              <OwnerName>김효진</OwnerName>
              <OwnerGender>여</OwnerGender>
              <OwnerAge>30대</OwnerAge>
            </OwnerInfo>
            <MeetingLocation>
              <Title>예약장소</Title>
              <span>{categoryInfo}</span>
            </MeetingLocation>
            <MeetingTime>
              <Title>예약시간</Title>
              <span>{timeInfo} </span>
            </MeetingTime>
            <WishDesc>
              <Title>소개 및 유의사항</Title>
              <p>{wishInfo}</p>
            </WishDesc>
          </DetailInfo>
          <Map></Map>
        </DetailWrap>
        <BtnWrap>
          <Completed>모집 마감하기</Completed>
          <Edit onClick={() => history.push(`/postEdit/${postId}`)}>
            수정하기
          </Edit>
          <Delete onClick={deletePost}>삭제하기</Delete>
          <Chatting>채팅하기</Chatting>
        </BtnWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  max-width: 390px;
  margin: 0 auto;
`;
const Title = styled.span`
  display: inline-block;
  padding: 10px 0;
`;
const DogWrap = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
  display: flex;
`;
const DogImage = styled.img`
  border: 1px solid green;
  box-sizing: border-box;
  width: 50%;
`;
const DogInfo = styled.div`
  width: 50%;
  text-align: left;
`;
const DogName = styled.div``;
const DogGender = styled.div``;
const DogBreed = styled.div``;
const DogSize = styled.div``;
const DogAge = styled.div``;
const DogNeutral = styled.div``;
const DogComment = styled.div``;
const DetailWrap = styled.div`
  border: 1px solid green;
  box-sizing: border-box;
  display: flex;
`;
const DetailInfo = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
  width: 50%;
  text-align: left;
`;
const OwnerInfo = styled.div`
  display: flex;
`;
const OwnerImage = styled.img`
  border: 1px solid green;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
`;
const OwnerName = styled.div``;
const OwnerGender = styled.div``;
const OwnerAge = styled.div``;
const MeetingLocation = styled.div``;
const MeetingTime = styled.div``;
const WishDesc = styled.div``;
const Map = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  width: 50%;
`;
const BtnWrap = styled.div`
  padding: 10px 0;
`;
const Completed = styled.button``;
const Edit = styled.button``;
const Delete = styled.button``;
const Chatting = styled.button``;

export default Detail;
