import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENT = "GET_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// action creators
const addComment = createAction(ADD_COMMENT, (commentList) => ({
  commentList,
}));
const getComment = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));
const editComment = createAction(EDIT_COMMENT, (commentList) => ({commentList}));
const deleteComment = createAction(DELETE_COMMENT, (commentId) => ({
  commentId
}));

// initialState
const initialState = {
  commentList: [],
};

// middleware
const addCommentMD = (comments) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/comment",
      data: comments,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        console.log("댓글 post", res.data);
      })
      .catch((err) => {
        console.log("댓글 post 실패", err);
      });
  };
};

const getCommentMD = (dogPostId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://localhost:4000/comment/`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        const commentList = res.data;
        console.log("댓글 get", commentList);
        dispatch(getComment(commentList));
      })
      .catch((err) => {
        console.log("댓글 get 에러", err);
      });
  };
};

const editCommentMD = () =>{
  return function(dispatch, useState, {history}){
    axios({
      method: "GET",
      url: `http://localhost:4000/comment/`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
    .then((res) =>{
      dispatch(editComment())
      console.log('댓글 수정', res.data);
    })
    .catch((err) =>{
      console.log('댓글 수정 에러', err)
    })
  }
}

const deleteCommentMD = (id) =>{
  return function(dispatch, getState, {history}){
    console.log(id)
    axios({
      method: "DELETE",
      url: `http://localhost:4000/comment/${id}`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        const commentList = res.data;
        console.log("댓글 삭제 성공", commentList);
        // dispatch(deleteComment(commentList));
      })
      .catch((err) => {
        console.log("댓글 삭제 에러", err);
      });
  }
}

// reducer
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList.push(action.payload.commentList);
      }),
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList;
      }),
    [EDIT_COMMENT]: (state, action) => 
      produce(state, (draft) => {
        draft.commentList = {...draft.commentList, ...action.payload.post}
      }),
    [DELETE_COMMENT]: (state, action) => 
      produce(state, (draft) => {
        console.log(action.payload)
        draft.commentList = draft.commentList.filter(
          (comment) => comment.id !== action.payload.commentId
        )
      }),
  },
  initialState
);

const actionCreators = {
  addComment,
  addCommentMD,
  getComment,
  getCommentMD,
  editComment,
  editCommentMD,
  deleteComment,
  deleteCommentMD
};

export { actionCreators };
