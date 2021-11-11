import React from "react";

const isLogin = () => !!localStorage.getItem("userId");

export default isLogin;
