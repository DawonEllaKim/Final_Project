import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const SET_MODAL = "SET_MODAL";
const HIDE_MODAL = "HIDE_MODAL";

// action creators
const setModal = createAction(SET_MODAL, (modal) => ({
  modal,
}));
const hideModal = createAction(HIDE_MODAL, () => ({}));

// initialState
const initialState = {
  modal: "",
};

// middleware
const setModalMD = (dogPostId) => {
  return function (dispatch, getState, { history }) {};
};
const hideModalMD = (dogPostId) => {
  return function (dispatch, getState, { history }) {};
};

// reducer
export default handleActions(
  {
    [SET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modal = action.payload.modal;
      }),
    [HIDE_MODAL]: (state, action) =>
      produce(state, (draft) => {
        return;
      }),
  },
  initialState
);

const actionCreators = {
  setModal,
  setModalMD,
  hideModal,
  hideModalMD,
};

export { actionCreators };
