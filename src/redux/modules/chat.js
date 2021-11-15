import axios from "axios";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";

const GET_ALL_MY_CHAT_ROOMS = "GET_ALL_MY_CHAT_ROOMS";

const getAllMyChatRooms = createAction(GET_ALL_MY_CHAT_ROOMS, (list) => ({
  list,
}));

const initialState = {
  list: [],
  // chat: [],
  // user: [],
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

// reducer
export default handleActions(
  {
    [GET_ALL_MY_CHAT_ROOMS]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
  },
  initialState
);

export const actionCreators = {
  getAllMyChatRooms,
  getAllMyChatRoomsMD,
};
