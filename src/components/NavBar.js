import React, { useSelector, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// 아이콘
import addBtn from "../image/addBtn.png";
import plus from "../image/plus.png";
import { AiOutlineHome } from "react-icons/ai";
import PetsIcon from "@mui/icons-material/Pets";
import { FaDog } from "react-icons/fa";
import { BiUser } from "react-icons/bi";

const NavBar = (props) => {
  const { add_dogsta } = props;
  const userId = localStorage.getItem("userId");
  const [page, setPage] = useState();

  if (add_dogsta) {
    // 개스타 업로드 navbar
    return (
      <div>
        <Nav>
          <Box>
            {/* 홈 버튼 */}
            <Button
              onClick={() => history.push("/")}
              style={{ marginRight: "20px" }}
            >
              <AiOutlineHome style={{ width: "20px", height: "20px" }} />
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
              style={{ marginRight: "92px" }}
            >
              <PetsIcon style={{ width: "20px", height: "20px" }} />
              <Text>산책가자</Text>
            </Button>

            {/* 개스타그램 버튼 */}
            <Button
              onClick={() => {
                history.push("/dogStaMain");
              }}
              style={{ marginRight: "20px" }}
            >
              <FaDog style={{ width: "20px", height: "20px" }} />
              <Text>개스타</Text>
            </Button>

            {/* 마이페이지 버튼 */}
            <Button onClick={() => history.push(`/mypage/${userId}`)}>
              <BiUser style={{ width: "20px", height: "20px" }} />
              <Text>My</Text>
            </Button>
          </Box>

          {/* 개스타 업로드 버튼 */}
          <HomeArea>
            <HomeBtn onClick={() => history.push("/dogStaWrite")}>
              <img
                src={plus}
                style={{ display: "block", width: "58px", height: "58px" }}
              />
            </HomeBtn>
            <UploadText>업로드</UploadText>
          </HomeArea>
        </Nav>
      </div>
    );
  } else {
    // 산책등록 navbar
    return (
      <div>
        <Nav>
          <Box>
            {/* 홈 버튼 */}
            <Button
              onClick={() => history.push("/")}
              style={{ marginRight: "8px" }}
            >
              <AiOutlineHome style={{ width: "20px", height: "20px" }} />
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
              style={{ marginRight: "92px" }}
            >
              <PetsIcon style={{ width: "20px", height: "20px" }} />
              <Text>산책가자</Text>
            </Button>

            {/* 개스타그램 버튼 */}
            <Button
              onClick={() => {
                history.push("/dogStaMain");
              }}
              style={{ marginRight: "8px" }}
            >
              <FaDog style={{ width: "20px", height: "20px" }} />
              <Text>개스타</Text>
            </Button>

            {/* 마이페이지 버튼 */}
            <Button onClick={() => history.push(`/mypage/${userId}`)}>
              <BiUser style={{ width: "20px", height: "20px" }} />
              <Text>My</Text>
            </Button>
          </Box>

          {/* 산책 등록 버튼 */}
          <HomeArea>
            <HomeBtn onClick={() => history.push("/map2")}>
              <img
                src={addBtn}
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </HomeBtn>
            <Walk>산책등록</Walk>
          </HomeArea>
        </Nav>
      </div>
    );
  }
};

NavBar.defaultProps = {
  add_dogsta: false,
};
const Walk = styled.div`
  position: absolute;
  bottom: 17.7px;
  left: 30%;
  font-size: 11px;
`;
const HomeArea = styled.div`
  border: none;

  box-sizing: border-box;
  width: 100px;
  height: 100px;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: -26px;

  transform: translateX(-50%);
`;
const Nav = styled.div`
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  min-width: 315px;
  max-width: 500px;
  width: 100%;
  height: 68px;
  z-index: 5;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.15);
  /* margin: 0 auto; */
`;
const Box = styled.div`
  box-sizing: border-box;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 68px;
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

  box-sizing: border-box;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  left: 50%;
  background-color: transparent;

  transform: translateX(-50%);
`;

const Text = styled.div`
  font-size: 12px;
  padding-top: 6px;
`;
const UploadText = styled.div`
  position: absolute;
  bottom: 17.7px;
  left: 36%;
  font-size: 11px;
`;
const HomeText = styled.div`
  font-size: 12px;
  padding-top: 14px;
`;

export default NavBar;
