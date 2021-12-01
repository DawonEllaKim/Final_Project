// SignUp.js - 회원가입 페이지 (보호자 정보 입력)
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import e from "cors";
import { toast } from "react-toastify";
import { style } from "react-toastify";

// 컴포넌츠
import TopBar from "../components/TopBar";
import SignUpSuccessModal from "../components/Modal/SignUpSuccessModal";
import Spinner from "../shared/Spinner";
import { emailCheck, passwordCheck } from "../shared/check";
import "../shared/styles.css";
// 리덕스
import { actionCreators as UserActions } from "../redux/modules/sign";
import { history } from "../redux/configureStore";

// 아이콘+이미지
import defaultUser from "../image/default_user.png";
import { MdCloudUpload } from "react-icons/md";
import { SliderTrack } from "@mui/material";

toast.configure();

const SignUp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  const [userNicknameColor, setUserNicknameColor] = useState("");
  const [userLocationColor, setUserLocationColor] = useState("");
  const [userGenderColor, setUserGenderColor] = useState("");
  const [userAgeColor, setUserAgeColor] = useState("");

  // submit 이후 상태
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState("");
  const [userNicknameStatus, setUserNicknameStatus] = useState("");
  const [userLocationStatus, setUserLocationStatus] = useState("");
  const [userGenderStatus, setUserGenderStatus] = useState("");
  const [userAgeStatus, setUserAgeStatus] = useState("");

  // 모달
  const [modal, setModal] = useState("");
  const is_loading = useSelector((state) => state.sign.is_loading);
  // const user_modal = useSelector((state) => state.sign.user_modal);
  const [loading, setLoading] = useState();

  const [checkEmail, setCheckEmail] = useState("");
  const [checkColor, setCheckColor] = useState("");
  const checkEmailDup = useSelector((state) => state.sign.checkEmail);
  const checkColorDup = useSelector((state) => state.sign.checkColor);

  useEffect(() => {
    dispatch(UserActions.checkEmail());
    setCheckEmail(checkEmailDup);
    setAlertEmail(checkEmail);
    setEmailStatus(checkEmail);
    setCheckColor(checkColorDup);
    setEmailColor(checkColor);
  }, [checkEmailDup]);

  useEffect(() => {
    // dispatch(UserActions.checkEmail());
    // dispatch(postActions.getAllMD());
    setLoading(is_loading);
    setLoading(true);

    // 이미지 등록 확인
    if (imgBase64 !== defaultUser) {
      setImageColor("green");
      setAlertImage("✔︎ 이미지가 등록되었습니다.");
    }

    // 이메일 확인
    if (emailStatus === "empty" && !userEmail) {
      setEmailColor("red");
      setAlertEmail("✔︎ 이메일을 입력해 주세요.");
    } else if (userEmail === "") {
      setEmailColor("red");
      setAlertEmail("");
    } else if (emailCheck(userEmail) === false) {
      setEmailColor("red");
      setAlertEmail("✔︎ 이메일 형식을 지켜주세요. 예) abc@gmail.com");
    } else if (emailStatus === "used") {
      setEmailColor("red");
      setAlertEmail("✔︎ 이미 사용 중인 이메일입니다.");
    } else if (emailStatus === true) {
      setEmailColor("green");
      setAlertEmail("✔︎ 사용 가능한 이메일입니다.");
    } else {
      setEmailColor("green");
    }

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
    if (password == "" && passwordStatus === false) {
      setPasswordColor("red");
      setAlertPassword("✔︎ 비밀번호를 입력해 주세요.");
    } else if (password === "") {
      setAlertPassword("");
    } else if (password !== "" && passwordCheck(password) === false) {
      setPasswordColor("red");
      setAlertPassword("✔︎ 영대/소문자 + 숫자 + 특수문자 (!_) 조합 필수");
    } else {
      setPasswordColor("green");
    }

    // 비밀번호랑 비밀번호 확인이 같은지 체크
    if (confirmPassword === "" && confirmPasswordStatus === false) {
      setConfirmPasswordColor("red");
      setAlertConfirmPassword("✔︎ 비밀번호 재확인을 해주세요.");
    } else if (confirmPassword === "") {
      setAlertConfirmPassword("");
    } else if (confirmPassword !== password) {
      setConfirmPasswordColor("red");
      setAlertConfirmPassword("✔︎ 비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordColor("green");
      setAlertConfirmPassword("✔︎ 비밀번호가 일치합니다.");
    }

    // 닉네임
    if (userNickname === "" && userNicknameStatus === false) {
      setUserNicknameColor("red");
      setAlertUserNickname("✔︎ 닉네임을 입력해 주세요.");
    } else if (userNickname === "") {
      setAlertUserNickname("");
    } else if (userNickname) {
      setUserNicknameColor("green");
      setAlertUserNickname("✔︎ 닉네임이 입력되었습니다.");
    }

    // 거주지
    if (userLocation === "" && userLocationStatus === false) {
      setUserLocationColor("red");
      setAlertUserLocation("✔︎ 거주지를 입력해 주세요.");
    } else if (userLocation === "") {
      setAlertUserLocation("");
    } else if (userLocation) {
      setUserLocationColor("green");
      setAlertUserLocation("✔︎ 거주지가 입력되었습니다.");
    }

    // 성별
    if (userGender === "" && userGenderStatus === false) {
      setUserGenderColor("red");
      setAlertUserGender("✔︎ 성별을 선택해 주세요.");
    } else if (userGender === "") {
      setAlertUserGender("");
    } else if (userGender) {
      setUserGenderColor("green");
      setAlertUserGender("✔︎ 성별이 선택되었습니다.");
    }

    // 나이대
    if (userAge === "" && userAgeStatus === false) {
      setUserAgeColor("red");
      setAlertUserAge("✔︎ 나이대를 선택해 주세요.");
    } else if (userAge === "") {
      setAlertUserAge("");
    } else if (userAge) {
      setUserAgeColor("green");
      setAlertUserAge("✔︎ 나이대가 선택되었습니다.");
    }
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
    emailStatus,
    userAge,
    userAgeColor,
    userNickname,
    userNicknameColor,
    userLocation,
    userLocationColor,
    userGender,
    userGenderColor,
    alertEmail,
    emailStatus,
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
    dispatch(UserActions.signDupAPI(userEmail));

    if (!userEmail) {
      setEmailColor("red");
      setEmailStatus("empty");
      return;
    } else if (userEmail && emailCheck(userEmail) === false) {
      setEmailColor("red");
      setAlertEmail("✔︎ 이메일 형식을 지켜주세요. 예) abc@gmail.com");
      return;
    } else if (emailCheck(userEmail) === true && emailStatus === false) {
      setEmailColor("red");
      setEmailStatus("used");
      return;
    } else if (emailStatus === true) {
      setEmailColor("green");
      setAlertEmail("✔︎ 사용 가능한 이메일입니다.");
    }
  };

  const submitUserInfo = () => {
    // 이미지가 공백일때
    if (imgBase64 == defaultUser) {
      setImageColor("red");
      setAlertImage("✔︎ 이미지를 등록해 주세요.");
    } else {
      setAlertImage("");
    }

    // 이메일이 공백일때
    if (userEmail == "") {
      setEmailStatus("empty");
    }

    // 비밀번호 공백일때
    if (!password) {
      setPasswordStatus(false);
    } else {
    }

    // 비밀번호 재확인이 공백일때
    if (confirmPassword == "") {
      setConfirmPasswordStatus(false);
    } else {
    }

    // 닉네임이 공백일때
    if (userNickname == "") {
      setUserNicknameStatus(false);
    } else {
    }

    // 거주지가 공백일때
    if (userLocation == "") {
      setUserLocationStatus(false);
    } else {
    }

    // 유저의 성별이 공백일때
    if (userGender == "") {
      setUserGenderStatus(false);
    } else {
    }

    // 나이가 공백일때
    if (userAge === "") {
      setUserAgeStatus(false);
    } else {
    }

    // 정보가 하나라도 입력이 되지 않았으면 경고창 보여줌
    if (
      imgBase64 == defaultUser ||
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
      toast.error("입력하지 않은 정보가 있습니다.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
        // hideProgressBar: true,
      });
      return;
    }

    // 이메일 중복 버튼을 누르지 않고 회원가입 하려면 경고창 보여줌
    if (emailStatus !== true) {
      toast.error("이메일 중복 확인을 해주세요", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
        // hideProgressBar: true,
      });
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
            <UploadLabel for="imgFile">
              <MdCloudUpload
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  color: "#404040",
                }}
              />
              이미지 업로드
            </UploadLabel>
            <AddImage
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
            />
          </AddWrap>
          <ImageAlert style={{ color: imageColor === "red" ? "red" : "green" }}>
            {alertImage ? alertImage : ""}
          </ImageAlert>
        </ImageWrap>

        {/* 이메일 */}
        <UserWrap>
          <Input>
            <InputText
              placeholder="이메일 예) abc@gmail.com "
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
            placeholder="비밀번호 (8자이상 영대/소문자+숫자+특수문자 필수)"
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
            placeholder=" 비밀번호 재확인"
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
            placeholder="닉네임"
            onChange={userNicknameChangeHandler}
          />
        </Input>
        <Alert style={{ color: userNicknameColor === "red" ? "red" : "green" }}>
          {alertUserNickname ? alertUserNickname : ""}
        </Alert>

        {/* 회원 거주지 */}
        <Input>
          <InputText
            placeholder="거주지 (시/구/동 까지)"
            onChange={userLocationChangeHandler}
          />
        </Input>
        <Alert style={{ color: userLocationColor === "red" ? "red" : "green" }}>
          {alertUserLocation ? alertUserLocation : ""}
        </Alert>

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
        <Alert style={{ color: userGenderColor === "red" ? "red" : "green" }}>
          {alertUserGender ? alertUserGender : ""}
        </Alert>

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
        <Alert style={{ color: userAgeColor === "red" ? "red" : "green" }}>
          {alertUserAge ? alertUserAge : ""}
        </Alert>

        {/* 회원가입 + 취소 버튼 */}
        <ButtonWrap>
          <button
            onClick={submitUserInfo}
            style={{ backgroundColor: "#ff5656" }}
          >
            가입하기
          </button>
          {/* <button
            onClick={() => {
              history.goBack();
            }}
          >
            취소하기
          </button> */}
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
  width: 150px;
  padding: 5px 5px 5px 5px;
  margin: 10px auto;
  cursor: pointer;
  display: flex;
  border-radius: 24px;
  justify-content: center;
  border: 1px solid #c4c4c4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const AddImage = styled.input`
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
const UserGender = styled.input``;
const UserAge = styled.input``;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0;
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
