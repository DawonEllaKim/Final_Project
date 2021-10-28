import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Main = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.list);

  // 강아지 크기 필터
  const [dogSizeActive, setDogSizeActive] = useState(false);
  const [dogSizeSelected, setDogSizeSelected] = useState("강아지 크기");
  const dogSizeOptions = ["전체", "소형견", "중형견", "대형견"];

  // 강아지 성별 필터
  const [dogGenderActive, setDogGenderActive] = useState(false);
  const [dogGenderSelected, setDogGenderSizeSelected] = useState("강아지 성별");
  const dogGenderOptions = ["전체", "소형견", "여아"];

  // 강아지 나이 필터
  const [dogAgeActive, setDogAgeActive] = useState(false);
  const [dogAgeSelected, setDogAgeSelected] = useState("강아지 나이");
  const dogAgeOptions = ["전체", "0세~3세", "4세~7세", "8세 이상"];

  // 산책로 필터
  const [locationCategoryActive, setLocationCategoryActive] = useState(false);
  const [locationCategorySelected, setLocationCategorySelected] =
    useState("산책로");
  const locationCategoryOptions = [
    "전체",
    "반포",
    "여의도",
    "뚝섬",
    "서울숲",
    "올림픽공원",
    "인천대공원",
    "대구 수성못",
    "부산 시민공원",
    "부산 광안리",
  ];

  // 마감여부 필터
  const [completedActive, setCompletedActive] = useState(false);
  const [completedSelected, setCompletedSelected] = useState("마감여부");
  const completedOptions = ["전체", "마감", "진행중"];

  React.useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <Wrap>
      {/* 필터모음 */}
      <Head>
        {/* 강아지크기 */}
        <Dropdown>
          <DropdownBtn onClick={(e) => setDogSizeActive(!dogSizeActive)}>
            {dogSizeSelected}
          </DropdownBtn>
          {dogSizeActive && (
            <DropdownContent>
              {dogSizeOptions.map((dogSizeOption) => (
                <DropdownItem
                  onClick={(e) => {
                    setDogSizeSelected(dogSizeOption);
                    setDogSizeActive(false);
                    console.log(dogSizeOption);
                  }}
                >
                  {dogSizeOption}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </Dropdown>
        {/* 성별 */}
        <Dropdown>
          <DropdownBtn onClick={(e) => setDogGenderActive(!dogGenderActive)}>
            {dogGenderSelected}
          </DropdownBtn>
          {dogGenderActive && (
            <DropdownContent>
              {dogGenderOptions.map((dogGenderOption) => (
                <DropdownItem
                  onClick={(e) => {
                    setDogGenderSizeSelected(dogGenderOption);
                    setDogGenderActive(false);
                    console.log(dogGenderOption);
                  }}
                >
                  {dogGenderOption}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </Dropdown>
        {/* 나이 */}
        <Dropdown>
          <DropdownBtn onClick={(e) => setDogAgeActive(!dogAgeActive)}>
            {dogAgeSelected}
          </DropdownBtn>
          {dogAgeActive && (
            <DropdownContent>
              {dogAgeOptions.map((dogAgeOption) => (
                <DropdownItem
                  onClick={(e) => {
                    setDogAgeSelected(dogAgeOption);
                    setDogAgeActive(false);
                    console.log(dogAgeOption);
                  }}
                >
                  {dogAgeOption}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </Dropdown>
        {/* 산책로 */}
        <Dropdown>
          <DropdownBtn
            onClick={(e) => setLocationCategoryActive(!locationCategoryActive)}
          >
            {locationCategorySelected}
          </DropdownBtn>
          {locationCategoryActive && (
            <DropdownContent>
              {locationCategoryOptions.map((locationCategoryOption) => (
                <DropdownItem
                  onClick={(e) => {
                    setLocationCategorySelected(locationCategoryOption);
                    setLocationCategoryActive(false);
                    console.log(locationCategoryOption);
                  }}
                >
                  {locationCategoryOption}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </Dropdown>
        {/* 마감여부 */}
        <Dropdown>
          <DropdownBtn onClick={(e) => setCompletedActive(!completedActive)}>
            {completedSelected}
          </DropdownBtn>
          {completedActive && (
            <DropdownContent>
              {completedOptions.map((completedOption) => (
                <DropdownItem
                  onClick={(e) => {
                    setCompletedSelected(completedOption);
                    setCompletedActive(false);
                    console.log(completedOption);
                  }}
                >
                  {completedOption}
                </DropdownItem>
              ))}
            </DropdownContent>
          )}
        </Dropdown>
      </Head>

      <Body>
        {postList.map((post, index) => {
          return <Card index={index} key={index} post={post} />;
        })}
      </Body>

      <Footer>
        <button>채팅방</button>
        <button>산책 약속 등록 버튼</button>
        <button onClick={() => history.push("/mypage")}>마이페이지</button>
        <button>로그아웃</button>
      </Footer>
    </Wrap>
  );
};

// 드롭다운 필터를 위한 스타일
const Dropdown = styled.div`
  width: 100px;
  margin: 0 20px;
  /* position: relative; */
`;
const DropdownBtn = styled.button`
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  cursor: pointer;
`;
const DropdownContent = styled.div`
  padding: 15px;
  background-color: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: 500;
  color: #333;
  width: 95%;
`;
const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export default Main;
