import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const GET_USER = "GET_USER";

const getUser = createAction(GET_USER, (userList) => ({ userList }));

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

export default handleActions(
  {
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.userList;
        // 관련해서 useeffect
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  getUserMD,
};

export { actionCreators };
