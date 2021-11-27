import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const SET_MAIN = "SET_MAIN";

// action creators
const setMain = createAction(SET_MAIN, (main) => ({
  main,
}));

// initialState
const initialState = {
  main: "",
};

// middleware
const setMainMD = (location) => {
  return function (dispatch, getState, { history }) {
    dispatch(setMain(location));
    history.push(`/alllist/${location}`);
  };
};

// reducer
export default handleActions(
  {
    [SET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main = action.payload.main;
      }),
  },
  initialState
);

const actionCreators = {
  setMain,
  setMainMD,
};

export { actionCreators };
