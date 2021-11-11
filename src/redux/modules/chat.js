import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import socketClient from "socket.io-client";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const GET_MSG = "GET_MSG";
const SET_MSG = "SET_MSG";
const GET_USER = "GET_USER";

// action creators
const getMsg = createAction(GET_MSG, (msg) => ({ msg }));
const setMsg = createAction(SET_MSG, (msg) => ({ msg }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
  chat: [],
  user: [],
};

// middleware
const getMsgMD = () => {
  // return function(dispatch)
  // socket.on('load', {res} =>{
  //     disptch(getMsg(res))
  // })

  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://localhost:4000/chat",
      data: {},
      headers: {},
    })
      .then((res) => {
        console.log(res.data);
        dispatch(getMsg(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const setMsgMD = () => {
  return function (dispatch, getState, { history }) {};
};

const getUserMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://localhost:4000/chatuser",
      data: {},
      headers: {},
    })
      .then((res) => {
        console.log(res.data);
        dispatch(getUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.msg = action.payload.msg;
      }),
    [SET_MSG]: (state, action) =>
      produce(state, (draft) => {
        draft.msg = action.payload.msg;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
  },
  initialState
);

export const actionCreators = {
  getMsgMD,
  getUserMD,
};
