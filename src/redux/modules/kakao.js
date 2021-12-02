import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../lib/axios";
import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";
import { useDispatch } from "react-redux";

const SET_USER = "SET_USER";
const SET_DOG = "SET_DOG";

const setUser = createAction(SET_USER, (user_gender, user_age) => ({
  user_gender,
  user_age,
}));
const setDog = createAction(SET_DOG, (dog) => ({ dog }));

const initialState = {
  user: [],
  dog: [],
  check_dog: false,
  is_loading: true,
};

const kakaoLogin = (code) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://www.walkadog.shop/oauth/kakao/callback?code=${code}/`,
    })
      .then((res) => {
        // console.log(res);
        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN);
        history.replace("/kakaosignup");
      })
      .catch((err) => {
        // console.log("소셜로그인 에러", err);
        window.alert("소셜 로그인 실패");
        history.replace("/login");
      });
  };
};

const kakaoUser = (user_gender, user_age) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "https://www.walkadog.shop/users/kakaoSignUp",
      data: { user_gender, user_age },
      headers: {},
    })
      .then((res) => {
        // console.log(res);
        dispatch(setUser(user_gender, user_age));
        history.push("/");
      })
      .catch((err) => {
        // console.log("카카오 유저 회원가입에서 오류발생", err);
        window.alert("오류");
      });
  };
};

const kakaoDog = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "https://www.walkadog.shop/users/kakaoSignUp",
      data: formData,
      headers: {
        // "Content-Type": "multipart/form-data; ",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("user_login")}`,
      },
    })
      .then((res) => {
        // console.log(res); // signup 정보 확인
        dispatch(setDog(formData));
        window.alert("축하합니다. 회원가입이 완료되었습니다");
        history.push("/");
      })
      .catch((err) => {
        // console.log("카카오 강아지 입력 오류발생", err);
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
  },

  initialState
);

export const actionCreators = {
  kakaoLogin,
  kakaoUser,
  setUser,
  kakaoDog,
  setDog,
};
