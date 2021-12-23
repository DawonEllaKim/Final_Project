// PrivateRoute.js - 로그인 되어 있지 않은 사용자는 사용할 수 없는 페이지 구별하는 컴포넌트
import React from "react";
import { Route } from "react-router-dom";
import isLogin from "./isLogin";
import Redirect from "../components/Redirect";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isLogin() ? <Component {...props} /> : <Redirect />
        }
      />
    </div>
  );
};

export default PrivateRoute;
