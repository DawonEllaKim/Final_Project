import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

const SET_USER = "SET_USER";
const SET_DOG = "SET_DOG";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const setDog = createAction(SET_DOG, (dog) => ({ dog }));
const login = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user: [],
  dog: [],
  is_login: false,
};

const signUserAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://13.209.70.209/users/signUp",
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
        dispatch(setUser(formData));
        history.push("/signDog");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
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
        dispatch(
          setUser({
            user_email: res.data.user_email,
            password: res.data.password,
          })
        );
      })
      .then(() => {
        window.alert("로그인됨");
        history.push("/");
      })
      .catch((err) => {
        window.alert("로그인 오류");
        console.log(err);
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
        history.push("/signDog");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
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

const signDogAPI = (DogInfo) => {
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
        window.alert("축하합니다. 회원가입이 완료되었습니다");
        history.push("/");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};
const getDogAPI = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://13.209.70.209/dog",
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        console.log(res.data); // signup 정보 확인
        dispatch(setDog(res.data));
      })
      .catch((err) => {
        console.log("getDogAPI에서 오류발생", err);
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
        localStorage.removeItem("username");
        deleteCookie("token");
      }),
  },

  initialState
);

export const actionCreators = {
  signUserAPI,
  signDogAPI,
  getDogAPI,
  login,
  logInMD,
  logOut,
  signDupAPI,
};
