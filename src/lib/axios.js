import axios from "axios";

const instance = axios.create({
  // 제이슨 서버
  baseURL: "http://localhost:4000",

  // 백앤드 서버
  // baseURL: "http://52.78.120.187",

  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    // authorization:
  },
});

export const apis = {
  // 산책 메인 + 상세 데이터 산책정보 불러오기
  getPostAX: () => instance.get("/posts"),
  //유저+강아지 정보 불러오기
  getUserAX: () => instance.get("/users"),
  postLoginAX: (username, password) =>
    instance.get("/users/login", username, password),
  // 마이 프로필에서 강아지, 보호자 정보 업데이트
  updateUserAX: (user, user_Id) => instance.put("/users", user, user_Id),
  // 산책 등록하기
  createPostAX: (post) => instance.post("/posts", post),
  // 산책 약속 수정하기
  updatePostAX: (postId, post) => instance.put(`posts/${postId}`, post),
  // 수정 전 데이터 가져오기
  getUpdatePostAX: (postId) => instance.get(`posts/${postId}`),
  // 산책 약속 삭제하기
  deletePostAX: (postId) => instance.delete(`/posts/${postId}`),
};
