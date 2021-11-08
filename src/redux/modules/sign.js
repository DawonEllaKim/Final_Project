import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "./user";
const SET_USER = "SET_USER";
const SET_DOG = "SET_DOG";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const CHECK_DOG = "CHEKC_DOG";
const LOADING = "LOADING";
const GET_ID = "GET_ID"
const setUser = createAction(SET_USER, (user) => ({ user }));
const setDog = createAction(SET_DOG, (dog) => ({ dog }));
const login = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkDog = createAction(CHECK_DOG, (check_dog) => ({ check_dog }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getId  = createAction(GET_ID,(get_id) => ({get_id}) )
const initialState = {
  user: [],
  dog: [],
  check_dog: false,
  is_loading: true,
  get_id: [],
  is_login: false,
};

const logInMD = (user_email, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/users/login",
      data: { user_email, password },
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        const token = res.data.token;
        setCookie("token", token);
        localStorage.setItem("user_email", user_email);
        dispatch(checkDogAPI());
        dispatch(UserActions.getUserMD());
        history.push("/check")
      })
      .catch((err) => {
        window.alert("로그인 오류");
        console.log(err);
      });
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
        authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        dispatch(getId(res.data));
      })
      .catch((err) => {
        console.log("getIDDog", err);
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
      },
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        dispatch(setUser(formData));
        history.push("/login");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};
const checkDogAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/users/dog_exist",
      data: {},
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        // localStorage.setItem("dog",res.data)
        dispatch(checkDog(res.data));
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log("checkDog에서 오류발생", err);
      });
  };
};
const signDupAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/users/checkDup",
      data: formData,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        // dispatch(setUser(formData));
        // history.push("/signDog");
        window.alert("정상적인 이메일입니다");
      })
      .catch((err) => {
        console.log("중복입니다", err);
        window.alert("이메일중복입니다");
      });
  };
};

const signDogAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/dogs/dog_info",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data; ",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        dispatch(setDog(formData));
        dispatch(UserActions.getDogMD());
        window.alert("축하합니다. 회원가입이 완료되었습니다");
        history.push("/");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
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
        draft.user = null;
        draft.is_login = false;
        localStorage.removeItem("user_email");
        localStorage.removeItem("date");
        localStorage.removeItem("user_id");
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
};
