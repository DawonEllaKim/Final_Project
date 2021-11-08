import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// 아이콘
import home from "../image/home.png";
import chat from "../image/chat.png";
import myPage from "../image/mypage.png";
import addBtn from "../image/addBtn.png";

const NavBar = (props) => {
  return (
    <>
      <Nav>
        <NavLeft>
          <Button onClick={() => history.push("/")}>
            <img src={home} style={{ width: "20px", height: "20px" }} />
          </Button>
          <Button>
            <img src={chat} style={{ width: "20px", height: "20px" }} />
          </Button>
          <Button onClick={() => history.push("/mypage")}>
            <img src={myPage} style={{ width: "20px", height: "20px" }} />
          </Button>
        </NavLeft>

        <NavRight>
          <Button onClick={() => history.push("/map2")}>
            <img src={addBtn} style={{ width: "60px", height: "60px" }} />
          </Button>
        </NavRight>
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
  bottom: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 390 px;
  height: 64px;
  padding: 21px;
  z-index: 5;
`;

const NavLeft = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 276px;
  height: 60px;
  margin-right: 12px;
  padding: 6px 30px;
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid #000;
  box-shadow: 0 4px 0px #000;
`;

const NavRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #000;
  border-radius: 50%;
  box-shadow: 0 4px 0px #000;
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
    background-color: #000;
    border-radius: 100px;
  }
`;

export default NavBar;
