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

  React.useEffect(() => {
    dispatch(postActions.getPostMD());
  }, []);

  return (
    <div>
      <div>WELCOME 코코 견주님</div>

      {postList.map((post, index) => {
        return <Card index={index} key={index} post={post} />;
      })}
      <button onClick={() => history.push("/myprofile")}>마이 프로필</button>
    </div>
  );
};

export default MyPage;

// iphone 13 size
// width :
// Width
// 390px
// Height
// 844px
