import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { history } from "../redux/configureStore";
import { useDispatch,useSelector } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/sign";
import { emailCheck, passwordCheck } from "../shared/check";
import Spinner from "../shared/Spinner";
import TopBar from "../components/TopBar";
import SignUpSuccessModal from "../components/Modal/SignUpSuccessModal";
// 유저 이미지 기본값
import defaultUser from "../image/default_user.png";


const SignUp = () => {
  const dispatch = useDispatch();
  const [imgBase64, setImgBase64] = useState(defaultUser ? defaultUser : ""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");
  const [alert, setAlert] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPassword, setAlertPassword] = useState("");
  const [alertConfirmPassword, setAlertConfirmPassword] = useState("");
  const [alertUserNickname, setAlertUserNickname] = useState("");
  const [alertUserLocation, setAlertUserLocation] = useState("");
  const [alertUserGender, setAlertUserGender] = useState("");
  const [alertUserAge, setAlertUserAge] = useState("");
  const [alertImage, setAlertImage] = useState("");
  const [modal,setModal] = useState("")
  const is_loading = useSelector((state) => state.sign.is_loading);
  const user_modal = useSelector((state) => state.sign.user_modal);
  const [loading,setLoading] = useState()
  useEffect(() => {
    // dispatch(postActions.getAllMD());

    setLoading(is_loading)
    setLoading(true)
    setModal(user_modal)
  }, [is_loading,user_modal]);
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
  const userLocationChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserLocation(newTitle);
  };
  const userGenderChangeHandler = (name) => {
    console.log(name);
    setUserGender(name);
  };
  const userAgeChangeHandler = (name) => {
    console.log(name);
    setUserAge(name);
  };

  const checkDup = () => {
    if (!emailCheck(userEmail)) {
      setAlertEmail("이메일 형식이 아닙니다!");
      return;
    } else {
      setAlertEmail("");
    }

    dispatch(UserActions.signDupAPI(userEmail));
  };

  const submitUserInfo = () => {
    if (
      !passwordCheck(password) ||
      password !== confirmPassword ||
      !confirmPassword
    ) {
      if (!passwordCheck(password)) {
        setAlertPassword(
          "잘못된 비밀번호 형식입니다. \n8자 이상 영대/소문자, 숫자로 입력해주세요"
        );
      }

      if (password !== confirmPassword) {
        setAlertPassword("비밀번호가 일치하지 않습니다.");
        setAlertConfirmPassword("비밀번호가 일치하지 않습니다.");
      }
      if (confirmPassword == "") {
        setAlertConfirmPassword("비밀번호를 재확인하지 않았습니다");
      } else {
        setAlertPassword("");
        setAlertConfirmPassword(false);
      }
    }
    if (imgBase64 == defaultUser) setAlertImage("유저이미지를 등록해주세요");
    else {
      setAlertImage("");
    }

    if (userEmail == "" || !emailCheck(userEmail)) {
      setAlertEmail("이메일형식이 아닙니다");
    } else {
      setAlertEmail("");
    }

    if (userNickname == "") {
      setAlertUserNickname("닉네임이 입력되지 않았습니다");
    } else {
      setAlertUserNickname("");
    }

    if (userLocation == "") {
      setAlertUserLocation("거주지가 입력되지 않았습니다");
    } else {
      setAlertUserLocation("");
    }

    if (userGender == "") {
      setAlertUserGender("성별이 체크되지 않았습니다");
    } else {
      setAlertUserGender("");
    }

    if (userAge == "") {
      setAlertUserAge("나이가 체크되지 않았습니다");
    } else {
      setAlertUserAge("");
    }
    if (
      
        !userAge ||
        !userGender ||
        !userLocation ||
        !userNickname ||
        !confirmPassword ||
        !password ||
        !userEmail ||
        password !== confirmPassword ||
        !passwordCheck(password)
      
    )
    {
      return;
    }
  

    const formData = new FormData();
    formData.append("userEmail", userEmail);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("userNickname", userNickname);
    formData.append("userLocation", userLocation);
    formData.append("userGender", userGender);
    formData.append("userAge", userAge);
    formData.append("userImage", imgFile);

    // toast.success("회원 정보 등록이 완료되었습니다!", {
    //   position: toast.POSITION.TOP_CENTER,
    //   autoClose: 3000,
    //   draggable: true,
    //   closeOnClick: true,
    // });
    setLoading(false);
    dispatch(UserActions.signUserAPI(formData));
  };
  if (!loading) {
    return <Spinner />;
  }
  return (
    <>
    {
      modal? <SignUpSuccessModal setModal={setModal}/> : ""
    }
      <Wrap>
        {/* 뒤로가기 버튼 + 회원가입 텍스트 */}
        <TopBar only_left>회원가입</TopBar>

        {/* 유저 사진 */}
        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <AddWrap>
            <UploadLabel for="imgFile">이미지 등록하기</UploadLabel>
            <AddImage
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
            />
          </AddWrap>
        </ImageWrap>
        <ImageAlert>{alertImage ? alertImage : ""}</ImageAlert>
        <UserWrap>
          <Input>
            <InputText
              placeholder="이메일 입력 ex) abc@naver.com "
              onChange={userEmailChangeHandler}
            />
          </Input>
          <IdCheck onClick={checkDup}>중복확인</IdCheck>
        </UserWrap>
        <Alert>{alertEmail ? alertEmail : ""}</Alert>
        <Input>
          <InputText
            type="password"
            placeholder="패스워드 입력 (8자이상 영대/소문자+숫자)"
            onChange={passwordChangeHandler}
          />
        </Input>
        <Alert>{alertPassword ? alertPassword : ""}</Alert>
        <Input>
          <InputText
            type="password"
            placeholder="패스워드 확인"
            onChange={confirmPasswordChangeHandler}
          />
        </Input>
        <Alert>{alertConfirmPassword ? alertConfirmPassword : ""}</Alert>
        <Input>
          <InputText
            placeholder="닉네임 입력"
            onChange={userNicknameChangeHandler}
          />
        </Input>
        <Alert>{alertUserNickname ? alertUserNickname : ""}</Alert>
        <Input>
          <InputText
            placeholder="거주지 입력 (시/구/동 까지)"
            onChange={userLocationChangeHandler}
          />
        </Input>
        <Alert>{alertUserLocation ? alertUserLocation : ""}</Alert>
        <Input>
          <Title>성별</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <UserGender
                  type="radio"
                  id="b"
                  value="남"
                  checked={userGender === "남"}
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
                  checked={userGender === "여"}
                  onClick={() => userGenderChangeHandler("여")}
                />
              </RadioWrap>
              <Label htmlFor="g">여</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Alert>{alertUserGender ? alertUserGender : ""}</Alert>
        <Input>
          <Title>나이대</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <UserAge
                  type="radio"
                  id="10"
                  checked={userAge === "10대"}
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
                  checked={userAge === "20대"}
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
                  checked={userAge === "30대"}
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
                  checked={userAge === "40대 이상"}
                  onClick={() => userAgeChangeHandler("40대 이상")}
                />
              </RadioWrap>

              <Label htmlFor="40">40대 이상</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Alert>{alertUserAge ? alertUserAge : ""}</Alert>
        <ButtonWrap>
          <button
            onClick={submitUserInfo}
            style={{ backgroundColor: "#ff5656" }}
          >
            가입하기
          </button>
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
const Alert = styled.div`
  color: #ff5252;
  display: flex;
  justify-content: flex-start;
`;
const ImageAlert = styled.div`
  color: #ff5252;
  display: flex;
  justify-content: center;
`;
const Wrap = styled.div`
  box-sizing: border-box;
  padding: 0 5%;
  font-size: 14px;
`;

const ImageWrap = styled.div`
  margin: 10px 0;
  diplay: flex;
  justify-content: center;
`;

const Preview = styled.img`
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border-radius: 14px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  object-fit: cover;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const AddWrap = styled.div``;
const UploadLabel = styled.label`
  padding: 10px 5px 5px 5px;
  margin: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;
const AddImage = styled.input`
  /* width: 180px;
  margin: 10px 0; */
  display: none;
`;
const UserWrap = styled.div`
  display: flex;

  width: 100%;
`;
const InputText = styled.input`
  width: 100%;
  border: 0;
  margin: 0 auto;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const IdCheck = styled.button`
  box-sizing: border-box;
  width: 120px;
  height: 60px;
  border: none;
  background-color: #9de8df;
  border-radius: 14px;
  cursor: pointer;
  margin-left: 30px;
  margin-top: 10px;
`;

const Input = styled.div`
  box-sizing: border-box;
  margin: 10px 0px;
  padding: 12px 24px;
  border-radius: 14px;
  text-align: left;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  color: #888;
  width: 100%;
  &:hover {
    border: 2px solid lightBlue;
  }
`;

const Title = styled.div`
  margin-bottom: 15px;
`;
const FlexWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const RadioWrap = styled.div`
  font-size: 16px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const Label = styled.label`
  padding-top: 4px;
  font-size: 14px;
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
  margin: 40px 0;
  button {
    width: 160px;
    height: 48px;
    background-color: #fff;
    border: none;
    border-radius: 14px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;
export default SignUp;
