import React, { useState } from "react";
import styled from "styled-components";

const DogSize = () => {
  const [subMenu, setSubMenu] = useState(false);

  // 강아지 크기 필터
  const [dogSizeActive, setDogSizeActive] = useState(false);
  const [dogSizeSelected, setDogSizeSelected] = useState("강아지 크기");
  const dogSizeOptions = ["전체", "소형견", "중형견", "대형견"];
  const [size, setSize] = useState("");

  const showSubMenu = () => {
    setSubMenu(!subMenu);
  };
  const all = (e) => {
    setSize("all");
  };
  const 소형견 = (e) => {
    setSize("소형견");
  };
  const 중형견 = (e) => {
    setSize("중형견");
  };
  const 대형견 = (e) => {
    setSize("대형견");
  };

  return (
    <Wrap>
      <SideBarLink>
        <SideBarLabel onClick={showSubMenu}>강아지 크기</SideBarLabel>
        <Selections>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogSize"
              id="남"
              value="남"
              onChange={all}
            />
            <label for="남">all</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogSize"
              id="남"
              value="남"
              onChange={소형견}
            />
            <label for="남">소형견</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogSize"
              id="남"
              value="남"
              onChange={중형견}
            />
            <label for="남">중형견</label>
          </Select>
          <Select>
            <input
              style={{ width: "20px", height: "20px" }}
              type="radio"
              name="DogSize"
              id="여"
              value="여"
              onChange={대형견}
            />
            <label for="여">대형견</label>
          </Select>
        </Selections>
      </SideBarLink>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-bottom: 10px;
  background-color: white;
  border-radius: 0 20px 0 0;
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
export default DogSize;
