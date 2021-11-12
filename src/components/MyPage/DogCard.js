import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

// 리덕스
import { actionCreators as userActions } from "../../redux/modules/user";

// 리액트 아이콘
import { BsGenderMale } from "react-icons/bs";
import { BsGenderFemale } from "react-icons/bs";

const DogCard = ({ dogInfo, currentPageUserId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  console.log(dogInfo);
  // useEffect(() => {
  //   dispatch(userActions.getMypageMD(currentPageUserId));
  // }, []);

  return (
    <Wrap>
      <Title>반려견 정보</Title>
      {/* <CardWrap
      // onClick={() => {
      //   history.push("/dogProfile");
      // }}
      > */}
      {/* 카드 왼쪽 - 이미지 */}
      {/* <img src={dogInfo.dogImage} /> */}

      {/* 카드 오른쪽 - 약속 정보*/}
      <CardInfo>
        {/* <CardCenter>
          {dogInfo.dogName}/{dogInfo.dogBreed}
        </CardCenter>
        <CardCenter>
          {dogInfo.dogGender === "남" ? <BsGenderMale /> : <BsGenderFemale />}/
          {dogInfo.dogAge}
        </CardCenter>
        <CardCenter>
          중성화여부/{dogInfo.neutral == true ? "유" : "무"}
        </CardCenter> */}
      </CardInfo>
      {/* </CardWrap> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  border-top: 1px solid #c4c4c4;
  width: 350px;
`;
const Title = styled.div`
  margin: 20px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;
const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 350px;

  margin-bottom: 12px;
  box-shadow: 0px 3px black;
  border-radius: 25px;
  background-color: #ebebeb;
  font-size: 14px;
  font-weight: 400;
  line-height: 20.27px;
  cursor: pointer;
  font-size: 16px;
  img {
    width: 152px;
    height: 152px;
    border-radius: 25px;
  }
  border: 2px solid black;
`;
const CardInfo = styled.div`
  width: 192px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 20px;
`;
const CardCenter = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 10px;
`;

export default DogCard;
