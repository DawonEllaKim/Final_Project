import axios from "axios";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";

const IN_BOX = "IN_BOX"; // 내가 받은 모든 쪽지 GET
const OUT_BOX = "OUT_BOX"; // 내가 보낸 모든 쪽지 GET
const SEND_MESSAGE = "SEND_MESSAGE"; // 쪽지 POST
const GET_DETAIL = "GET_DETAIL"; // 한 쪽지 GET

const inBox = createAction(IN_BOX, (inBoxList) => ({
  inBoxList,
}));
const outBox = createAction(OUT_BOX, (outBoxList) => ({
  outBoxList,
}));
const sendMessage = createAction(SEND_MESSAGE, (list) => ({
  list,
}));
const getDetail = createAction(GET_DETAIL, (inBoxList) => ({
  inBoxList,
}));

const initialState = {
  inBoxList: [],
  outBoxList: [],
  list: [],
};

const inBoxMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/chat/inbox",
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        const list = res.data.message;
        dispatch(inBox(list));
        console.log("나한테 온 모든 쪽지 GET 성공", res.data.message);
      })
      .catch((err) => {
        console.log("나한테 온 모든 쪽지 GET 에러", err);
      });
  };
};

const outBoxMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/chat/outBox",
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        const list = res.data.message;
        dispatch(outBox(list));
        console.log("내가 보낸 모든 쪽지 GET 성공", res.data.message);
      })
      .catch((err) => {
        console.log("내가 보낸 모든 쪽지 GET 에러", err);
      });
  };
};

const sendMessageMD = (receiverId, message) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `http://13.209.70.209/chat/${receiverId}`,
      data: { message },
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(sendMessage(message));
        window.confirm("쪽지를 보내시겠습니까?");
        console.log("쪽지 보내기 POST 성공", res.data);
        history.push("/notification");
      })
      .catch((err) => {
        window.alert("쪽지 보내기에 실패했습니다. 잠시후 다시 시도해주세요");
        console.log("쪽지 보내기 POST 에러", err);
        history.push("/notification");
      });
  };
};

const getDetailMD = (chatId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/chat/${chatId}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(getDetail(res.data.message));
        console.log("쪽지 하나에 대한 정보 GET 성공", res.data.message);
      })
      .catch((err) => {
        console.log("쪽지 하나에 대한 정보 GET 오류", err);
      });
  };
};

export default handleActions(
  {
    [IN_BOX]: (state, action) =>
      produce(state, (draft) => {
        draft.inBoxList = action.payload.inBoxList;
      }),
    [OUT_BOX]: (state, action) =>
      produce(state, (draft) => {
        draft.outBoxList = action.payload.outBoxList;
      }),
    [SEND_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.list);
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.inBoxList = action.payload.inBoxList;
      }),
  },
  initialState
);

export const actionCreators = {
  inBox,
  outBox,
  sendMessage,
  getDetail,
  inBoxMD,
  outBoxMD,
  sendMessageMD,
  getDetailMD,
};
