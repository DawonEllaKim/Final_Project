import React, { useState } from "react";
import styled from "styled-components";

const DogAge = () => {
  const [subMenu, setSubMenu] = useState(false);

  // 강아지 나이 필터
  const [dogAgeActive, setDogAgeActive] = useState(false);
  const [dogAgeSelected, setDogAgeSelected] = useState("강아지 나이");
  const dogAgeOptions = ["전체", "0세~3세", "4세~7세", "8세 이상"];

  const showSubMenu = () => {
    setSubMenu(!subMenu);
  };

  return (
    <Wrap>
      <SideBarLink>
        <SideBarLabel onClick={showSubMenu}>나이대</SideBarLabel>
        <Selections>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogAge"
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
              name="DogAge"
              id="남"
              value="남"
              // onChange={male}
            />
            <label for="남">0~3세</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogAge"
              id="남"
              value="남"
              // onChange={male}
            />
            <label for="남">4~7세</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogAge"
              id="남"
              value="남"
              // onChange={male}
            />
            <label for="남">8세이상</label>
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

export default DogAge;
