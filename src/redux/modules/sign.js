import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

const SET_USER = "SET_USER";
const SET_DOG = "SET_DOG";
// const SET_OWNER = "SET_OWNER";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const setDog = createAction(SET_DOG, (dog) => ({ dog }));
// const setOwner = createAction(SET_USER, (owner) => ({ owner }));
const login = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user)=>({user}));

const initialState = {
  user: [],
  dog: [],
  // owner: " ",
  is_login: false,
};

const logInMD = (user_email, password) => {
  return function (dispatch, getState, {history}) {
    apis
    .postLoginAX(user_email, password)
    .then((res) => {
      const token = res.data.token;
      setCookie("token",token)
      localStorage.setItem("user_email", user_email);
      dispatch(
        setUser({user_email: res.data.user_email,
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



const signUserAPI = (
    UserInfo
  ) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/users",
      data: UserInfo,
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        window.alert("회원 정보 등록이 완료되었습니다. \n강아지 정보를 입력해주세요");
        dispatch(setUser(UserInfo));
        history.push("/signDog");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};

const signDogAPI = (
 DogInfo
) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://localhost:4000/dog",
      data: DogInfo,
    })
      .then((res) => {
        console.log(res); // signup 정보 확인
        dispatch(setDog(DogInfo));
        window.alert("축하합니다. 회원가입이 완료되었습니다");
        history.push("/");
      })
      .catch((err) => {
        console.log("signupAPI에서 오류발생", err);
        window.alert("오류 발생");
      });
  };
};
const getDogAPI = (
  hi
 ) => {
   return function (dispatch, getState, { history }) {
     axios({
       method: "GET",
       url: "http://localhost:4000/dog",
   
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

// const signOwnerAPI = (ownerName, ownerGender, ownerAge, ownerImage) => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "POST",
//       url: "http://localhost:4000/owner",
//       data: {
//         ownerName,
//         ownerGender,
//         ownerAge,
//         ownerImage,
//       },
//       // headers: {
//       //     "Content-Type": "multipart/form-data; ",
//       //     accept: "application/json",
//       //     "Access-Control-Allow-Origin": "*",

//       // },
//     })
//       .then((res) => {
//         console.log(res); // signup 정보 확인
//         window.alert("축하합니다");
//         history.push("/");
//       })
//       .catch((err) => {
//         console.log("signupAPI에서 오류발생", err);
//         window.alert("오류 발생");
//       });
//   };
// };

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
    // [SET_OWNER]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.owner = action.payload.owner;
    //   }),
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
  getDogAPI,
  // signOwnerAPI,
  login,
  logInMD,
  logOut,
};
