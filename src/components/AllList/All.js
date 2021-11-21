import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../../redux/modules/post";
import Card from "../Card";
import { history } from "../../redux/configureStore";

function All() {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.post.main);

  useEffect(() => {
    dispatch(postActions.getAllMD());
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

export default All;
