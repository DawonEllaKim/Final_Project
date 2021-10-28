import axios from "axios";

const instance = axios.create({
  // 제이슨 서버
  baseURL: "http://localhost:4000/",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    // authorization:
  },
});

export const apis = {
  // 산책 상세 데이터 불러오기
  getPostAX: () => instance.get("/posts"),
  getUserAX: () => instance.get("/users"),
  // 산책 등록하기
  createPostAX: (post) => instance.post("/posts", post),
  // 산책 약속 삭제하기
  deletePostAX: (postId) => instance.delete(`/posts/${postId}`),
};
