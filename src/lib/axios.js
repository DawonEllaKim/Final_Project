import axios from "axios";

const instance = axios.create({
  // 제이슨 서버
  baseURL: "http://localhost:4000",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    // authorization:
  },
});

export const apis = {
  // 산책 메인 + 상세 데이터 불러오기
  getPostAX: () => instance.get("/posts"),

  getUserAX: () => instance.get("/user"),

  // 마이 프로필에서 강아지, 보호자 정보 업데이트
  updateUserAX: (user) => instance.put("/user", user),
  // 산책 등록하기
  createPostAX: (post) => instance.post("/posts", post),
  // 산책 약속 삭제하기
  deletePostAX: (postId) => instance.delete(`/posts/${postId}`),
};
