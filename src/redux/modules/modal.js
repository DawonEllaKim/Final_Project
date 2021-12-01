import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const SET_MODAL = "SET_MODAL";
const HIDE_MODAL = "HIDE_MODAL";
const EDIT_MODAL = "EDIT_MODAL";
// action creators
const setModal = createAction(SET_MODAL, (modal) => ({
  modal,
}));
const hideModal = createAction(HIDE_MODAL, () => ({}));
const editModal = createAction(EDIT_MODAL, (editId)=>({editId}))
// initialState
const initialState = {
  modal: "",
  editId: "",
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
      [EDIT_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.editId = action.payload.editId;
      }),
  },
  initialState
);

const actionCreators = {
  editModal,
  setModal,
  setModalMD,
  hideModal,
  hideModalMD,
};

export { actionCreators };
