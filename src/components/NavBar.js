import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

// 리덕스
import { actionCreators as SignActions } from "../redux/modules/sign";

// 아이콘 + 이미지
import addBtn from "../image/addBtn.png";
import plus from "../image/plus.png";
import { AiOutlineHome } from "react-icons/ai";
import PetsIcon from "@mui/icons-material/Pets";
import { FaDog } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import Top from "../image/top.png";

const NavBar = (props) => {
  const { add_dogsta } = props;

  const userId = localStorage.getItem("userId");
  const dog = localStorage.getItem("checkDog");
  const [page, setPage] = useState();

  // top 버튼
  const [btnStatus, setBtnStatus] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 스크롤 200px 이상 일때 top 버튼 생성
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 200) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  // top 버튼 클릭하면 페이지 상단으로 이동
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  // 산책등록, 개스타 등록 시 강아지 등록 유무 판단 후 페이지 이동
  const postHandler = () => {
    if (dog == "false") {
      window.alert("강아지등록이 필요한 서비스입니다");
      history.push("/signDog");
      return;
    }
    history.push("/registerwalk");
  };
  const dogStarHandler = () => {
    if (dog == "false") {
      window.alert("강아지등록이 필요한 서비스입니다");
      history.push("/signDog");
      return;
    }
    history.push("/dogStaWrite");
  };

  // 마이메이지 클릭시 로그인, 강아지 등록 유무 판단
  const myPageHandler = () => {
    if (!userId) {
      // 로그인 안했으면 로그인 페이지로 이동
      window.alert("로그인이 필요한 서비스입니다");
      history.push("/login");
      return;
    } else if (dog == "false") {
      // 강아지 등록 안했으면 강아지 등록 페이지로 이동
      window.alert("강아지등록이 필요한 서비스입니다");
      history.push("/signDog");
      return;
    }
    // 로그인, 강아지 등록 되어 있으면 마이페이지로 이동
    history.push(`/mypage/${userId}`);
  };

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
            <Button onClick={myPageHandler}>
              <BiUser style={{ width: "20px", height: "20px" }} />
              <Text>My</Text>
            </Button>
          </Box>

          {/* 개스타 업로드 버튼 */}
          <HomeArea>
            <HomeBtn onClick={dogStarHandler}>
              <img
                src={plus}
                style={{ display: "block", width: "58px", height: "58px" }}
              />
            </HomeBtn>
            <UploadText>업로드</UploadText>
          </HomeArea>

          {/* top 버튼 */}
          {btnStatus ? (
            <TopWrap onClick={handleTop}>
              <TopBtn>
                <img src={Top} />
                <p>TOP</p>
              </TopBtn>
            </TopWrap>
          ) : null}
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
            <Button onClick={myPageHandler}>
              <BiUser style={{ width: "20px", height: "20px" }} />
              <Text>My</Text>
            </Button>
          </Box>

          {/* 산책 등록 버튼 */}
          <HomeArea>
            <HomeBtn onClick={postHandler}>
              <img
                src={addBtn}
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </HomeBtn>
            <Walk>산책등록</Walk>
          </HomeArea>

          {/* top 버튼 */}
          {btnStatus ? (
            <TopWrap onClick={handleTop}>
              <TopBtn>
                <img src={Top} />
                <p>TOP</p>
              </TopBtn>
            </TopWrap>
          ) : null}
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
  left: 50%;
  transform: translateX(-50%);
  min-width: 315px;
  max-width: 500px;
  width: 100%;
  height: 68px;
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

const TopWrap = styled.div`
  position: absolute;
  top: -50px;
  right: 0;
`;
const TopBtn = styled.button`
  width: 50px;
  height: 44px;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  padding: 2px 10px 0 4px;
  cursor: pointer;
  p {
    font-size: 12px;
    font-weight: 600;
  }
`;
export default NavBar;
