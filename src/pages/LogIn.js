import React from "react";
import styled from "styled-components";
import { MdAlternateEmail } from 'react-icons/md'
import { AiOutlineLock } from 'react-icons/ai'
import kakao from '../image/kakao_login_medium_wide.png'

import { history } from "../redux/configureStore";

const LogIn = () => {
  // const history = useHistory();
  // return (
  //   <>
  //     <InputBox>
  //       <div>
  //         <label>아이디</label>
  //         <input />
  //       </div>
  //       <div>
  //         <label>비밀번호</label>
  //         <input />
  //       </div>
  //       <button>로그인하기</button>
  //       <button onClick={()=>history.push("/signup")}>회원가입</button>
  //     </InputBox>
  //   </>
  // );

  return (
    <>
      <Wrap>
        <Logo></Logo>
        <InputBox>
          <MdAlternateEmail style={{width: '20px', height: '20px', marginTop: '8px'}}/>
          <InputText placeholder='이메일을 입력하세요' />
        </InputBox>
        <InputBox>
          <AiOutlineLock style={{width: '20px', height: '20px', marginTop: '8px'}}/>
          <InputText placeholder='비밀번호를 입력하세요' />
        </InputBox>
        <LoginBtn>로그인</LoginBtn>
        <SignupBtn onClick={()=>history.push("/signup")}>회원가입 하러가기</SignupBtn>
        <KakaoLogin src={kakao} />
      </Wrap>
    </>
  )
};

const Wrap = styled.div`
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
