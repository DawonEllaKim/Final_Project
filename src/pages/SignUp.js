import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/sign";
import { emailCheck, passwordCheck } from "../shared/check";

import Button from "../elements/Button";
import backward from "../image/backward.png";

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
        {/* 뒤로가기 버튼 + 회원가입 텍스트 */}
        <Header>
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            <img src={backward} style={{ width: "10px", height: "18px" }} />
          </Button>
          <p style={{ marginRight: "150px" }}>회원가입</p>
        </Header>

        {/* 유저 사진 */}
        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <AddWrap>
            <AddImage
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
            />
          </AddWrap>
        </ImageWrap>

        <UserWrap>
          <Input style={{ width: "241px" }}>
            <InputText
              placeholder="이메일 입력 "
              onChange={userEmailChangeHandler}
            />
          </Input>
          <IdCheck onClick={() => dispatch(UserActions.signDupAPI(user_email))}>
            중복확인
          </IdCheck>
        </UserWrap>
        <Input>
          <InputText
            placeholder="패스워드 입력 (8자이상 영대/소문자+숫자)"
            onChange={passwordChangeHandler}
          />
        </Input>
        <Input>
          <InputText
            placeholder="패스워드 확인"
            onChange={confirmPasswordChangeHandler}
          />
        </Input>

        <Input>
          <InputText
            placeholder="닉네임 입력"
            onChange={userNicknameChangeHandler}
          />
        </Input>
        <Input>
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
        </Input>

        <Input>
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
        </Input>

        <ButtonWrap>
          <button onClick={submitUserInfo}>반려견 등록하기</button>
          <button
            onClick={() => {
              history.goBack();
            }}
          >
            취소하기
          </button>
        </ButtonWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  text-align: center;
  max-width: 390px;
  padding: 0 20px;
  margin: 30px auto;
  font-size: 14px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 52px;
  margin-bottom: 18px;
  font-size: 18px;
`;

const ImageWrap = styled.div`
  margin: 20px 0;
`;
const Preview = styled.img`
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border: 2px solid #000;
  border-radius: 14px;
  margin: auto;
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
// const Input = styled.div`
//   width: 240px;
//   background-color: #ebebeb;
//   border-radius: 10px;
//   padding: 12px 24px;
//   margin-bottom: 20px;
//   text-align: left;
// `;
const InputText = styled.input`
  width: 100%;
  border: 0;

  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const IdCheck = styled.button`
  box-sizing: border-box;
  width: 81px;
  height: 60px;
  border: 2px solid #000;
  background-color: #9de8df;
  border-radius: 14px;
  cursor: pointer;
`;

const Input = styled.div`
  box-sizing: border-box;
  padding: 12px 24px;
  border: 2px solid #000;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 16px;
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

const UserGender = styled.input``;
const UserAge = styled.input``;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 160px;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 2px solid #000;
    box-shadow: 0 4px 0px #000;
    cursor: pointer;
  }
`;
export default SignUp;
