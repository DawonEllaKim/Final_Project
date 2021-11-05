import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";
import axios from "axios";
// action
//메인 페이지 GET 요청
const GET_MAIN = "GET_MAIN";

//산책 페이지 GET,POST,FETCH,DELETE
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";

// action creators

//메인 페이지 GET 요청
const getMain = createAction(GET_MAIN,(main)=>({main}));

//산책 페이지 GET,POST,FETCH,DELETE
const getPost = createAction(GET_POST, (list) => ({list}));
const addPost = createAction(ADD_POST, (list) => ({ list }));
const updatePost = createAction(UPDATE_POST, (list) => ({ list }));
const deletePost = createAction(DELETE_POST, (list) => ({ list }));

// initialState
const initialState = {
  //메인 요청
  main: [],

  //산책 요청
  list: "",

};

//받는 데이터 dog_size,dog_gender,dog_age,location_category,completed
//dog_name,meeting_date
const getMainMD = () => {
  return function (dispatch, getState, { history }) {
    // console.log(postId);

    apis
      .getMainAX()
      .then((res) => {
        
        const postList = res.data;
        dispatch(getMain(postList));
        console.log("정보 불러오기 완료");
      })
      .catch((err) => {
        console.log(err);
        console.log("정보 불러오기 실패");
      });
  };
};

//받는 데이터 dog,user,location 전부!
// const getPostMD = (postId) => {
//   return function (dispatch, getState, { history }) {
//     // console.log(postId);

//     apis
//       .getPostAX(postId)
//       .then((res) => {
//         const postList = res.data;
//         dispatch(getPost(postList));
//         console.log("정보 불러오기 완료");
//       })
//       .catch((err) => {
//         console.log(err);
//         console.log("정보 불러오기 실패");
//       });
//   };
// };

const getPostMD = (postId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://localhost:4000/posts/${postId}`,
    })
    .then((res) => {
      
      res.data.longitude=res.data.longitude.toString();
      res.data.latitude=res.data.latitude.toString();
      const initialDate = res.data.meeting_date.split("T")[0];
      const year = initialDate.split("-")[0];
      const month = initialDate.split("-")[1];
      const day = initialDate.split("-")[2];
      const initialTime = res.data.meeting_date.split("T")[1];
      const hour = initialTime.split(":")[0];
      const minute = initialTime.split(":")[1];
      res.data.meeting_date= year + "년 " +month +"월 " +day +"일 " +hour +"시 " +minute +"분";
      res.data.mapedit_date= year+"-"+month+"-"+day+"T"+hour+":"+minute;
      const postList = res.data;
      console.log(res.data)
      dispatch(getPost(postList));
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
      url: `http://localhost:4000/posts/${postId}`,
    })
    .then((res) => {
      
      res.data.longitude=res.data.longitude.toString();
      res.data.latitude=res.data.latitude.toString();
      
      const postList = res.data;
      console.log(res.data)
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
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// const updatePostMD = (postId, post) =>{
//   return function(dispatch, getState, {history}){

//     apis
//       .updatePostAX(postId, post)
//       .then((res) => {
//         console.log(res.data)
//         // dispatch(updatePost(postId, post))
//         history.push('/')
//       })
//       .catch((err) =>{
//         console.log(err);
//       })
//   }
// }

const updatePostMD = (postId, post) => {
  return function (dispatch, getState, { history }) {
    apis
      .updatePostAX(postId, post)
      .then((res) => {
        // dispatch(updatePost(postId));
        console.log("수정완료");
        window.alert("수정완료");
        history.push(`/posts/${postId}`);
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
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// reducer
export default handleActions(
  {  [GET_MAIN]: (state, action) =>
    produce(state, (draft) => {
      draft.main = action.payload.main;

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
        const index = draft.list.findIndex(
          (post) => post.postId === action.payload.post.postId
        );
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
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
