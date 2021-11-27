import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// const { Kakao } = window;

// 컴포넌츠
import TopBar from "../components/TopBar";
import LoginSuccessModal from "../components/Modal/LoginSuccessModal";
import { KAKAO_AUTH_URL } from "../components/OAuth";
import Spinner from "../shared/Spinner";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/sign";

// 아이콘 + 이미지
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import kakaoPicture from "../image/kakao_login_medium_wide.png";
import logo from "../image/logo.png";

const LogIn = (props) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState("");
  const [alert, setAlert] = useState("");

  const userEmailChangeHandler = (e) => {
    // console.log(e.target.value);
    setUserEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };
  const [loading, setLoading] = useState(true);
  const is_loading = useSelector((state) => state.sign.is_loading);
  const getModal = useSelector((state) => state.sign.modal);
  const message = useSelector((state) => state.sign.alert);

  useEffect(() => {
    // dispatch(postActions.getAllMD());

    setLoading(is_loading);
    setLoading(true);
    setAlert(message);
    setModal(getModal);
  }, [message, is_loading]);
  const onClickLogin = () => {
    if ((userEmail === "") | (password === "")) {
      setAlert("이메일 또는 비밀번호를 입력해주세요");
      return;
    }
    setLoading(false);
    dispatch(userActions.logInMD(userEmail, password));
  };
  // const loginWithKakao = () => {
  //   const scope = "profile_nickname,profile_image";
  //   Kakao.Auth.login({
  //     scope,
  //     // success는 인증 정보를 응답(response)으로 받는다.
  //     success: function (response) {
  //       //카카오 SDK에 사용자 토큰을 설정한다.
  //       window.Kakao.Auth.setAccessToken(response.access_token);
  //       console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

  //       var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();
  //       localStorage.setItem("token", ACCESS_TOKEN);

  //       window.Kakao.API.request({
  //         url: "/v2/user/me",
  //         success: function ({ kakao_account }) {
  //           //어떤 정보 넘어오는지 확인
  //           console.log(kakao_account);

  //           const { profile } = kakao_account;
  //           localStorage.setItem("nickname", profile.nickname);

  //           console.log(`responsed img: ${profile.profile_image_url}`);
  //           console.log(profile.nickname);
  //           history.push("/");
  //         },
  //         fail: function (error) {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     fail: function (error) {
  //       console.log(error);
  //     },
  //   });
  // };

  if (!loading) {
    return <Spinner />;
  }
  return (
    <>
      {modal ? <LoginSuccessModal setModal={setModal} /> : ""}
      <Wrap>
        <TopBar only_left></TopBar>
        <div
          style={{
            margin: "-30px 0",
            cursor: "pointer",
          }}
          onClick={() => {
            history.push("/");
          }}
        >
          <Logo src={logo} />
        </div>
        <InputBox>
          <MdAlternateEmail
            style={{ width: "20px", height: "20px", marginTop: "8px" }}
          />
          <InputText
            placeholder="이메일을 입력하세요"
            onChange={userEmailChangeHandler}
          />
        </InputBox>
        <InputBox>
          <AiOutlineLock
            style={{ width: "20px", height: "20px", marginTop: "8px" }}
          />
          <InputText
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={passwordChangeHandler}
          />
        </InputBox>
        <Alert>{alert ? alert : message}</Alert>
        <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
        <SignupBtn onClick={() => history.push("/signup")}>
          함께 산책시켜요~! <span>회원가입하러가기</span>
        </SignupBtn>
        {/* <a
          href={KAKAO_AUTH_URL}
          //  onClick={loginWithKakao}
        >
          <KakaoLogin src={kakaoPicture} />
        </a> */}
      </Wrap>
    </>
  );
};

const Alert = styled.div`
  color: #ff5252;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  margin-top: 8px;
`;

const Wrap = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 0 5% 55px 5%;
  height: 100%;
`;
const Logo = styled.img`
  width: 132px;
  height: 196px;
  margin: 0 auto 46px auto;
`;
const InputBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 16px;
  border: 1px gray;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  width: 80%;
  &:hover {
    border: 2px solid lightBlue;
  }
`;

const InputText = styled.input`
  width: 100%;
  border: 0;
  padding: 10px 0;
  margin-left: 16px;

  &:focus {
    outline: none;
  }
`;
const LoginBtn = styled.button`
  box-sizing: border-box;
  width: 80%;
  display: flex;
  justify-content: center;
  padding: 12px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #ff5252;
  border: 1px gray;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  font-size: 16px;
  cursor: pointer;
`;
const SignupBtn = styled.button`
  margin-bottom: 38px;
  font-size: 14px;
  margin-top: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  span {
    color: #ff5656;
    padding-left: 4px;
  }
`;
const KakaoLogin = styled.img`
  width: 100%;
  margin: auto;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 12px;
  box-shadow: 0 4px 0px #000;
`;

export default LogIn;
