import axios from "axios";
import { getCookie } from "../shared/Cookie";

const instance = axios.create({
  // 제이슨 서버
  // baseURL: "http://localhost:4000",

  // 백앤드 서버
  baseURL: "https://www.walkadog.shop",

  // 선희님 서버
  // baseURL: "http://52.78.120.187",

  headers: {
    // "content-type": "application/json;charset=UTF-8",
  
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    authorization: `Bearer ${getCookie("token")}`,
  },
});

export const apis = {
  // 메인페이지 GET 요청
  getMainAX: () => instance.get("/posts"),

  //유저+강아지 정보 불러오기
  getUserAX: () => instance.get("/dog"),
  postLoginAX: (user_email, password) =>
    instance.post("/users/login", { user_email, password }),

  // 마이 프로필에서 강아지, 보호자 정보 업데이트
  updateUserAX: (user) => instance.put("/users", user),

  // 산책 등록하기
  createPostAX: (post) => instance.post("/posts/write", post),
  // 산책 수정하기
  updatePostAX: (postId, post) => instance.patch(`/posts/${postId}`, post),
  // 산책 가져오기
  getPostAX: (postId) => instance.get(`/posts/${postId}`),
  // 산책 약속 삭제하기
  deletePostAX: (postId) => instance.delete(`/posts/${postId}`),
};
