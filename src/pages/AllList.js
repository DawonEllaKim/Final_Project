import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

// 컴포넌츠
// import Card from "../components/Card";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Spinner from "../shared/Spinner";
import All from "../components/AllList/All";
import Olympic from "../components/AllList/Olympic";
import SeoulForest from "../components/AllList/SeoulForest";
import Banpo from "../components/AllList/Banpo";

// 이미지
import MainPageLogo from "../image/MainPageLogo.png";

import { FaPaw } from "react-icons/fa";
import { IoPawOutline } from "react-icons/io5";

// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const AllList = (props) => {
  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.main);
  const is_loading = useSelector((state) => state.sign.is_loading);
  const params = props.match.params.page;

  const all = () => {
    setStatus("all");
  };
  const olympic = () => {
    setStatus("olympic");
  };
  const seoul = () => {
    setStatus("seoul");
  };
  const banpo = () => {
    setStatus("banpo");
  };

  useEffect(() => {
    setStatus(params);
    setFocus(params);
    dispatch(postActions.getAllMD());
  }, []);

  if (is_loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div style={{ padding: "0 30px" }}>
          <TopBar>
            <FaPaw
              style={{ width: "24px", height: "24px", margin: " -4px 10px" }}
            />
            <span>산책가자</span>
          </TopBar>
        </div>

        <Wrap>
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
            {status === "all" && <All postList={postList} />}
            {status === "olympic" && <Olympic />}
            {status === "seoul" && <SeoulForest />}
            {status === "banpo" && <Banpo />}
          </Body>
        </Wrap>
        <NavBar />
      </div>
    );
  }
};

const Wrap = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  /* margin: 0 auto; */
  padding: 0 30px;
  box-sizing: border-box;
  /* border: 1px solid red; */
`;

const TopBarImg = styled.img`
  height: 22px;
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
    padding: 0 10px;
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
const Text = styled.p`
  width: 152px;
  height: 16px;
  margin: 12px 0 24px 0;
  font-size: 16px;
  font-weight: 700;
`;

export default AllList;
