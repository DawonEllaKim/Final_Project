// dogsta.js - 개스타그램 게시물 GET,POST,PATCH,DELETE 액션들
import axios from "axios";
import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { getCookie } from "../../shared/Cookie";
import { actionCreators as modalActions } from "./modal";

const GET_MAIN_POST = "GET_MAIN_POST"; // 메인 페이지 개스타그램 (최신순) 게시물 불러오기
const GET_ALL_POST = "GET_ALL_POST"; // 개스타그램 모든(최신순) 게시물 불러오기
// const GET_LIKE_POST = "GET_LIKE_POST"; // 개스타그램 좋아요순 게시물 불러오기
const GET_FIRST_RECENT = "GET_FIRST_RECENT"; // 개스타그램 최신순
const GET_MORE_RECENT = "GET_MORE_RECENT"; // 무한 스크롤 최신순
const GET_FIRST_LIKE = "GET_FIRST_LIKE"; // 개스타그램 좋아요순
const GET_MORE_LIKE = "GET_MORE_LIKE"; // 무한 스크롤 좋아요순
const GET_DOGPOST = "GET_DOGPOST"; // 개스타그램 게시물 하나 불러오기
const GET_MY_POST = "GET_MY_POST"; // 개스타그램 나의 게시물 불러오기
const ADD_POST = "ADD_POST"; // 개스타그램 게시물 작성
const EDIT_POST = "EDIT_POST"; // 개스타그램 게시물 수정
const DELETE_POST = "DELETE_POST"; // 개스타그램 게시물 삭제
const TOGGLE_LIKE = "TOGGLE_LIKE"; // 좋아요 토글
const GET_LIKES = "GET_LIKES"; // 해당 게시물 좋아요 불러오기
const GET_MY_LIKE = "GET_MY_LIKE"; // 내가 좋아요 눌렀는지 여부
const GET_MODAL = "GET_MODAL";

const getMainPost = createAction(GET_MAIN_POST, (mainFourPosts) => ({
  mainFourPosts,
}));
const getAllPost = createAction(GET_ALL_POST, (allList) => ({ allList }));
// const getLikePost = createAction(GET_LIKE_POST, (mainLikeList) => ({
//   mainLikeList,
// }));
const getFirstRecent = createAction(GET_FIRST_RECENT,(mainList) => ({mainList}));
const getMoreRecent = createAction(GET_MORE_RECENT,(mainList) => ({mainList}));
const getFirstLike = createAction(GET_FIRST_LIKE,(mainLikeList) => ({mainLikeList}));
const getMoreLike = createAction(GET_MORE_LIKE,(mainLikeList) => ({mainLikeList}));
const getDogPost = createAction(GET_DOGPOST, (eachList) => ({ eachList }));
const getMyPost = createAction(GET_MY_POST, (myList) => ({ myList }));
const addPost = createAction(ADD_POST, (mainList) => ({ mainList }));
const editPost = createAction(EDIT_POST, (eachList) => ({ eachList }));
const deletePost = createAction(DELETE_POST, (mainList) => ({ mainList }));

// 좋아요
const toggleLike = createAction(TOGGLE_LIKE, (liked) => ({ liked }));
const getLikes = createAction(GET_LIKES, (likeCnt) => ({ likeCnt }));
const getMyLike = createAction(GET_MY_LIKE, (likeExist) => ({ likeExist }));

//모달
const getModal = createAction(GET_MODAL, (modal) => ({ modal }));

const initialState = {
  mainFourPosts: [],
  allList:[],
  mainList: [],
  mainLikeList: [],
  myList: [],
  eachList: [],
  likeCnt: [],
  likeExist: false,
  likeList: [],
  modal: false,
};

const getMainPostMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: "http://52.78.6.138/dogsta/mainFilter",
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts;
        dispatch(getMainPost(postList));
        // console.log("개스타그램 모든 게시물 GET 성공", postList);
      })
      .catch((err) => {
        // console.log("개스타그램 모든 게시물 GET 에러", err);
      });
  };
};

const getAllPostMD = () => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url:"http://52.78.6.138/dogsta/recentFilter",
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts;
        dispatch(getAllPost(postList));
        // console.log("개스타그램 모든 게시물 GET 성공", postList);
      })
      .catch((err) => {
        // console.log("개스타그램 모든 게시물 GET 에러", err);
      });
  };
};

// const getLikePostMD = () => {
//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "GET",
//       url: "http://52.78.6.138/dogsta/likeFilter",
//       data: {},
//       headers: {},
//     })
//       .then((res) => {
//         const postList = res.data.posts;
//         dispatch(getLikePost(postList));
//         console.log("개스타그램 좋아요순 게시물 GET 성공", postList);
//       })
//       .catch((err) => {
//         // console.log("개스타그램 좋아요순 게시물 GET 에러", err);
//       });
//   };
// };

// 개스타그램 무한 스크롤 적용
const getFirstRecentMD = (pageNum) =>{
  return function(dispatch, useState, {history}){
    axios({
      method: "GET",
      url: `http://52.78.6.138/dogsta/test/recentFilter?pageNum=${pageNum}`,
      data: {},
      headers: {},
    })
    .then((res) => {
      if(pageNum ==1){
        const postList = res.data.posts.contents;
        // console.log('first get 성공', postList);
        dispatch(getFirstRecent(postList));        
      } else{
        let postList=[];
        for(let i=0;i<res.data.posts.contents.length; i++){
          postList.push(res.data.posts.contents[i]);
          // console.log('무한스크롤 성공', postList);
        }
        dispatch(getMoreRecent(postList));
      }
    })
    .catch((err) =>{
      // console.log('first get 에러', err);
    })
  }
}

const getFirstLikeMD = (pageNum) =>{
  return function(dispatch, useState, {history}){
    axios({
      method: "GET",
      url: `http://52.78.6.138/dogsta/test/likeFilter?pageNum=${pageNum}`,
      data: {},
      headers: {},
    })
    .then((res) => {
      if(pageNum ==1){
        const postList = res.data.posts.contents;
        // console.log('first get 성공', postList);
        dispatch(getFirstLike(postList));        
      } else{
        let postList=[];
        for(let i=0;i<res.data.posts.contents.length; i++){
          postList.push(res.data.posts.contents[i]);
          // console.log('무한스크롤 성공', postList);
        }
        dispatch(getMoreLike(postList));
      }
    })
    .catch((err) =>{
      // console.log('first get 에러', err);
    })
  }
}

const getPostMD = (userId, dogPostId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: `http://52.78.6.138/dogsta/${userId}/${dogPostId}`,
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts[0];
        dispatch(getDogPost(postList));
        // console.log("개스타그램 게시물 하나 GET 성공", res);
      })
      .catch((err) => {
        // console.log("개스타그램 게시물 하나 GET 오류", err);
      });
  };
};

const getMyPostMD = (userId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "GET",
      url: `http://52.78.6.138/dogsta/${userId}`,
      data: {},
      headers: {},
    })
      .then((res) => {
        const postList = res.data.posts;
        dispatch(getMyPost(postList));
        // console.log("개스타그램 나의 게시물 GET 성공", res);
      })
      .catch((err) => {
        // console.log("개스타그램 나의 게시물 GET 오류", err);
      });
  };
};

const addPostMD = (formData) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://52.78.6.138/dogsta/write",
      data: formData,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        "Content-Type": "multipart/form-data; ",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(getFirstRecentMD());
        dispatch(modalActions.setModal("개스타 등록완료!"));
        history.push("/dogstarmainmodal");
      })
      .catch((err) => {
        // console.log("개스타그램 게시물 POST 에러", err);
      });
  };
};

const editPostMD = (postId, post) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "PATCH",
      url: `http://52.78.6.138/dogsta/${postId}`,
      data: post,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(editPost(post));
        dispatch(getModal(true));

        // console.log("개스타그램 게시물 PATCH 완료", res);
      })
      .catch((err) => {
        // console.log("개스타그램 게시물 PATCH 오류", err);
      });
  };
};

const editPostImageMD = (post, dogPostId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "PATCH",
      url: `http://52.78.6.138/dogsta/changeImage/${dogPostId}`,
      data: post,
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((res) => {
        dispatch(editPost(post));
        dispatch(modalActions.setModal("이미지 수정완료"));
        history.push("/successModal");

        // console.log("개스타그램 게시물 PATCH 완료", res);
      })
      .catch((err) => {
        // console.log("개스타그램 게시물 PATCH 오류", err);
        history.goBack();
      });
  };
};

const deletePostMD = (postId) => {
  return function (dispatch, useState, { history }) {
    axios({
      method: "DELETE",
      url: `http://52.78.6.138/dogsta/${postId}`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        // dispatch(deletePost(postId));
        dispatch(modalActions.setModal("게시글 삭제완료!"));
        history.push("/dogstarmainmodal");

        // console.log("개스타그램 게시물 DELETE 성공", res);
      })
      .catch((err) => {
        // console.log("개스타그램 게시물 DELETE 오류", err);
      });
  };
};

const toggleLikeMD = (dogPostId, liked) => {
  return (dispatch, getState, { history }) => {
    // console.log(liked);
    if (!liked) {
      axios({
        method: "POST",
        url: `http://52.78.6.138/likes/${dogPostId}`,
        data: {},
        headers: {
          // "content-type": "application/json;charset=UTF-8",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((res) => {
          const likeStatus = res.data.existLike;
          dispatch(toggleLike(likeStatus));
          // console.log("좋아요 반영 성공", res.data);
        })
        .catch((err) => {
          // console.log("좋아요 반영 오류", err);
        });
    } else {
      axios({
        method: "DELETE",
        url: `http://52.78.6.138/likes/${dogPostId}`,
        data: {},
        headers: {
          // "content-type": "application/json;charset=UTF-8",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((res) => {
          const likeStatus = res.data.existLike;
          dispatch(toggleLike(likeStatus));
          // console.log("좋아요 반영 성공", res.data);
        })
        .catch((err) => {
          // console.log("좋아요 반영 오류", err);
        });
    }
  };
};

const getLikesMD = (dogPostId) => {
  // console.log(dogPostId);
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://52.78.6.138/likes/${dogPostId}`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(getLikes(res.data.likeNum.count));
        // console.log("좋아요 카운트 get", res.data.likeNum.count);
      })
      .catch((err) => {
        // console.log("좋아요 카운트 get 에러", err);
      });
  };
};

const getMyLikeMD = (dogPostId) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "GET",
      url: `http://52.78.6.138/likes/${dogPostId}/likeExist`,
      data: {},
      headers: {
        // "content-type": "application/json;charset=UTF-8",
        // accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => {
        dispatch(getMyLike(res.data));
        // console.log("좋아요 get", res.data);
      })
      .catch((err) => {
        // console.log("좋아요 get 에러", err);
      });
  };
};

const modalMD = () => {
  return function (dispatch, getState, { history }) {
    dispatch(getModal(false));
    history.goBack();
  };
};

export default handleActions(
  {
    [GET_MAIN_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainFourPosts = action.payload.mainFourPosts;
      }),
    [GET_ALL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.allList = action.payload.allList;
      }),
    // [GET_LIKE_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.mainLikeList = action.payload.mainLikeList;
    //   }),
    [GET_FIRST_RECENT]: (state, action) =>
      produce(state,(draft) =>{
        draft.mainList = action.payload.mainList;
      }),
    [GET_MORE_RECENT]: (state, action) =>
      produce(state,(draft) =>{
        draft.mainList.push(...action.payload.mainList);
      }),
    [GET_FIRST_LIKE]: (state, action) =>
      produce(state,(draft) =>{
        draft.mainLikeList = action.payload.mainLikeList;
      }),
    [GET_MORE_LIKE]: (state, action) =>
      produce(state,(draft) =>{
        draft.mainLikeList.push(...action.payload.mainLikeList);
      }),
    [GET_DOGPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = action.payload.eachList;
      }),
    [GET_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.myList = action.payload.myList;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainList.push(action.payload.mainList);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.eachList = { ...draft.eachList, ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.mainList = draft.mainList.filter(
          (post) => post.id !== action.payload.mainList
        );
      }),
    [TOGGLE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action);
        draft.liked = action.payload.liked;
      }),
    [GET_LIKES]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action);
        draft.likeCnt = action.payload.likeCnt;
      }),
    [GET_MY_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.likeExist = action.payload.likeExist;
      }),
    [GET_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modal = action.payload.modal;
      }),
  },
  initialState
);

const actionCreators = {
  getMainPost,
  getMainPostMD,
  getAllPost,
  // getLikePost,
  getFirstRecent,
  getMoreRecent,
  getMoreLike,
  getDogPost,
  getMyPost,
  addPost,
  editPost,
  deletePost,
  toggleLike,
  getLikes,
  getMyLike,
  modalMD,
  getAllPostMD,
  // getLikePostMD,
  getFirstRecentMD,
  getFirstLikeMD,
  getPostMD,
  getMyPostMD,
  addPostMD,
  editPostMD,
  editPostImageMD,
  deletePostMD,
  toggleLikeMD,
  getLikesMD,
  getMyLikeMD,
  getModal,
};

export { actionCreators };
