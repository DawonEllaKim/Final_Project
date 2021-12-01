// LogIn.js - 로그인 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";

// 컴포넌츠
import LoginSuccessModal from "../components/Modal/LoginSuccessModal";
import Spinner from "../shared/Spinner";

// 리덕스
import { actionCreators as userActions } from "../redux/modules/sign";

// 아이콘 + 이미지
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import logo from "../image/logo.png";
import { MdArrowBackIos } from "react-icons/md";

const LogIn = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  const is_loading = useSelector((state) => state.sign.is_loading);
  const getModal = useSelector((state) => state.sign.modal);
  const message = useSelector((state) => state.sign.alert);

  const userEmailChangeHandler = (e) => {
    setUserEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const Login = () => {
    // if ((userEmail === "") | (password === "")) {
    //   setAlert("✔︎ 이메일 또는 비밀번호를 입력해주세요");
    //   return;
    // }
    // setLoading(false);
    // dispatch(userActions.logInMD(userEmail, password));
    if (userEmail === "") {
      setAlert("✔︎ 이메일을 입력해 주세요.");
      return;
    } else if (password === "") {
      setAlert("✔︎ 비밀번호를 입력해 주세요.");
      return;
    }
    setLoading(false);
    dispatch(userActions.logInMD(userEmail, password));
  };

  useEffect(() => {
    setLoading(is_loading);
    setLoading(true);
    setAlert(message);
    setModal(getModal);
  }, [message, is_loading]);

  if (!loading) {
    return <Spinner />;
  }

  return (
    <>
      {modal ? <LoginSuccessModal setModal={setModal} /> : ""}

      <Wrap>
        {/* 뒤로가기 버튼 */}
        <TopWrap>
          <TopBarWrap>
            <TopBarButtons>
              <TopBarBtnLeft
                onClick={() => {
                  history.push("/");
                }}
              >
                <MdArrowBackIos
                  style={{
                    width: "25px",
                    height: "25px",
                    color: "#000",
                  }}
                />
              </TopBarBtnLeft>
            </TopBarButtons>
          </TopBarWrap>
        </TopWrap>

        {/* 로고 */}
        <LogoWrap>
          <Logo src={logo} />
        </LogoWrap>

        {/* 이메일 */}
        <InputBox>
          <MdAlternateEmail
            style={{ width: "20px", height: "20px", marginTop: "8px" }}
          />
          <InputText
            placeholder="이메일을 입력하세요"
            onChange={userEmailChangeHandler}
          />
        </InputBox>

        {/* 비밀번호 */}
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

        {/* 로그인 버튼 */}
        <LoginBtn onClick={Login}>로그인</LoginBtn>

        {/* 회원가입 버튼 */}
        <SignupBtn onClick={() => history.push("/signup")}>
          아직 회원이 아니신가요? <span>회원가입</span>
        </SignupBtn>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  text-align: center;
  font-size: 14px;
  padding: 0 5% 55px 5%;
  height: 100%;
`;
const TopWrap = styled.div`
  margin: 0 5%;

  text-align: center;
  height: 70px;
`;
const TopBarWrap = styled.div`
  margin-bottom: 26px;
  background-color: #fff;
  padding-top: 14px;
`;
const TopBarButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;
const TopBarBtnLeft = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  background-color: transparent;
  width: 52px;
  height: 52px;
  cursor: pointer;
`;
const LogoWrap = styled.div`
  margin: 0 0 -30px 0;
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
const Alert = styled.div`
  color: #ff5252;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  margin-top: 8px;
  font-size: 12px;
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

export default LogIn;
