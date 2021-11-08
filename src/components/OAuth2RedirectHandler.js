import React from "react";
import { useDispatch } from "react-redux";
import Spinner from "../shared/Spinner";
import { actionCreators as kakaoActions } from "../redux/modules/kakao";

const OAuth2RedirectHandler = (props) => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(async () => {
    // console.log(code);
    await dispatch(kakaoActions.kakaoLogin(code));
  }, []);

  return <Spinner />;
};

export default OAuth2RedirectHandler;
