import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import e from "cors";

// 컴포넌츠
import TopBar from "../components/TopBar";
import SignUpSuccessModal from "../components/Modal/SignUpSuccessModal";
import Spinner from "../shared/Spinner";
import { emailCheck, passwordCheck } from "../shared/check";

// 리덕스
import { actionCreators as UserActions } from "../redux/modules/sign";
import { history } from "../redux/configureStore";

// 아이콘+이미지
import defaultUser from "../image/default_user.png";
// import { ElevatorSharp } from "@mui/icons-material";

const SignUp = () => {
  const dispatch = useDispatch();

  // 이미지
  const [imgBase64, setImgBase64] = useState(defaultUser ? defaultUser : ""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일

  // 아이디, 비밀번호, 비밀번호 확인, 닉네임, 거주지, 성별 , 나이대
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");

  // 회원가입 오류시 알람 메세지
  const [alert, setAlert] = useState("");
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPasswordLength, setAlertPasswordLength] = useState("");
  const [alertPassword, setAlertPassword] = useState("");
  const [alertConfirmPassword, setAlertConfirmPassword] = useState("");
  const [alertUserNickname, setAlertUserNickname] = useState("");
  const [alertUserLocation, setAlertUserLocation] = useState("");
  const [alertUserGender, setAlertUserGender] = useState("");
  const [alertUserAge, setAlertUserAge] = useState("");
  const [alertImage, setAlertImage] = useState("");

  // 회원가입 오류시 알람 색
  const [imageColor, setImageColor] = useState("");
  const [emailColor, setEmailColor] = useState("");
  const [passwordLengthColor, setPasswordLengthColor] = useState("");
  const [passwordColor, setPasswordColor] = useState("");
  const [confirmPasswordColor, setConfirmPasswordColor] = useState("");

  // 모달
  const [modal, setModal] = useState("");
  const is_loading = useSelector((state) => state.sign.is_loading);
  const user_modal = useSelector((state) => state.sign.user_modal);
  const [loading, setLoading] = useState();

  const [checkEmail, setCheckEmail] = useState("");
  const [checkColor, setCheckColor] = useState("");
  const checkEmailDup = useSelector((state) => state.sign.checkEmail);
  const checkColorDup = useSelector((state) => state.sign.checkColor);

  
  useEffect(() => {
    dispatch(UserActions.checkEmail());
    setCheckEmail(checkEmailDup);
    setAlertEmail(checkEmail);
    setCheckColor(checkColorDup);
    setEmailColor(checkColor)
    console.log("checkEmail, checkEmailDup", checkEmail, checkEmailDup,checkColorDup,checkColor);
  }, [checkEmailDup]);
  useEffect(() => {
    // dispatch(UserActions.checkEmail());
    // dispatch(postActions.getAllMD());
    setLoading(is_loading);
    setLoading(true);
 

    // 이미지확인
    if (imgBase64 === defaultUser) {
      setImageColor("red");
      setAlertImage("✔︎ 유저이미지를 등록해주세요");
    } else {
      setImageColor("green");
      setAlertImage("✔︎ 유저이미지를 등록해주세요");
    }

    // 이메일 확인
    if (userEmail === "") {
      setAlertEmail("");
    } else if (emailCheck(userEmail) === false) {
      setEmailColor("red");
      setAlertEmail("✔︎ 이메일 형식을 지켜주세요. 예)togaether@gmail.com");
    } 
    else if (alertEmail=="중복입니다")
    {
      setEmailColor("red");
    }
    else{
      setEmailColor("green");
    }
    // 이메일 확인
    // if (userEmail === "") {
    //   setAlertEmail("");
    // } else if (emailCheck(userEmail) === false) {
    //   setEmailColor("red");
    //   setAlertEmail("✔︎ 이메일 형식을 지켜주세요. 예)togaether@gmail.com");
    // } else if (checkEmail === false) {
    // }
    // else {
    //   setEmailColor("green");
    // }

    // 비밀번호 길이 확인
    if (password === "") {
      setAlertPasswordLength("");
    } else if (password !== "" && password.length < 8) {
      setPasswordLengthColor("red");
      setAlertPasswordLength("✔︎ 8자 이상 입력");
    } else {
      setPasswordLengthColor("green");
    }

    // 비밀번호 형식 확인
    if (password === "") {
      setAlertPassword("");
    } else if (password !== "" && passwordCheck(password) === false) {
      setPasswordColor("red");
      setAlertPassword("✔︎ 영대/소문자 + 숫자 + 특수문자 조합");
    } else {
      setPasswordColor("green");
    }

    // 비밀번호랑 비밀번호 확인이 같은지 체크
    if (confirmPassword === "") {
      setAlertConfirmPassword("");
    } else if (confirmPassword !== password) {
      setConfirmPasswordColor("red");
      setAlertConfirmPassword("✔︎ 동일한 비밀번호를 입력해주세요.");
    } else {
      setConfirmPasswordColor("green");
    }
  

    // if (
    // !passwordCheck(password) ||
    //   password !== confirmPassword ||
    //   !confirmPassword
    // ) {
    //   if (confirmPassword == "") {
    //     setAlertConfirmPassword("비밀번호를 재확인하지 않았습니다");
    //   } else {
    //     setAlertPassword("");
    //     setAlertConfirmPassword(false);
    //   }
    //   if (password !== confirmPassword) {
    //     if (!password) setAlertPassword("비밀번호가 입력되지 않았습니다");
    //     else if (!confirmPassword)
    //       setAlertConfirmPassword("비밀번호를 재확인하지 않았습니다");
    //     else {
    //       setAlertPassword("비밀번호가 일치하지 않습니다.");
    //       setAlertConfirmPassword("비밀번호가 일치하지 않습니다.");
    //     }
    //   }
    //   if (!passwordCheck(password)) {
    //     setAlertPassword(
    //       "잘못된 비밀번호 형식입니다. \n8자 이상 영대/소문자, 숫자,특수문자로 입력해주세요"
    //     );
    //   }
    // }

    // if (imgBase64 == defaultUser) setAlertImage("유저이미지를 등록해주세요");
    // else {
    //   setAlertImage("");
    // }

    // if (userEmail == "" || !emailCheck(userEmail)) {
    //   setAlertEmail("이메일형식이 아닙니다");
    // } else {
    //   setAlertEmail("");
    // }

    // if (userNickname == "") {
    //   setAlertUserNickname("닉네임이 입력되지 않았습니다");
    // } else {
    //   setAlertUserNickname("");
    // }

    // if (userLocation == "") {
    //   setAlertUserLocation("거주지가 입력되지 않았습니다");
    // } else {
    //   setAlertUserLocation("");
    // }

    // if (userGender == "") {
    //   setAlertUserGender("성별이 체크되지 않았습니다");
    // } else {
    //   setAlertUserGender("");
    // }

    // if (userAge == "") {
    //   setAlertUserAge("나이가 체크되지 않았습니다");
    // } else {
    //   setAlertUserAge("");
    // }
  }, [
    is_loading,
 
 
    userEmail,
    emailColor,
    password,
    passwordColor,
    confirmPassword,
    confirmPasswordColor,
    passwordLengthColor,
    imageColor,
    imgBase64,
  ]);

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
    setUserEmail(newTitle);
  };

  const passwordChangeHandler = (e) => {
    const newTitle = e.target.value;
    setPassword(newTitle);
  };

  const confirmPasswordChangeHandler = (e) => {
    const newTitle = e.target.value;
    setConfirmPassword(newTitle);
  };

  const userNicknameChangeHandler = (e) => {
    const newTitle = e.target.value;
    setUserNickname(newTitle);
  };

  const userLocationChangeHandler = (e) => {
    const newTitle = e.target.value;
    setUserLocation(newTitle);
  };

  const userGenderChangeHandler = (name) => {
    setUserGender(name);
  };

  const userAgeChangeHandler = (name) => {
    setUserAge(name);
  };

  const checkDup = () => {
    // if (checkEmail === false) {
    //   setEmailColor("red");
    //   setAlertEmail("no");
    //   return;
    // } else if (checkEmail === undefined) {
    //   setEmailColor("red");
    //   setAlertEmail("no");
    //   return;
    // } else {
    //   setEmailColor("green");
    //   setAlertEmail("yes");
    // }
    dispatch(UserActions.signDupAPI(userEmail));
  };

  const submitUserInfo = () => {
    if (
      !passwordCheck(password) ||
      password !== confirmPassword ||
      !confirmPassword
    ) {
      if (confirmPassword == "") {
        setAlertConfirmPassword("✔︎ 비밀번호를 재확인하지 않았습니다");
      } else {
        setAlertPassword("");
        setAlertConfirmPassword(false);
      }
      if (password !== confirmPassword) {
        if (!password) setAlertPassword("✔︎ 비밀번호가 입력되지 않았습니다");
        else if (!confirmPassword)
          setAlertConfirmPassword("✔︎ 비밀번호를 재확인하지 않았습니다");
        else {
          setAlertPassword("✔︎ 비밀번호가 일치하지 않습니다.");
          setAlertConfirmPassword("✔︎ 비밀번호가 일치하지 않습니다.");
        }
      }
      if (!passwordCheck(password)) {
        setAlertPassword(
          "✔︎ 잘못된 비밀번호 형식입니다. \n8자 이상 영대/소문자, 숫자,특수문자로 입력해주세요"
        );
      }
    }

    if (imgBase64 == defaultUser) {
      setAlertImage("✔︎ 유저이미지를 등록해주세요");
      window.alert("유저 이미지를 등록해주세요.");
      return;
    } else {
      setAlertImage("");
    }

    if (userEmail == "" || !emailCheck(userEmail)) {
      setAlertEmail("✔︎ 이메일형식이 아닙니다");
    } else {
      setAlertEmail("");
    }

    if (userNickname == "") {
      setAlertUserNickname("✔︎ 닉네임이 입력되지 않았습니다");
    } else {
      setAlertUserNickname("");
    }

    if (userLocation == "") {
      setAlertUserLocation("✔︎ 거주지가 입력되지 않았습니다");
    } else {
      setAlertUserLocation("");
    }

    if (userGender == "") {
      setAlertUserGender("✔︎ 성별이 체크되지 않았습니다");
    } else {
      setAlertUserGender("");
    }

    if (userAge == "") {
      setAlertUserAge("✔︎ 나이가 체크되지 않았습니다");
    } else {
      setAlertUserAge("");
    }
    console.log(alertEmail)
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
   

    ) {
  
      return;
    }
    if(
      alertEmail !="정상적인 이메일입니다."
    )
    {
      window.alert("이메일 중복확인을 해주세요!")
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
      <Wrap>
        {/* 뒤로가기 버튼 + 회원가입 텍스트 */}
        <TopBar only_left>회원가입</TopBar>

        {/* 회원 사진 */}
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
        <ImageAlert style={{ color: imageColor === "red" ? "red" : "green" }}>
          {alertImage ? alertImage : ""}
        </ImageAlert>

        {/* 이메일 */}
        <UserWrap>
          <Input>
            <InputText
              placeholder="이메일 입력 ex) abc@naver.com "
              onChange={userEmailChangeHandler}
            />
          </Input>
          <IdCheck onClick={checkDup}>중복확인</IdCheck>
        </UserWrap>
        <Alert style={{ color: emailColor === "red" ? "red" : "green" }}>
          {alertEmail ? alertEmail : ""}
        </Alert>

        {/* 비밀번호 */}
        <Input>
          <InputText
            type="password"
            placeholder="패스워드 입력 (8자이상 영대/소문자+숫자+특수문자 필수)"
            onChange={passwordChangeHandler}
          />
        </Input>
        <Alert
          style={{ color: passwordLengthColor === "red" ? "red" : "green" }}
        >
          {alertPasswordLength ? alertPasswordLength : ""}
        </Alert>
        <Alert style={{ color: passwordColor === "red" ? "red" : "green" }}>
          {alertPassword ? alertPassword : ""}
        </Alert>

        {/* 비밀번호 확인 */}
        <Input>
          <InputText
            type="password"
            placeholder="패스워드 확인"
            onChange={confirmPasswordChangeHandler}
          />
        </Input>
        <Alert
          style={{ color: confirmPasswordColor === "red" ? "red" : "green" }}
        >
          {alertConfirmPassword ? alertConfirmPassword : ""}
        </Alert>

        {/* 회원 닉네임 */}
        <Input>
          <InputText
            placeholder="닉네임 입력"
            onChange={userNicknameChangeHandler}
          />
        </Input>
        <Alert>{alertUserNickname ? alertUserNickname : ""}</Alert>

        {/* 회원 거주지 */}
        <Input>
          <InputText
            placeholder="거주지 입력 (시/구/동 까지)"
            onChange={userLocationChangeHandler}
          />
        </Input>
        <Alert>{alertUserLocation ? alertUserLocation : ""}</Alert>

        {/* 회원 성별 */}
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

        {/* 회원 나이대 */}
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

        {/* 회원가입 + 취소 버튼 */}
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

      {/* 회원가입 성공시 뜨는 알람창 */}
      {modal ? <SignUpSuccessModal setModal={setModal} /> : ""}
    </>
  );
};

const Alert = styled.div`
  color: #ff5252;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;

  margin-left: 20px;
`;
const ImageAlert = styled.div`
  color: #ff5252;
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-top: -5px;
  margin-bottom: 10px;
`;
const Wrap = styled.div`
  box-sizing: border-box;
  padding: 0 5%;
  font-size: 14px;
`;
const ImageWrap = styled.div`
  margin: 10px 0;
  /* diplay: flex; */
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
  /* margin: 40px 0; */
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
