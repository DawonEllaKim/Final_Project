import React, { useSelector } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// 아이콘
import walk from "../image/walk.png";
import home from "../image/home.png";
import dog from "../image/dog.png";
import myPage from "../image/myPage.png";
import addBtn from "../image/addBtn.png";

const NavBar = (props) => {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Nav>
        <Box>
          {/* 산책 목록 버튼 */}
          <Button
            onClick={() => history.push("/")}
            style={{ marginRight: "36px" }}
          >
            <img src={walk} style={{ width: "20px", height: "20px" }} />
          </Button>

          {/* 홈 버튼 */}
          <Button
            onClick={() => history.push("/")}
            style={{ marginRight: "109px" }}
          >
            <img src={home} style={{ width: "20px", height: "20px" }} />
          </Button>

          {/* 개스타그램 버튼 */}
          <Button
            onClick={() => {
              history.push("/dogstagram");
            }}
          >
            <img
              src={dog}
              style={{ width: "24px", height: "24px", marginRight: "36px" }}
            />
          </Button>

          {/* 마이페이지 버튼 */}
          <Button onClick={() => history.push(`/mypage/${userId}`)}>
            <img src={myPage} style={{ width: "20px", height: "20px" }} />
          </Button>
        </Box>

        {/* 산책 등록 버튼 */}
        <HomeBtn onClick={() => history.push("/map2")}>
          <img src={addBtn} style={{ width: "70px", height: "70px" }} />
        </HomeBtn>
      </Nav>
      <Bar>
        <div />
      </Bar>
    </>
  );
};

const Nav = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350 px;
  height: 64px;
  text-align: center;
  z-index: 5;
  padding: 20px;
`;
const Box = styled.div`
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 350px;
  height: 60px;

  padding: 6px 30px;
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid #000;
  box-shadow: 0 4px 0px #000;
`;
const HomeBtn = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translateX(-50%);
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;
const Bar = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: bottom;
  width: 390px;
  height: 36px;
  background-color: #fff;
  z-index: 10px;

  div {
    width: 134px;
    height: 5px;
    margin-top: 23px;
    background-color: #fff;
    border-radius: 100px;
  }
`;

export default NavBar;
