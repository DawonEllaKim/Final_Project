import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

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
const getUser = createAction(GET_USER, (userList) => ({ userList }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));

//강아지 정보 GET,FETCH 요청
const getDog = createAction(GET_DOG, (dog) => ({ dog }));
const updateDog = createAction(UPDATE_DOG, (dog) => ({ dog }));
const initialState = {
  page: [],
  user: [],
  dog: [],
};

const getMypageMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://localhost:4000/mypage`,
      data: {},
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(getMypage(res.data));
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
      url: `http://localhost:4000/users/me`,
      data: {},
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res.data); // user 정보 확인

        dispatch(getUser(res.data));
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
      url: `http://localhost:4000/users/me`,
      data: userInfo,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        dispatch(updateUser(userInfo));
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
      url: "http://localhost:4000/dogs",
      data: {},
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(getDog(res.data));
      })
      .catch((err) => {
        // console.log("getDogMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateDogMD = (dog_id, dogInfo) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "http://localhost:4000/dogs",
      data: dogInfo,
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        dispatch(updateDog(dogInfo));
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
