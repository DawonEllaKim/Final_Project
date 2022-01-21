// AllList.js - 모든 산책 약속 목록을 조회하는 페이지
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// 컴포넌츠
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import All from "../components/AllList/All";
import Olympic from "../components/AllList/Olympic";
import SeoulForest from "../components/AllList/SeoulForest";
import Banpo from "../components/AllList/Banpo";

// 이미지
import WalkIcon from "../image/NavBar_Walk.png";
import { FaPaw } from "react-icons/fa";

const AllList = (props) => {
  const params = props.match.params.page;
  const location = useSelector((state) => state.main.main);
  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();

  const all = () => {
    setStatus("all");
    setFocus("all");
  };
  const olympic = () => {
    setStatus("olympic");
    setFocus("olympic");
  };
  const seoul = () => {
    setStatus("seoul");
    setFocus("seoul");
  };
  const banpo = () => {
    setStatus("banpo");
    setFocus("banpo");
  };

  useEffect(() => {
    setStatus(location);
    setFocus(params);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Wrap>
        {/* 위에 네브바 */}
        <TopBar>
          <img
            src={WalkIcon}
            style={{ width: "24px", height: "24px", margin: " -4px 10px" }}
          />
          <span>산책가자</span>
        </TopBar>

        {/* 카테고리 선택 */}
        <Category>
          <button
            onClick={all}
            onFocus={() => setFocus("all")}
            style={{
              borderBottom: focus === "all" ? "4px solid red" : "",
            }}
          >
            전체
          </button>

          <button
            onClick={olympic}
            onFocus={() => setFocus("olympic")}
            style={{
              borderBottom: focus === "olympic" ? "4px solid red" : "",
            }}
          >
            올림픽공원
          </button>

          <button
            onClick={seoul}
            onFocus={() => setFocus("seoul")}
            style={{
              borderBottom: focus === "seoul" ? "4px solid red" : "",
            }}
          >
            서울숲
          </button>

          <button
            onClick={banpo}
            onFocus={() => setFocus("banpo")}
            style={{
              borderBottom: focus === "banpo" ? "4px solid red" : "",
            }}
          >
            반포 한강공원
          </button>
        </Category>

        {/* 각 게시물에 대한 카드들 */}
        <Body>
          {(status === "all" || status === "") && <All />}
          {status === "olympic" && <Olympic />}
          {status === "seoul" && <SeoulForest />}
          {status === "banpo" && <Banpo />}
        </Body>
      </Wrap>
      <NavBar />
    </div>
  );
};

const Wrap = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  padding: 0 5%;
  box-sizing: border-box;
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    box-sizing: border-box;
    margin: 0 5px 20px 5px;
    padding: 0 5px;
    padding-bottom: 10px;
    background-color: transparent;
    border: none;
    text-align: center;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
`;

export default AllList;
