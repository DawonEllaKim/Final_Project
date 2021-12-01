import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

// 컴포넌츠
import NavBar from "../../components/NavBar";

// 이미지 + 아이콘
import male from "../../image/male.png";
import female from "../../image/female.png";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { FaPen } from "react-icons/fa";
const InfoList = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { post, userId, currentPageUserId } = props;
  const history = useHistory();

  return (
    <>
      <Wrap>
        <CardWrap>
          <DogImage>
            {/* 카드 왼쪽 - 강아지 이미지 */}
            <img src={post.dogImage} />
            {currentPageUserId === userId && (
              <Edit
                onClick={() => {
                  history.push("/dogProfile");
                }}
              >
                <FaPen size="60%" />
              </Edit>
            )}
          </DogImage>

          {/* 카드 오른쪽 - 강아지 정보 */}
          <CardInfo>
            {/* 강아지 성별 + 이름 + 나이 */}
            <CardTop>
              <DogGender>
                {post.dogGender === "남" ? (
                  <img src={male} />
                ) : (
                  <img src={female} />
                )}
              </DogGender>
              <DogName>{post.dogName}</DogName>
            </CardTop>
            {/* 강어지 이름 + 중성화 여부 + 강아지소개 */}
            <CardBottom>
              <div>나이 : {post.dogAge}</div>
              <div>견종 : {post.dogBreed}</div>
              <div>크기 : {post.dogSize}</div>
              <div>중성화여부 : {post.neutral == "true" ? "O" : "X"}</div>
            </CardBottom>
          </CardInfo>
        </CardWrap>
        <DogInfo>
          <Title>강아지 한 줄 소개</Title>
          <div>{post.dogComment}</div>
        </DogInfo>
      </Wrap>
      <NavBar add_dogsta />
    </>
  );
};

const Wrap = styled.div``;
const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin-bottom: 24px;
  font-size: 14px;
`;
const DogImage = styled.div`
  position: relative;
  padding-bottom: 50%;
  overflow: hidden;
  width: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
  }
`;
const Edit = styled.div`
  position: absolute;
  bottom: 5%;
  right: 10%;
  cursor: pointer;
  z-index: 99;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 20%;
  height: 20%;
  padding: 6px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.18);

  img {
    width: 22px;
    height: 22px;
  }
`;
const CardInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0 0 32px;
`;

const CardTop = styled.div`
  margin-bottom: 12px;
  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
    margin-right: 8px;
  }
`;
const DogGender = styled.span``;
const DogName = styled.span`
  font-size: 24px;
`;
const CardBottom = styled.div`
  div {
    width: 100%;
    padding: 4px 0;
    color: #747474;
  }
`;

const DogInfo = styled.div`
  text-align: center;
  margin-top: 30px;
  div {
    width: 100%;
    height: 128px;
    text-align: left;
    padding: 12px;
    margin-top: 20px;
    color: #747474;
    border-radius: 14px;
    background-color: #faf7ce;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  }
`;
const Title = styled.p`
  font-weight: 600;
`;

export default InfoList;
