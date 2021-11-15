// dogsta.js - 개스타그램 게시물 GET,POST,PATCH,DELETE 액션들
import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";

const GET_ALL_POST = "GET_ALL_POST"; // 개스타그램 모든 게시물 불러오기
const GET_DOGPOST = "GET_DOGPOST"; // 개스타그램 게시물 하나 불러오기
const GET_MY_POST = "GET_MY_POST"; // 개스타그램 나의 게시물 불러오기
const ADD_POST = "ADD_POST"; // 개스타그램 게시물 작성
const EDIT_POST = "EDIT_POST"; // 개스타그램 게시물 수정
const DELETE_POST = "DELETE_POST"; // 개스타그램 게시물 삭제

const getAllPost = createAction(GET_ALL_POST, (mainList) => ({ mainList }));
const getDogPost = createAction(GET_DOGPOST, (eachList) => ({ eachList }));
const getMyPost = createAction(GET_MY_POST, (myList) => ({ myList }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (eachList) => ({ eachList }));
const deletePost = createAction(DELETE_POST, (eachList) => ({ eachList }));

const initialState = {
  mainList: [],
  myList: [],
  eachList: [],
};

const getAllPostMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/dogsta",
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts;
        dispatch(getAllPost(postList));
        console.log("개스타그램 모든 게시물 GET 성공", postList);
      })
      .catch((err) => {
        console.log("개스타그램 모든 게시물 GET 에러", err);
      });
  };
};

const getPostMD = (userId, dogPostId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/dogsta/${userId}/${dogPostId}`,
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts[0];
        dispatch(getDogPost(postList));
        console.log("개스타그램 게시물 하나 GET 성공", res);
      })
      .catch((err) => {
        console.log("개스타그램 게시물 하나 GET 오류", err);
      });
  };
};

const getMyPostMD = (userId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/dogsta/${userId}`,
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts;
        dispatch(getMyPost(postList));
        console.log("개스타그램 나의 게시물 GET 성공", res);
      })
      .catch((err) => {
        console.log("개스타그램 나의 게시물 GET 오류", err);
      });
  };
};

const addPostMD = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/dogsta/write",
      data: formData,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        // dispatch(addPost(formData));
        console.log("개스타그램 게시물 POST 성공", res);
      })
      .catch((err) => {
        console.log("개스타그램 게시물 POST 에러", err);
      });
  };
};

const editPostMD = (postId, post) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "PATCH",
      url: `http://13.209.70.209/dogsta/${postId}`,
      data: post,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        dispatch(editPost(post));
        console.log("개스타그램 게시물 PATCH 완료", res);
      })
      .catch((err) => {
        console.log("개스타그램 게시물 PATCH 오류", err);
      });
  };
};

const deletePostMD = (postId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "DELETE",
      url: `http://13.209.70.209/dogsta/${postId}`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        window.alert("삭제 성공");
        history.goBack();
        console.log("개스타그램 게시물 DELETE 성공", res);
      })
      .catch((err) => {
        console.log("개스타그램 게시물 DELETE 오류", err);
      });
  };
};

export default handleActions(
  {
    [GET_ALL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainList = action.payload.mainList;
      }),
    [GET_DOGPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = action.payload.eachList;
      }),
    [GET_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.myList = action.payload.myList;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainList.push(action.payload.mainList);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = { ...draft.eachList, ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = draft.eachList.filter(
          (post) => post.id !== action.payload.postId
        );
      }),
  },
  initialState
);

const actionCreators = {
  getAllPost,
  getDogPost,
  getMyPost,
  addPost,
  editPost,
  deletePost,

  getAllPostMD,
  getPostMD,
  getMyPostMD,
  addPostMD,
  editPostMD,
  deletePostMD,
};

export { actionCreators };
