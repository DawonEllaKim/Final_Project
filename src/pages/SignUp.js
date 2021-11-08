import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/sign";
import { emailCheck, passwordCheck } from "../shared/check";

const SignUp = () => {
  const dispatch = useDispatch();
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [user_email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [user_nickname, setUserNickname] = useState("");
  const [user_gender, setUserGender] = useState("");
  const [user_age, setUserAge] = useState("");

  const handleChangeFile = (event) => {
    event.preventDefault();
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
  };

  const userEmailChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserEmail(newTitle);
  };
  const passwordChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setPassword(newTitle);
  };
  const confirmPasswordChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setConfirmPassword(newTitle);
  };

  const userNicknameChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserNickname(newTitle);
  };
  const userGenderChangeHandler = (name) => {
    console.log(name);
    setUserGender(name);
  };
  const userAgeChangeHandler = (name) => {
    console.log(name);
    setUserAge(name);
  };

  const submitUserInfo = () => {
    if (!emailCheck(user_email)) {
      toast.error("잘못된 이메일 형식입니다.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        hideProgressBar: false,
        draggable: true,
        closeOnClick: true,
      });
      return;
    }

    if (!passwordCheck(password)) {
      window.alert(
        "잘못된 비밀번호 형식입니다. \n8자 이상 영대/소문자, 숫자로 입력해주세요"
      );
      return;
    }

    if (password !== confirm_password) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (
      user_email === "" ||
      password === "" ||
      confirm_password === "" ||
      user_nickname === "" ||
      user_gender === "" ||
      user_age === ""
    ) {
      window.alert("입력하지 않은 값이 있습니다.");
      return;
    }

    // let UserInfo = {
    //   user_email,
    //   password,
    //   confirm_password,
    //   user_nickname,
    //   user_gender,
    //   user_age,
    //   // user_image: imgFile,
    // };

    const formData = new FormData();
    formData.append("user_email", user_email);
    formData.append("password", password);
    formData.append("confirm_password", confirm_password);
    formData.append("user_nickname", user_nickname);
    formData.append("user_gender", user_gender);
    formData.append("user_age", user_age);
    formData.append("user_image", imgFile);

    toast.success(
      "회원 정보 등록이 완료되었습니다. \n강아지 정보를 입력해주세요",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
      }
    );
    dispatch(UserActions.signUserAPI(formData));
  };

  return (
    <>
      <Wrap>
        <TopWrap>
          <MdArrowBackIosNew
            style={{
              width: "20px",
              height: "20px",
              position: "absolute",
              bottom: "10px",
              left: "0",
              cursor: "pointer",
            }}
            onClick={() => {
              history.goBack();
            }}
          />
          <TopTitle>회원가입</TopTitle>
        </TopWrap>
        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <AddWrap>
            <AddImage
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
            ></AddImage>
          </AddWrap>
        </ImageWrap>
        <UserWrap>
          <IdWrap>
            <UserId
              placeholder="이메일 입력 "
              onChange={userEmailChangeHandler}
            ></UserId>
          </IdWrap>
          <IdCheck onClick={() => dispatch(UserActions.signDupAPI(user_email))}>
            중복확인
          </IdCheck>
        </UserWrap>
        <Filter>
          <Password
            placeholder="패스워드 입력 (8자이상 영대/소문자+숫자)"
            onChange={passwordChangeHandler}
          ></Password>
        </Filter>
        <Filter>
          <PasswordCheck
            placeholder="패스워드 확인"
            onChange={confirmPasswordChangeHandler}
          ></PasswordCheck>
        </Filter>
        <Filter>
          <Nickname
            placeholder="닉네임 입력"
            onChange={userNicknameChangeHandler}
          ></Nickname>
        </Filter>
        <Filter>
          <Title>성별</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <UserGender
                  type="radio"
                  id="b"
                  value="남"
                  checked={user_gender === "남"}
                  onClick={() => userGenderChangeHandler("남")}
                />
              </RadioWrap>
              <Label htmlFor="b">남</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <UserGender
                  type="radio"
                  id="g"
                  value="여"
                  checked={user_gender === "여"}
                  onClick={() => userGenderChangeHandler("여")}
                />
              </RadioWrap>
              <Label htmlFor="g">여</Label>
            </Flex>
          </FlexWrap>
        </Filter>

        <Filter>
          <Title>나이대</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <UserAge
                  type="radio"
                  id="10"
                  checked={user_age === "10대"}
                  onClick={() => userAgeChangeHandler("10대")}
                />
              </RadioWrap>

              <Label htmlFor="10">10대</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <UserAge
                  type="radio"
                  id="20"
                  checked={user_age === "20대"}
                  onClick={() => userAgeChangeHandler("20대")}
                />
              </RadioWrap>

              <Label htmlFor="20">20대</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <UserAge
                  type="radio"
                  id="30"
                  checked={user_age === "30대"}
                  onClick={() => userAgeChangeHandler("30대")}
                />
              </RadioWrap>

              <Label htmlFor="30">30대</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <UserAge
                  type="radio"
                  id="40"
                  checked={user_age === "40대 이상"}
                  onClick={() => userAgeChangeHandler("40대 이상")}
                />
              </RadioWrap>

              <Label htmlFor="40">40대 이상</Label>
            </Flex>
          </FlexWrap>
        </Filter>

        <ButtonWrap>
          <Add onClick={submitUserInfo}>반려견 등록하기</Add>
          <Cancle
            onClick={() => {
              history.goBack();
            }}
          >
            취소하기
          </Cancle>
        </ButtonWrap>
      </Wrap>
    </>
  );
};

export default SignUp;

const Wrap = styled.div`
  text-align: center;
  max-width: 390px;
  padding: 0 20px;
  margin: 30px auto;
  font-size: 14px;
`;

const TopWrap = styled.div`
  position: relative;
  padding: 10px;
`;
const TopTitle = styled.div`
  font-size: 16px;
`;

const ImageWrap = styled.div`
  margin: 20px 0;
`;
const Preview = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0 auto;
`;
const AddWrap = styled.div``;
const AddImage = styled.input`
  width: 180px;
  margin: 10px 0;
`;

const UserWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const IdWrap = styled.div`
  width: 240px;
  background-color: #ebebeb;
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 20px;
  text-align: left;
`;
const UserId = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const IdCheck = styled.button`
  width: 80px;
  height: 59px;
  border: none;
  background-color: #c4c4c4;
  border-radius: 10px;
  cursor: pointer;
`;

const Filter = styled.div`
  background-color: #ebebeb;
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 20px;
  text-align: left;
`;
const Title = styled.div`
  margin-bottom: 15px;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const RadioWrap = styled.div``;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Label = styled.label`
  padding-top: 5px;
`;

const Password = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const PasswordCheck = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;

const Nickname = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;

const UserGender = styled.input``;
const UserAge = styled.input``;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Add = styled.button`
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: #c4c4c4;
  cursor: pointer;
`;
const Cancle = styled.button`
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: #c4c4c4;
  cursor: pointer;
`;
