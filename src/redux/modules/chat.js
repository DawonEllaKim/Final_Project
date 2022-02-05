// chat.js - 쪽지함 불러오기, 쪽지 보내기, 쪽지 삭제하기
import axios from "axios";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as modalActions } from "./modal";

const IN_BOX = "IN_BOX"; // 내가 받은 모든 쪽지 GET
const OUT_BOX = "OUT_BOX"; // 내가 보낸 모든 쪽지 GET
const SEND_MESSAGE = "SEND_MESSAGE"; // 쪽지 POST
const GET_DETAIL = "GET_DETAIL"; // 한 쪽지 GET
const DELETE_IN_MESSAGE = "DELETE_IN_MESSAGE"; // 받은 쪽지함에서 하나 삭제
const DELETE_OUT_MESSAGE = "DELETE_OUT_MESSAGE"; // 보낸 쪽지함에서 하나 삭제
const GET_MODAL = "GET_MODAL";

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
const deleteInMessage = createAction(DELETE_IN_MESSAGE, (chatId) => ({
  chatId,
}));
const deleteOutMessage = createAction(DELETE_OUT_MESSAGE, (chatId) => ({
  chatId,
}));
const getModal = createAction(GET_MODAL, (modal) => ({ modal }));
const initialState = {
  inBoxList: [],
  outBoxList: [],
  list: [],
  modal: "",
};

const modalMD = () => {
  return function (dispatch, getState, { history }) {
    dispatch(getModal(false));
    history.goBack();
  };
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
        // console.log("나한테 온 모든 쪽지 GET 성공", res.data.message);
      })
      .catch((err) => {
        // console.log("나한테 온 모든 쪽지 GET 에러", err);
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
        // console.log("내가 보낸 모든 쪽지 GET 성공", res.data.message);
      })
      .catch((err) => {
        // console.log("내가 보낸 모든 쪽지 GET 에러", err);
      });
  };
};

const sendMessageMD = (receiverId, message, type) => {
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
        dispatch(sendNotificationMD(receiverId, 1));
        dispatch(getModal(true));
        // console.log("쪽지 보내기 POST 성공", res.data);
      })
      .catch((err) => {
        window.alert("쪽지 보내기에 실패했습니다. 잠시후 다시 시도해주세요");
        // console.log("쪽지 보내기 POST 에러", err);
      });
  };
};

const sendNotificationMD = (receiverId, type, postId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: `http://13.209.70.209/notification/${receiverId}`,
      data: { type: type, postId: postId },
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        if (type == 1) {
          dispatch(modalActions.setModal("쪽지보내기 성공"));
          history.push("/deleteModal");
        } else {
          dispatch(modalActions.setModal("산책 신청 성공"));
          history.push("/successModal");
        }
      })
      .catch((err) => {
        if (type == 1) {
          window.alert("쪽지 보내기에 실패했습니다. 잠시후 다시 시도해주세요");

          history.push("/notification");
        } else {
          dispatch(modalActions.setModal(err.response.data.msg));
          history.push("/successModal");
        }
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
        // console.log("쪽지 하나 DELETE 성공", res.data.message);
      })
      .catch((err) => {
        // console.log("쪽지 하나 DELETE 오류", err);
      });
  };
};

const deleteInMessageMD = (receiverId, senderId, chatId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "POST",
      url: `http://13.209.70.209/chat/${receiverId}/${senderId}/${chatId}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(deleteInMessage(chatId));
        // console.log("Inbox에서 쪽지 하나 DELETE 성공", res.data);
      })
      .catch((err) => {
        // console.log("Inbox에서 쪽지 하나 DELETE 오류", err);
      });
  };
};

const deleteOutMessageMD = (receiverId, senderId, chatId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "POST",
      url: `http://13.209.70.209/chat/${receiverId}/${senderId}/${chatId}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(deleteOutMessage(chatId));
        // console.log("Outbox에서 쪽지 하나 DELETE 성공", res.data);
      })
      .catch((err) => {
        // console.log("Outbox에서쪽지 하나 DELETE 오류", err);
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
    [DELETE_IN_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.inBoxList = draft.inBoxList.filter(
          (message) => message.chatId !== action.payload.chatId
        );
      }),
    [DELETE_OUT_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        // console.log(state);
        // console.log(action.payload);
        // console.log(action.payload.outBoxList);
        // console.log(action);
        // console.log(draft);
        const newList = draft.outBoxList.filter(
          (message) => message.chatId !== action.payload.chatId
        );
        // console.log(newList);
        draft.outBoxList = newList;
      }),
    [GET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modal = action.payload.modal;
      }),
  },
  initialState
);

export const actionCreators = {
  inBox,
  outBox,
  sendMessage,

  getDetail,
  deleteInMessage,
  deleteOutMessage,
  modalMD,
  inBoxMD,
  outBoxMD,
  sendMessageMD,
  sendNotificationMD,
  getDetailMD,
  deleteInMessageMD,
  deleteOutMessageMD,
};
