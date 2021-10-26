import React from "react";
import styled from "styled-components";

const SignUp = () => {
  return (
    <>
      <InputBox>
        <div>
          <label>아이디</label>
          <input />
        </div>
        <div>
          <label>닉네임</label>
          <input />
        </div>
        <div>
          <label>비밀번호</label>
          <input />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input />
        </div>
        <button>회원가입하기</button>
      </InputBox>
    </>
  );
};

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  margin: auto;
`;

export default SignUp;
