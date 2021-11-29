import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as modalActions } from "./modal";
//액션
//마이페이지
const GET_MYPAGE = "GET_MYPAGE";
const GET_LIST = "GET_LIST";

//유저
const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";

//강아지
const GET_DOG = "GET_DOG";
const UPDATE_DOG = "UPDATE_DOG";

//로딩
const LOADING = "LOADING";
//모달
const USER_MODAL = "USER_MODAL";
const DOG_MODAL = "DOG_MODAL";
//액션생성함수
//마이페이지 GET요청
const getMypage = createAction(GET_MYPAGE, (page) => ({ page }));
const getList = createAction(GET_LIST, (list) => ({ list }));
//유저 정보  GET,FETCH 요청
const getUser = createAction(GET_USER, (user) => ({ user }));
const updateUser = createAction(UPDATE_USER, (user) => ({ user }));

//강아지 정보 GET,FETCH 요청
const getDog = createAction(GET_DOG, (dog) => ({ dog }));
const updateDog = createAction(UPDATE_DOG, (dog) => ({ dog }));
//모달
const loading = createAction(LOADING, (loading) => ({ loading }));
const userModal = createAction(USER_MODAL, (user_modal) => ({ user_modal }));
const dogModal = createAction(DOG_MODAL, (dog_modal) => ({ dog_modal }));
const initialState = {
  list: [],
  page: [],
  user: [],
  dog: "",
  loading: "",
  user_modal: "",
  dog_modal: "",
};
const userModalMD = () => {
  return function (dispatch, getState, { history }) {
    dispatch(userModal(false));
    history.goBack();
  };
};
const dogModalMD = () => {
  return function (dispatch, getState, { history }) {
    dispatch(dogModal(false));
    history.goBack();
  };
};
const getMypageMD = (userId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://www.walkadog.shop/mypage/myInfo/${userId}`,
      data: {},
      headers: {
        "Content-Type": "multipart/form-data; ",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        const userInfo = res.data.posts[0];
        dispatch(getList(userInfo));
        dispatch(getList(userInfo));
      })
      .catch((err) => {
        // console.log("getMypageMD에서 오류발생", err);
       
        history.push("/login");
      });
  };
};

const getUserMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "https://www.walkadog.shop/users/me",
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        // console.log(res.data.user); // user 정보 확인
        localStorage.setItem("image", res.data.user[0].userImage);
        localStorage.setItem("userId", res.data.user[0].userId);
        localStorage.setItem("userNickname", res.data.user[0].userNickname);
        dispatch(getUser(res.data.user[0]));
      })
      .catch((err) => {
        // console.log("getUserMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateUserMD = (userInfo) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "https://www.walkadog.shop/users/me",
      data: userInfo,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
        // "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(updateUser(userInfo));
        dispatch(userModal(true));
      })
      .catch((err) => {
        // console.log("updateUserMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateUserImageMD = (userInfo) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "https://www.walkadog.shop/users/changeImage",
      data: userInfo,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        "Content-Type": "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(updateUser(userInfo));
        dispatch(loading(true));
        history.goBack();
      })
      .catch((err) => {
        // console.log("updateUserMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const getDogMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "https://www.walkadog.shop/dogs",
      data: {},
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(getDog(res.data.posts[0]));
        // console.log(res.data.posts);
        // if(res.data.posts.length)
        // localStorage.setItem("dog",true)
      })
      .catch((err) => {
        // console.log("getDogMD에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateDogMD = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "https://www.walkadog.shop/dogs",
      data: formData,
      headers: {
        accept: "application/json",
        // "Content-Type": "multipart/form-data; ",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(updateDog(formData));
        dispatch(dogModal(true));
      })
      .catch((err) => {
        // console.log("updateDogAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const updateDogImageMD = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PATCH",
      url: "https://www.walkadog.shop/dogs/changeImage",
      data: formData,
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data; ",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(updateDog(formData));

        history.goBack();
      })
      .catch((err) => {
        // console.log("updateDogAPI에서 오류발생", err);
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
    [GET_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
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
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
    [USER_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.user_modal = action.payload.user_modal;
      }),
    [DOG_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.dog_modal = action.payload.dog_modal;
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
  updateDogImageMD,
  getUser,
  getUserMD,
  updateUser,
  updateUserMD,
  updateUserImageMD,
  userModalMD,
  dogModalMD,
};

export { actionCreators };
