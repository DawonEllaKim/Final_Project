import axios from "axios";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";

const GET_ALL_MY_CHAT_ROOMS = "GET_ALL_MY_CHAT_ROOMS"; // 나의 모든 채팅 방 불러오기
const SEND_MESSAGE = "SEND_MESSAGE";
const GET_ONE_CHAT = "GET_ONE_CHAT";

const getAllMyChatRooms = createAction(GET_ALL_MY_CHAT_ROOMS, (list) => ({
  list,
}));
const sendMessage = createAction(SEND_MESSAGE, (oneList) => ({
  oneList,
}));
const getOneChat = createAction(GET_ONE_CHAT, (oneList) => ({
  oneList,
}));

const initialState = {
  list: [],
  oneList: [],
};

const getAllMyChatRoomsMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://localhost:4000/chats",
      data: {},
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        const allMyChatRooms = res.data;
        dispatch(getAllMyChatRooms(allMyChatRooms));
        console.log("나한테 온 모든 쪽지방 GET 성공", res.data);
      })
      .catch((err) => {
        console.log("나한테 온 모든 쪽지방 GET 에러", err);
      });
  };
};

const sendMessageMD = (chatInfo) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/onechat",
      data: chatInfo,
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        dispatch(sendMessage(chatInfo));
        console.log("쪽지 보내기 POST 성공", res.data);
      })
      .catch((err) => {
        console.log("쪽지 보내기 POST 에러", err);
      });
  };
};

const getOneChatMD = () => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: "http://localhost:4000/onechat",
      data: {},
      headers: {},
    })
      .then((res) => {
        dispatch(getOneChat(res.data));
        console.log("방 한개에 대한 모든 메세지 GET 성공", res.data);
      })
      .catch((err) => {
        console.log("방 한개에 대한 모든 메세지 GET 오류", err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_ALL_MY_CHAT_ROOMS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [SEND_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.oneList.push(action.payload.oneList);
      }),
    [GET_ONE_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.oneList = action.payload.oneList;
      }),
  },
  initialState
);

export const actionCreators = {
  getAllMyChatRooms,
  sendMessage,
  getOneChat,
  getAllMyChatRoomsMD,
  sendMessageMD,
  getOneChatMD,
};
