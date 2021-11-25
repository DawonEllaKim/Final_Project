import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";

// action
const SET_MODAL = "SET_MODAL";


// action creators
const setModal= createAction(SET_MODAL, (modal) => ({
  modal,
}));


// initialState
const initialState = {
  modal: "",
};

// middleware
const setModalMD = (dogPostId) => {
  return function (dispatch, getState, { history }) {
   
    
    
  };
};


// reducer
export default handleActions(
  {
    [SET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modal=action.payload.modal
      }),
  },
  initialState
);

const actionCreators = {
  setModal,
  setModalMD,
};

export { actionCreators };
