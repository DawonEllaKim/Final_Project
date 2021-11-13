import React, { useState } from "react";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import kakaoPicture from "../image/kakao_login_medium_wide.png";
import axios from "axios";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/sign";

import logo from "../image/logo.png";
// 상단바
import TopBar from "../components/TopBar";

import { KAKAO_AUTH_URL } from "../components/OAuth";
// const { Kakao } = window;

const LogIn = (props) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const userEmailChangeHandler = (e) => {
    // console.log(e.target.value);
    setUserEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    if ((userEmail === "") | (password === "")) {
      window.alert("이메일 또는 비밀번호를 입력해주세요");
      return;
    }
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

  return (
    <>
      <Wrap>
        <TopBar only_left></TopBar>
        <Logo src={logo} />
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

        <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
        <SignupBtn onClick={() => history.push("/signup")}>
          회원가입 하러가기
        </SignupBtn>
        <a
          href={KAKAO_AUTH_URL}
          //  onClick={loginWithKakao}
        >
          <KakaoLogin src={kakaoPicture} />
        </a>
      </Wrap>
    </>
  );
};

const Head = styled.div`
  position: fixed;
  top: 70px;
  left: 70px;
  width: 390px;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Wrap = styled.div`
  text-align: center;
  max-width: 390px;
  font-size: 14px;
  padding-bottom: 55px;
  margin: 0 auto;
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
  width: 280x;
  height: 60px;
  padding: 10px 20px;
  margin-bottom: 16px;
  border: 2px solid #000;
  border-radius: 14px;
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
  width: 100%;
  padding: 12px;
  margin: 24px auto 34px auto;
  background-color: #ff5656;
  border: 2px solid #000;
  border-radius: 24px;
  font-size: 16px;
  box-shadow: 0 4px 0px #000;
  cursor: pointer;
`;
const SignupBtn = styled.button`
  margin-bottom: 38px;
  font-size: 14px;

  border: none;
  background-color: transparent;
  cursor: pointer;
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
