import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";

const MyPage = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.list);
  // console.log(postList);
  console.log(useSelector((state) => state));

  React.useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <div>
      <div>WELCOME 코코 견주님</div>
      <button onClick={() => history.push("/")}>뒤로가기(임시)</button>

      {postList.map((post, index) => {
        return <Card index={index} key={index} post={post} />;
      })}
      <button onClick={() => history.push("/myprofile")}>마이 프로필</button>
    </div>
  );
};

export default MyPage;
