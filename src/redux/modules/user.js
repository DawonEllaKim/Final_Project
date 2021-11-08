import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";

//액션
//마이페이지
const GET_MYPAGE = "GET_MYPAGE";

//유저
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";

//강아지
const GET_DOG = "GET_DOG";
const UPDATE_DOG = "UPDATE_DOG";

//액션생성함수
//마이페이지 GET요청
const getMypage = createAction(GET_MYPAGE, (page) => ({ page }));

//유저 정보 GET,FETCH 요청
const getUser = createAction(GET_USER, (user) => ({ user }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));

//강아지 정보 GET,FETCH 요청
const getDog = createAction(GET_DOG, (dog) => ({ dog }));
const updateDog = createAction(UPDATE_DOG, (dog) => ({ dog }));
const initialState = {
  page: [],
  user: [],
  dog: "",
};

const getMypageMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/users/mypage",
      data: {},
      headers: {
        "Content-Type": "multipart/form-data; ",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        console.log(res.data.posts);
        dispatch(getMypage(res.data.posts));
      })
      .catch((err) => {
        console.log("getMypageMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const getUserMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/users/me",
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        console.log(res.data.user); // user 정보 확인
        dispatch(getUser(res.data.user[0]));
      })
      .catch((err) => {
        console.log("getUserMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateUserMD = (userInfo) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "http://13.209.70.209/users/me",
      data: userInfo,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        dispatch(updateUser(userInfo));
        window.alert("수정 완료");
        history.push("/myPage");
      })
      .catch((err) => {
        console.log("updateUserMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const getDogMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/dogs",
      data: {},
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(getDog(res.data.posts[0]));
        console.log(res.data.posts);
        // if(res.data.posts.length)
        // localStorage.setItem("dog",true)
      })
      .catch((err) => {
        // console.log("getDogMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateDogMD = (dog_id, formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "http://13.209.70.209/dogs",
      data: formData,
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data; ",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        dispatch(updateDog(formData));
        window.alert("반려견 정보가 수정되었습니다.");
        history.goBack();
      })
      .catch((err) => {
        console.log("updateDogAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

export default handleActions(
  {
    [GET_MYPAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.page = action.payload.page;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [UPDATE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = { ...draft.user, ...action.payload.user };
      }),
    [GET_DOG]: (state, action) =>
      produce(state, (draft) => {
        draft.dog = action.payload.dog;
      }),
    [UPDATE_DOG]: (state, action) =>
      produce(state, (draft) => {
        draft.dog = { ...draft.dog, ...action.payload.dog };
      }),
  },
  initialState
);

const actionCreators = {
  getMypage,
  getMypageMD,
  getDog,
  getDogMD,
  updateDog,
  updateDogMD,
  getUser,
  getUserMD,
  updateUser,
  updateUserMD,
};

export { actionCreators };
