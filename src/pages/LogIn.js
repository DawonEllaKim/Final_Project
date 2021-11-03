import React, { useState } from "react";
import styled from "styled-components";
import { MdAlternateEmail } from 'react-icons/md'
import { AiOutlineLock } from 'react-icons/ai'
import kakaoPicture from '../image/kakao_login_medium_wide.png'
import axios from "axios";
import { history } from "../redux/configureStore";
import { useDispatch } from 'react-redux';
import  { actionCreators as userActions } from '../redux/modules/sign'

const { Kakao } = window;


const LogIn = (props) => {
   const dispatch = useDispatch();
  const [user_email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const userEmailChangeHandler = (e) => {
    console.log(e.target.value);
    setUserEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const onClickLogin = () =>{
    if((user_email === '') | (password === '')){
      window.alert('이메일 또는 비밀번호를 입력해주세요')
      return;
    }
    dispatch(userActions.logInMD(user_email, password));
  }
  
  const loginWithKakao = () =>{
    const scope = "profile_nickname,profile_image";
    Kakao.Auth.login({
      scope,
      // success는 인증 정보를 응답(response)으로 받는다. 
      success: function (response) {
       //카카오 SDK에 사용자 토큰을 설정한다.
        window.Kakao.Auth.setAccessToken(response.access_token);
        console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
        
        var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();
        localStorage.setItem("token",ACCESS_TOKEN);
        
        window.Kakao.API.request({
        url: "/v2/user/me",
        success: function ({ kakao_account }) {
          //어떤 정보 넘어오는지 확인
          console.log(kakao_account);
          const {  profile } = kakao_account;
          localStorage.setItem("nickname",profile.nickname)
        
          console.log(`responsed img: ${profile.profile_image_url}`);
          console.log(profile.nickname);
          history.push("/")
  
          // axios({
          //   method: "post",
          //   url: "/auth/sns",
          //   data: {
          //     "id": email,
          //     "nickname": profile.nickname,
          //     "image" :profile.profile_image_url,
          //   },
          // })
          //   .then((res) => {
          //     console.log(res);
          //     // history.push("/main/feed");
          //   })
          //   .catch((error) => {
          //     // console.log(error);
          //     console.error(error);
          //     alert("카카오 로그인 에러");
          //   });
  
        },
        fail: function (error) {
          console.log(error);
        },
      });
  
  
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }
  


  return (
    <>
      <Wrap>
        <Logo></Logo>
        <InputBox>
          <MdAlternateEmail style={{width: '20px', height: '20px', marginTop: '8px'}}/>
          <InputText 
            placeholder='이메일을 입력하세요' 
            onChange = {userEmailChangeHandler}
            />
        </InputBox>
        <InputBox>
          <AiOutlineLock style={{width: '20px', height: '20px', marginTop: '8px'}}/>
          <InputText 
            placeholder='비밀번호를 입력하세요' 
            onChange = {passwordChangeHandler}
            />
        </InputBox>

        <LoginBtn 
          onClick = {onClickLogin}
        >로그인</LoginBtn>
        <SignupBtn 
          onClick={()=>history.push("/signup")}
        >회원가입 하러가기</SignupBtn>
       <div onClick={loginWithKakao}>
        <KakaoLogin src={kakaoPicture} />
        </div>

      </Wrap>
    </>
  )
};

const Wrap = styled.div`
  text-align:center;
  max-width: 390px;
  font-size: 14px;
  padding: 55px;
  margin: 0 auto;
`
const Logo = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid blue;
  box-sizing: border-box;
  margin: 50px auto;
`
const InputBox = styled.div`
  display: flex;
  justify-content: left;
  width: 280px;
  background-color: #ebebeb;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 16px;
`;

const InputText = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  margin-left: 16px;
  &:focus {
    outline: none;
  } 
`
const LoginBtn = styled.button`
  display: block;
  width: 100%;
  border: none;
  background-color: #c4c4c4;
  border-radius: 24px;
  padding: 12px;
  margin: 32px 0;
  cursor: pointer;
`
const SignupBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`
const KakaoLogin = styled.img`
  width: 100%;
  margin: 36px 0;
  cursor: pointer;
`

export default LogIn;
