import React, { useEffect } from "react";
import Main from "./Main";
import SignDog from "./SignDog";

// 리덕스
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as SignActions } from "../redux/modules/sign";

// 스피너
import Spinner from "../shared/Spinner";

const CheckMain = () => {
  const dispatch = useDispatch();
  // let dog= localStorage.getItem("dog")

  const is_loading = useSelector((state) => state.sign.is_loading);

  useEffect(() => {
    dispatch(SignActions.checkDogAPI());
  }, []);

  const dog = useSelector((state) => state.sign.check_dog);
  console.log("dog", dog);

  if (is_loading) {
    return <Spinner />;
  }
  return <div>{dog ? <Main></Main> : <SignDog></SignDog>}</div>;
};

export default CheckMain;
