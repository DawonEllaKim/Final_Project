import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as postActions } from "../../redux/modules/post";
import Card from "../Card";
import { history } from "../../redux/configureStore";

function SeoulForest() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.seoul);

  useEffect(() => {
    dispatch(postActions.getSeoulMD());
  }, []);

  return (
    <div>
      {postList.map((post, index) => {
        return (
          <div onClick={() => history.push(`/posts/${post.postId}`)}>
            <Card post={post} key={index} />
          </div>
        );
      })}
    </div>
  );
}

export default SeoulForest;
