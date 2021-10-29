import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

const SET_USER = "SET_USER";
const SET_DOG = "SET_DOG";
const SET_OWNER = "SET_OWNER";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const setDog = createAction(SET_USER, (dog) => ({ dog }));
const setOwner = createAction(SET_USER, (owner) => ({ owner }));
const login = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user)=>({user}));

const initialState = {
  user: " ",
  dog: " ",
  owner: " ",
  is_login: false,
};

const LogInMD = (username, password) => {
  return function (dispatch, getState, {history}) {
    apis
    .postLoginAX(username, password)
    .then((res) => {
      const token = res.data.token;
      setCookie("token",token)
      localStorage.setItem("username", username);
      dispatch(
        setUser({username: res.data.username,
        password: res.data.password,})
      )
    })
    .then(()=>{
      window.alert("로그인됨");
      history.push("/")
    })
    .catch((err)=>{
      window.alert("로그인 오류");
      console.log(err)
      }
    )
  }
}



const signUserAPI = (username, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/user",
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        window.alert("축하합니다");
        dispatch(setUser(username, password));
        history.push("/signDog");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const signDogAPI = (
  dogGender,
  dogName,
  dogSize,
  dogBreed,
  dogAge,
  neutral,
  dogComment,
  dogImage
) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/dog",
      data: {
        dogGender,
        dogName,
        dogSize,
        dogBreed,
        dogAge,
        neutral,
        dogComment,
        dogImage,
      },
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        window.alert("축하합니다");
        history.push("/signOwner");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const signOwnerAPI = (ownerName, ownerGender, ownerAge, ownerImage) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/owner",
      data: {
        ownerName,
        ownerGender,
        ownerAge,
        ownerImage,
      },
      // headers: {
      //     "Content-Type": "multipart/form-data; ",
      //     accept: "application/json",
      //     "Access-Control-Allow-Origin": "*",

      // },
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        window.alert("축하합니다");
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
    [SET_DOG]: (state, action) =>
      produce(state, (draft) => {
        draft.dog = action.payload.dog;
      }),
    [SET_OWNER]: (state, action) =>
      produce(state, (draft) => {
        draft.owner = action.payload.owner;
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) =>{
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
      [LOG_OUT]: (state, action) =>
      produce(state, (draft) =>{
        draft.user = null;
        draft.is_login = false;
        localStorage.removeItem("username");
        deleteCookie("token");
      })
  },

  initialState
);

export const actionCreators = {
  signUserAPI,
  signDogAPI,
  signOwnerAPI,
  login,
  LogInMD,
  logOut,
};
