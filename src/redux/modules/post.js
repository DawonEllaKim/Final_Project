import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// action
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

// action creators
const getPost = createAction(GET_POST, (postList) => ({ postList }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));

// initialState
const initialState = {
  list: [],
};

// middleware
const getPostMD = () => {
  return function (dispatch, getState, { history }) {
    // console.log(postId);

    apis
      .getPostAX()
      .then((res) => {
        const postList = res.data;
        dispatch(getPost(postList));
        console.log("정보 불러오기 완료");
      })
      .catch((err) => {
        console.log(err);
        console.log("정보 불러오기 실패");
      });
  };
};

const addPostMD = (post) => {
  return function (dispatch, getState, { history }) {
    apis
      .createPostAX(post)
      .then((res) => {
        console.log(res);
        dispatch(addPost(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deletePostMD = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log(postId);
    apis
      .deletePostAX(postId)
      .then((res) => {
        console.log("삭제 완료");
        window.alert("삭제 완료");
        dispatch(deletePost(postId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.postList;
        console.log(draft.list);
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post;
        console.log(draft.list);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.postId);
        draft.list = draft.list.filter(
          (post) => post.id !== action.payload.postId
        );
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  addPost,
  deletePost,
  getPostMD,
  addPostMD,
  deletePostMD,
};

export { actionCreators };
