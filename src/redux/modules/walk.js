import axios from "axios";
import { produce } from "immer";
import { getCookie } from "../../shared/Cookie";
import { createAction, handleActions } from "redux-actions";
import { actionCreators as modalActions } from "./modal";

const PAGE_BANPO = "PAGE_BANPO"; // 내가 받은 모든 쪽지 GET
const PAGE_OLYMPIC = "PAGE_OLYMPIC"; // 내가 보낸 모든 쪽지 GET
const PAGE_SEOUL = "PAGE_SEOUL"; // 쪽지 POST
const PAGE_ALL = "PAGE_ALL"; // 한 쪽지 GET

const ADD_ALL = "ADD_ALL";
const ADD_BANPO = "ADD_BANPO";
const ADD_OLYMPIC = "ADD_OLYMPIC";
const ADD_SEOUL = "ADD_SEOUL";
const pageBanpo = createAction(PAGE_BANPO, (page_banpo) => ({
  page_banpo,
}));
const pageOlympic = createAction(PAGE_OLYMPIC, (page_olympic) => ({
  page_olympic,
}));
const pageSeoul = createAction(PAGE_SEOUL, (page_seoul) => ({
  page_seoul,
}));
const pageAll = createAction(PAGE_ALL, (page_all) => ({
  page_all,
}));

const addAll = createAction(ADD_ALL, (page_all) => ({
  page_all,
}));
const addBanpo = createAction(ADD_BANPO, (page_banpo) => ({
  page_banpo,
}));
const addOlympic = createAction(ADD_OLYMPIC, (page_olympic) => ({
  page_olympic,
}));
const addSeoul = createAction(ADD_SEOUL, (page_seoul) => ({
  page_seoul,
}));

const initialState = {
  page_olympic: [],
  page_banpo: [],
  page_seoul: [],
  page_all: [],
};

const pageAllMD = (pageNum) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://www.togather1.com/posts/test?pageNum=${pageNum}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        if (pageNum == 1) {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const whenTheMeeting = res.data.posts.contents[i].meetingDate;
            const todayOriginal = new Date().toISOString();

            console.log(
              "whenTheMeeting",
              whenTheMeeting,
              "todayOriginal",
              todayOriginal
            );

            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];

            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;

            res.data.posts.contents[i].completed =
              whenTheMeeting < todayOriginal ? "마감" : "진행중";
          }
          const postList = res.data.posts.contents;

          dispatch(pageAll(postList));
        } else {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
            const postList = res.data.posts.contents[i];
            dispatch(addAll(postList));
          }
        }

        // console.log("나한테 온 모든 쪽지 GET 성공", res.data.message);
      })
      .catch((err) => {
        // console.log("나한테 온 모든 쪽지 GET 에러", err);
      });
  };
};

const pageOlympicMD = (pageNum) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://www.togather1.com/posts/(test)/olympicPark?pageNum=${pageNum}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        if (pageNum == 1) {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
          }
          const postList = res.data.posts.contents;
          // console.log([postList]);
          dispatch(pageOlympic(postList));
        } else {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
            const postList = res.data.posts.contents[i];
            // console.log([postList]);
            dispatch(addOlympic(postList));
          }
        }
      })
      .catch((err) => {
        // console.log("나한테 온 모든 쪽지 GET 에러", err);
      });
  };
};
const pageSeoulMD = (pageNum) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://www.togather1.com/posts/test/seoulForest?pageNum=${pageNum}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        if (pageNum == 1) {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
          }
          const postList = res.data.posts.contents;
          // console.log([postList]);
          dispatch(pageSeoul(postList));
        } else {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
            const postList = res.data.posts.contents[i];
            // console.log([postList]);
            dispatch(addSeoul(postList));
          }
        }
      })
      .catch((err) => {
        // console.log("나한테 온 모든 쪽지 GET 에러", err);
      });
  };
};

const pageBanpoMD = (pageNum) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `https://www.togather1.com/posts/test/banpoPark?pageNum=${pageNum}`,
      data: {},
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        if (pageNum == 1) {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
          }
          const postList = res.data.posts.contents;
          // console.log([postList]);
          dispatch(pageBanpo(postList));
        } else {
          for (let i = 0; i < res.data.posts.contents.length; i++) {
            const fullDate =
              res.data.posts.contents[i].meetingDate.split("T")[0];
            const yearTens = fullDate.split("-")[0].charAt(2);
            const yearOnes = fullDate.split("-")[0].charAt(3);
            const year = yearTens + yearOnes;
            const month = fullDate.split("-")[1];
            const day = fullDate.split("-")[2];
            const fullTime =
              res.data.posts.contents[i].meetingDate.split("T")[1];
            const hour = fullTime.split(":")[0];
            const minute = fullTime.split(":")[1];
            res.data.posts.contents[i].meetingDate =
              year + "." + month + "." + day + ". " + hour + ":" + minute;
            const postList = res.data.posts.contents[i];
            // console.log([postList]);
            dispatch(addBanpo(postList));
          }
        }
        // console.log("나한테 온 모든 쪽지 GET 성공", res.data.message);
      })
      .catch((err) => {
        // console.log("나한테 온 모든 쪽지 GET 에러", err);
      });
  };
};

export default handleActions(
  {
    [PAGE_BANPO]: (state, action) =>
      produce(state, (draft) => {
        draft.page_banpo = action.payload.page_banpo;
      }),
    [PAGE_OLYMPIC]: (state, action) =>
      produce(state, (draft) => {
        draft.page_olympic = action.payload.page_olympic;
      }),
    [PAGE_SEOUL]: (state, action) =>
      produce(state, (draft) => {
        draft.page_seoul = action.payload.page_seoul;
      }),
    [PAGE_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.page_all = action.payload.page_all;
      }),
    [ADD_ALL]: (state, action) =>
      produce(state, (draft) => {
        draft.page_all.push(action.payload.page_all);
      }),
    [ADD_BANPO]: (state, action) =>
      produce(state, (draft) => {
        draft.page_banpo.push(action.payload.page_banpo);
      }),
    [ADD_OLYMPIC]: (state, action) =>
      produce(state, (draft) => {
        draft.page_olympic.push(action.payload.page_olympic);
      }),
    [ADD_SEOUL]: (state, action) =>
      produce(state, (draft) => {
        draft.page_seoul.push(action.payload.page_seoul);
      }),
  },
  initialState
);

export const actionCreators = {
  pageBanpoMD,
  pageSeoulMD,
  pageOlympicMD,
  pageAllMD,
};
