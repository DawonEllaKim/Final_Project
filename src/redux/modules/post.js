import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

const GET_POST = "GET_POST";

const getPost = createAction(GET_POST, (postList) => ({ postList }));

const initialState = {
  list: [],
};

const getPostMD = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPostAX()
      .then((res) => {
        const postList = res.data;
        // console.log(postList);
        dispatch(getPost(postList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostMD,
};

export { actionCreators };
