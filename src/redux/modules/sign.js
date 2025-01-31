import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "./user";
import { actionCreators as modalActions } from "./modal";

const SET_USER = "SET_USER";
const SET_DOG = "SET_DOG";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const CHECK_DOG = "CHEKC_DOG";
const LOADING = "LOADING";
const GET_ID = "GET_ID";
const GET_ALERT = "GET_ALERT";
const GET_MODAL = "GET_MODAL";
const USER_MODAL = "USER_MODAL";
const DOG_MODAL = "DOG_MODAL";
const CHECK_EMAIL = "CHECK_EMAIL";

const setUser = createAction(SET_USER, (user) => ({ user }));
const setDog = createAction(SET_DOG, (dog) => ({ dog }));
const login = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkDog = createAction(CHECK_DOG, (check_dog) => ({ check_dog }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getId = createAction(GET_ID, (get_id) => ({ get_id }));
const getAlert = createAction(GET_ALERT, (alert) => ({ alert }));
const getModal = createAction(GET_MODAL, (modal) => ({ modal }));
const userModal = createAction(USER_MODAL, (user_modal) => ({ user_modal }));
const dogModal = createAction(DOG_MODAL, (dog_modal) => ({ dog_modal }));
const checkEmail = createAction(CHECK_EMAIL, (checkEmail, checkColor) => ({
  checkEmail,
  checkColor,
}));

const initialState = {
  user: [],
  dog: [],
  check_dog: false,
  is_loading: true,
  get_id: [],
  is_login: false,
  alert: "",
  modal: "",
  user_modal: "",
  dog_modal: "",
  checkEmail: false,
  checkColor: "",
};

const modalMD = () => {
  return function (dispatch, getState, { history }) {
    dispatch(getModal(false));
    history.push("/check");
  };
};
const signDupAPI = (userEmail) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/users/checkDup",
      data: { userEmail },
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        dispatch(setUser(userEmail));
        dispatch(checkEmail(true, "green"));
      })
      .catch((err) => {
        dispatch(checkEmail("used", "red"));
        // console.log("이미 사용 중인 이메일입니다.", err);
        // window.alert("이미 사용 중인 이메일입니다.");
        // throw new Error("회원가입오류");
      });
  };
};
const logInMD = (userEmail, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/users/login",
      data: { userEmail, password },
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        dispatch(loading(false));
        const token = res.data.token;

        setCookie("token", token);
        localStorage.setItem("userEmail", userEmail);
        dispatch(checkDogAPI());
        dispatch(UserActions.getUserMD());
        dispatch(loading(Math.floor(Math.random() * 10 + 1)));
        // dispatch(getModal(true));
        history.push("/check");
      })
      .catch((err) => {
        dispatch(loading(Math.floor(Math.random() * 10 + 1)));
        dispatch(getAlert("✔︎ 아이디 또는 비밀번호가 잘못 입력 되었습니다."));
      });
  };
};
const logoutMD = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    dispatch(modalActions.setModal("로그아웃 되었습니다"));
    localStorage.removeItem("checkDog");
    history.push("/deleteModal");
  };
};
const getIdAPI = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/users/giveUserId",
      headers: {
        // "content-type": "application/json;charset=UTF-8",

        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        dispatch(getId(res.data));
      })
      .catch((err) => {
        // console.log("getIDDog", err);
        window.alert("오류 발생");
      });
  };
};
const signUserAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/users/signUp",
      data: formData,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(modalActions.setModal("회원가입 완료"));
        history.push("/signupModal");
      })
      .catch((err) => {
        window.alert("회원가입오류");
        window.location.reload("/signup");
      });
  };
};
const checkDogAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/users/dogExist",
      data: {},
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data); // signup 정보 확인
        // localStorage.setItem("dog", res.data);
        dispatch(checkDog(res.data));
        localStorage.setItem("checkDog", res.data);
        dispatch(loading(false));
        // console.log("체크독", res.data);
      })
      .catch((err) => {
        // console.log("checkDog에서 오류발생", err);
      });
  };
};
const signDogAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/dogs/dogInfo",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data; ",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // console.log(res); // signup 정보 확인
        dispatch(setDog(formData));
        dispatch(UserActions.getDogMD());
        dispatch(checkDogAPI());
        dispatch(loading(Math.floor(Math.random() * 10 + 1)));
        // localStorage.setItem("checkDog", true);
        history.push("/");

        dispatch(dogModal(false));
      })
      .catch((err) => {
        dispatch(loading(Math.floor(Math.random() * 10 + 1)));
        // console.log("signupAPI에서 오류발생", err);
      });
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
      }),
    [GET_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.get_id = action.payload.get_id;
      }),
    [SET_DOG]: (state, action) =>
      produce(state, (draft) => {
        draft.dog = action.payload.dog;
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.modal = false;
        draft.user = null;
        draft.is_login = false;
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userNickname");
        localStorage.removeItem("date");
        localStorage.removeItem("userId");
        localStorage.removeItem("image");
        deleteCookie("token");
      }),
    [CHECK_DOG]: (state, action) =>
      produce(state, (draft) => {
        draft.check_dog = action.payload.check_dog;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [GET_ALERT]: (state, action) =>
      produce(state, (draft) => {
        draft.alert = action.payload.alert;
      }),
    [GET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modal = action.payload.modal;
      }),
    [USER_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.user_modal = action.payload.user_modal;
      }),
    [DOG_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.dog_modal = action.payload.dog_modal;
      }),
    [CHECK_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.checkEmail = action.payload.checkEmail;
        draft.checkColor = action.payload.checkColor;
      }),
  },

  initialState
);

export const actionCreators = {
  signUserAPI,
  signDogAPI,
  login,
  logInMD,
  logOut,
  signDupAPI,
  checkDogAPI,
  getIdAPI,
  getAlert,
  modalMD,
  logoutMD,
  checkEmail,
};
