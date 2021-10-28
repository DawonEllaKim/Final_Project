import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";

const getUser = createAction(GET_USER, (userList) => ({ userList }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));

const initialState = {
  list: [],
};

const getUserMD = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getUserAX()
      .then((res) => {
        const userList = res.data;
        // console.log(userList);
        dispatch(getUser(userList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateUserMD = (user) => {
  return function (dispatch, getState, { history }) {
    apis
      .updateUserAX(user)
      .then((res) => {
        dispatch(updateUser(user));
        console.log("okay");
      })
      .catch((err) => console.log(err));
  };
};

export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.userList;
        // 관련해서 useeffect
      }),
    [UPDATE_USER]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.list.findIndex(
          (user) => user.id === action.payload.user.id
        );
        draft.list[index] = { ...draft.list[index], ...action.payload.user };
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  getUserMD,
  updateUser,
  updateUserMD,
};

export { actionCreators };
