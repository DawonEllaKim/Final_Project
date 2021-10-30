import React, { useState } from "react";
import styled from "styled-components";

const DogGender = () => {
  const [subMenu, setSubMenu] = useState(false);

  // 강아지 성별 필터
  const [dogGenderActive, setDogGenderActive] = useState(false);
  const [dogGenderSelected, setDogGenderSizeSelected] = useState("강아지 성별");
  const dogGenderOptions = ["전체", "남아", "여아"];

  const showSubMenu = () => {
    setSubMenu(!subMenu);
  };

  return (
    <Wrap>
      <SideBarLink>
        <SideBarLabel onClick={showSubMenu}>성별</SideBarLabel>
        <Selections>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogGender"
              id="남"
              value="남"
              // onChange={male}
            />
            <label for="남">all</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogGender"
              id="남"
              value="남"
              // onChange={male}
            />
            <label for="남">남아</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogGender"
              id="남"
              value="남"
              // onChange={male}
            />
            <label for="남">여아</label>
          </Select>
        </Selections>
      </SideBarLink>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-bottom: 10px;
  background-color: white;
`;
const SideBarLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 116px;
  &:hover {
    box-sizing: border-box;
    border-left: 10px solid pink;
    cursor: pointer;
    transition: 350ms;
  }
`;
const SideBarLabel = styled.span`
  margin: 12px 0 0 24px;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
`;
const Selections = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 52px 21px 52px;
`;
const Select = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default DogGender;
