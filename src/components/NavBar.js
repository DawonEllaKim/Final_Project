import React, { useSelector, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// 아이콘
import walk from "../image/walk.png";
import home from "../image/home.png";
import dog from "../image/dog.png";
import myPage from "../image/myPage.png";
import addBtn from "../image/addBtn.png";
import plus from "../image/plus.png";

const NavBar = (props) => {
  const { add_dogsta } = props;
  const userId = localStorage.getItem("userId");
  const [page, setPage] = useState();

  if (add_dogsta) {
    return (
      <>
        <Nav>
          <Box>
            {/* 홈 버튼 */}
            <Button
              onClick={() => history.push("/")}
              style={{ marginRight: "28px" }}
            >
              <img src={home} style={{ width: "20px", height: "20px" }} />
              <Text>홈</Text>
            </Button>

            {/* 산책 목록 버튼 */}
            <Button
              onFocus={() => {
                setPage("all");
              }}
              onClick={() => {
                history.push("/alllist/all");
              }}
              style={{ marginRight: "100px" }}
            >
              <img src={walk} style={{ width: "20px", height: "20px" }} />
              <Text>산책가자</Text>
            </Button>

            {/* 개스타그램 버튼 */}
            <Button
              onClick={() => {
                history.push("/dogStaMain");
              }}
              style={{ marginRight: "28px" }}
            >
              <img src={dog} style={{ width: "20px", height: "20px" }} />
              <Text>개스타</Text>
            </Button>

            {/* 마이페이지 버튼 */}
            <Button onClick={() => history.push(`/mypage/${userId}`)}>
              <img src={myPage} style={{ width: "20px", height: "20px" }} />
              <Text>My</Text>
            </Button>
          </Box>

          {/* 개스타 업로드 버튼 */}
          <HomeBtn onClick={() => history.push("/dogStaWrite")}>
            <img
              src={plus}
              style={{ display: "block", width: "58px", height: "58px" }}
            />
            <HomeText>업로드</HomeText>
          </HomeBtn>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <Box>
            {/* 홈 버튼 */}
            <Button
              onClick={() => history.push("/")}
              style={{ marginRight: "28px" }}
            >
              <img src={home} style={{ width: "20px", height: "20px" }} />
              <Text>홈</Text>
            </Button>

            {/* 산책 목록 버튼 */}
            <Button
              onFocus={() => {
                setPage("all");
              }}
              onClick={() => {
                history.push(`/alllist/${page}`);
              }}
              style={{ marginRight: "100px" }}
            >
              <img src={walk} style={{ width: "20px", height: "20px" }} />
              <Text>산책가자</Text>
            </Button>

            {/* 개스타그램 버튼 */}
            <Button
              onClick={() => {
                history.push("/dogStaMain");
              }}
              style={{ marginRight: "28px" }}
            >
              <img src={dog} style={{ width: "20px", height: "20px" }} />
              <Text>개스타</Text>
            </Button>

            {/* 마이페이지 버튼 */}
            <Button onClick={() => history.push(`/mypage/${userId}`)}>
              <img src={myPage} style={{ width: "20px", height: "20px" }} />
              <Text>My</Text>
            </Button>
          </Box>

          {/* 산책 등록 버튼 */}
          <HomeBtn onClick={() => history.push("/map2")}>
            <img
              src={addBtn}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
            <HomeText>산책등록</HomeText>
          </HomeBtn>
        </Nav>
      </>
    );
  }
};

NavBar.defaultProps = {
  add_dogsta: false,
};

const Nav = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 5;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15);
`;
const Box = styled.div`
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 6px 30px;
  background-color: #fff;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const HomeBtn = styled.button`
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -26px;
  transform: translateX(-50%);
`;

const Text = styled.div`
  font-size: 12px;
  padding-top: 6px; ;
`;
const HomeText = styled.div`
  font-size: 12px;
  padding-top: 14px;
`;

export default NavBar;
