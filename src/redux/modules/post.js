import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import { apis } from "../../lib/axios";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";

// action
//메인 페이지 GET 요청
const GET_MAIN = "GET_MAIN";

const GET_MAP = "GET_MAP";
//산책 페이지 GET,POST,FETCH,DELETE
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";
// action creators
//메인 페이지 GET 요청
const getMain = createAction(GET_MAIN, (main) => ({ main }));
const getMap = createAction(GET_MAP, (map) => ({ map }));
//산책 페이지 GET,POST,FETCH,DELETE
const getPost = createAction(GET_POST, (list) => ({ list }));
const addPost = createAction(ADD_POST, (list) => ({ list }));
const updatePost = createAction(UPDATE_POST, (list) => ({ list }));
const deletePost = createAction(DELETE_POST, (list) => ({ list }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
// initialState
const initialState = {
  //메인 요청
  main: [],
  map: [],
  //산책 요청
  list: [],
  is_loading: true,
};

//받는 데이터 dog_size,dog_gender,dog_age,location_category,completed
//dog_name,meeting_date
const getMainMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/posts",
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        const postList = res.data.posts;
        dispatch(getMain(postList));
        dispatch(loading(false));
        // console.log("정보 불러오기 완료");
      })
      .catch((err) => {
        console.log(err);
        // console.log("정보 불러오기 실패");
      });
  };
};

const getPostMD = (postId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/posts/${postId}`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        res.data.posts.longitude = Number(res.data.posts.longitude);
        res.data.posts.latitude = Number(res.data.posts.latitude);
        localStorage.setItem("date", res.data.posts.meeting_date);
        const initialDate = res.data.posts.meeting_date.split("T")[0];
        const year = initialDate.split("-")[0];
        const month = initialDate.split("-")[1];
        const day = initialDate.split("-")[2];
        const initialTime = res.data.posts.meeting_date.split("T")[1];
        // const hour = initialTime.split(":")[0];
        // const minute = initialTime.split(":")[1];
        res.data.posts.meeting_date =
          year + "년 " + month + "월 " + day + "일 ";
        // hour +
        // "시 " +
        // minute +
        // "분";
        // res.data.mapedit_date =
        //   year + "-" + month + "-" + day + "T" + hour + ":" + minute;
        const postList = res.data.posts;
        console.log(res.data);
        dispatch(getPost(postList));
        dispatch(loading(false));
        console.log("정보 불러오기 완료");
      })
      .catch((err) => {
        console.log(err);
        console.log("정보 불러오기 실패");
      });
  };
};

//산책 수정할 때 GET으로 읽을 데이터 가져올 미들웨어
const getMapMD = (postId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://13.209.70.209/posts/${postId}`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("userLogin")}`,
      },
    })
      .then((res) => {
        res.data.posts.longitude = res.data.posts.longitude.toString();
        res.data.posts.latitude = res.data.posts.latitude.toString();
        const initialDate = res.data.posts.meeting_date.split("T")[0];
        const year = initialDate.split("-")[0];
        const month = initialDate.split("-")[1];
        const day = initialDate.split("-")[2];
        const initialTime = res.data.posts.meeting_date.split("T")[1];
        const hour = initialTime.split(":")[0];
        const minute = initialTime.split(":")[1];
        res.data.posts.meeting_date =
          year +
          "년 " +
          month +
          "월 " +
          day +
          "일 " +
          hour +
          "시 " +
          minute +
          "분";
        res.data.posts.mapedit_date =
          year + "-" + month + "-" + day + "T" + hour + ":" + minute;

        const postList = res.data.posts;
        console.log(postList);
        dispatch(getMap(postList));
        dispatch(loading(false));
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
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updatePostMD = (postId, post) => {
  return function (dispatch, getState, { history }) {
    apis
      .updatePostAX(postId, post)
      .then((res) => {
        // dispatch(updatePost(postId));
        console.log("수정완료");
        window.alert("수정완료");
        dispatch(updatePost(post));
        // history.push(`/posts/${postId}`);
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
        // dispatch(deletePost(postId));
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.main = action.payload.main;
      }),
    [GET_MAP]: (state, action) =>
      produce(state, (draft) => {
        draft.map = action.payload.map;
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.list);
      }),
    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = { ...draft.list, ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.postId);
        draft.list = draft.list.filter(
          (post) => post.id !== action.payload.postId
        );
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getMain,
  getPost,
  addPost,
  updatePost,
  deletePost,

  getMainMD,
  getPostMD,
  addPostMD,
  deletePostMD,
  updatePostMD,

  getMapMD,
};

export { actionCreators };
