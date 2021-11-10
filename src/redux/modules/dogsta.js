import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import post from "./post";
import { getCookie } from "../../shared/Cookie";

// 개스타그램
const ADD_POST = "ADD_POST"; // 포스트 작성
const GET_ALL_POST = "GET_ALL_POST"; // 모든 포스트 불러오기
const GET_MY_POST = "GET_MY_POST"; // 포스트 하나 불러오기
const GET_POST = "GET_POST"; // 포스트 하나 불러오기
const EDIT_POST = "EDIT_POST"; // 포스트 수정
const DELETE_POST = "DELETE_POST"; //포스트 삭제

const addPost = createAction(ADD_POST, (post) => ({ post }));
const getAllPost = createAction(GET_ALL_POST, (mainList) => ({ mainList }));
const getMyPost = createAction(GET_MY_POST, (eachList) => ({ eachList }));
const getPost = createAction(GET_POST, (eachList) => ({ eachList }));
const editPost = createAction(EDIT_POST, (eachList) => ({ eachList }));
const deletePost = createAction(DELETE_POST, (eachList) => ({ eachList }));

const initialState = {
  mainList: [],
  eachList: [],
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
        dispatch(addPost(formData));
        console.log("포스트 성공", res);
        // history.push("/mypage");
      })
      .catch((err) => {
        console.log("에러 발생", err);
      });
  };
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
        console.log(postList);
        dispatch(getAllPost(postList));
        // console.log("개스타그램 메인 게시물 불러오기 완료", postList);
      })
      .catch((err) => {
        console.log("개스타그램 메인 게시물 불러오기 실패", err);
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
        console.log(postList);
        dispatch(getPost(postList));
        // console.log("포스트 하나를 불러왔습니다", res);
      })
      .catch((err) => {
        console.log("포스트 하나 불러옴 실패", err);
      });
  };
};

const getPostMD = (userId, postId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/dogsta/${userId}/${postId}`,
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data;
        // console.log(postList);
        dispatch(getPost(postList));
        // console.log("포스트 하나를 불러왔습니다", res);
      })
      .catch((err) => {
        console.log("포스트 하나 불러옴 실패", err);
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
        console.log("수정 완료", res);
      })
      .catch((err) => {
        console.log("수정 실패", err);
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
        console.log("삭제 성공");
        window.alert("삭제 성공");
        history.goBack();
      })
      .catch((err) => {
        console.log("삭제 실패");
      });
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainList.push(action.payload.mainList);
      }),
    [GET_ALL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainList = action.payload.mainList;
      }),
    [GET_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = action.payload.eachList;
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = action.payload.eachList;
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
  addPost,
  addPostMD,
  getAllPost,
  getAllPostMD,
  getMyPost,
  getMyPostMD,
  getPost,
  getPostMD,
  editPost,
  editPostMD,
  deletePost,
  deletePostMD,
};

export { actionCreators };
