import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { history } from "../redux/configureStore";
import isLogin from "./isLogin";
import Redirect from "../components/Redirect";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isLogin() ? (
            <Component {...props} />
          ) : (
            // <Redirect to="/login" />
            <Redirect />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;
