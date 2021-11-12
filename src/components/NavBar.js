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
          {/* 홈 버튼 */}
          <Button
            onClick={() => history.push("/")}
            style={{ marginRight: "28px"}}
          >
            <img src={home} style={{ width: "20px", height: "20px" }} />
            <Text>홈</Text>
          </Button>

          {/* 산책 목록 버튼 */}
          <Button
            onClick={() => history.push("/")}
            style={{ marginRight: "100px" }}
          >
            <img src={walk} style={{ width: "20px", height: "20px" }} />
            <Text>산책가자</Text>
          </Button>

          {/* 개스타그램 버튼 */}
          <Button
            onClick={() => {
              history.push("/dogstagram");
            }}
            style={{ marginRight: "28px" }}
          >
            <img
              src={dog}
              style={{ width: "22px", height: "22px"}}
            />
            <Text>개스타</Text>
          </Button>

          {/* 마이페이지 버튼 */}
          <Button 
            onClick={() => history.push(`/mypage/${userId}`)}
          >
            <img src={myPage} style={{ width: "20px", height: "20px" }} />
            <Text>My</Text>
          </Button>
        </Box>

        {/* 산책 등록 버튼 */}
        <HomeBtn onClick={() => history.push("/map2")}>
          <img src={addBtn} style={{ width: "58px", height: "58px" }} />
          <Text>산책등록</Text>
        </HomeBtn>
      </Nav>
    </>
  );
};

const Nav = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 64px;
  z-index: 5;
  padding: 20px;
`;
const Box = styled.div`
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 350px;
  height: 60px;
  padding: 6px 30px;
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid #000;
  box-shadow: 0 4px 0px #000;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const HomeBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -26px;
  transform: translateX(-50%);
`;

const Text = styled.div`
  font-size:12px;
  padding-top: 4px;
  ;
`

export default NavBar;
