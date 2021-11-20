import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// 컴포넌츠
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Spinner from "../shared/Spinner";

// 리덕스
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import Olympic from "../components/AllList/Olympic";
import All from "../components/AllList/All";
import SeoulForest from "../components/AllList/SeoulForest";
import Banpo from "../components/AllList/Banpo";

const AllList = (props) => {
  const [status, setStatus] = useState();
  const [focus, setFocus] = useState();

  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.main);
  const is_loading = useSelector((state) => state.sign.is_loading); // 화면 로딩중일때 보일 스피너

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

  const params = props.match.params.page;

  useEffect(() => {
    setStatus(params);
    setFocus(params);
    // dispatch(postActions.getOlympicMD()); // 모든 산책 약속 게시물 불러오기
  }, []);

  if (is_loading) {
    return <Spinner />;
  } else {
    return (
      <Wrap>
        <TopBar> 산책할개 </TopBar>

        {/* 알림, 받은 쪽지함, 보낸 쪽지함 */}
        <Category>
          <button
            onClick={all}
            onFocus={() => setFocus("all")}
            style={{
              borderBottom: focus === "all" ? "4px solid red" : "",
            }}
          >
            All
          </button>

          <button
            onClick={olympic}
            onFocus={() => setFocus("olympic")}
            style={{
              borderBottom: focus === "olympic" ? "4px solid red" : "",
            }}
          >
            올림픽 공원
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
            반포 한강
          </button>
        </Category>

        {/* 각 게시물에 대한 카드들 */}
        <Body>
          <Text>같이 산책하실래요?</Text>
          {status === "all" && <All />}
          {status === "olympic" && <Olympic />}
          {status === "seoul" && <SeoulForest />}
          {status === "banpo" && <Banpo />}
        </Body>
        <NavBar />
      </Wrap>
    );
  }
};

const Wrap = styled.div`
  text-align: center;
  position: relative;
  width: 390px;
  margin: 0 auto;
  padding: 0 20px 60px 20px;
  box-sizing: border-box;
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  button {
    box-sizing: border-box;
    width: 70px;
    margin: 0 10px;
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
  margin: 28px 0;
  border-top: 1px solid #c4c4c4;
`;
const Text = styled.p`
  width: 152px;
  height: 16px;
  margin: 12px 0 24px 0;
  font-size: 16px;
  font-weight: 700;
`;

export default AllList;
