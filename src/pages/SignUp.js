import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/sign";
const SignOwner = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");
  
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const usernameChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUsername(newTitle);
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
  const userGenderChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserGender(newTitle);
  };
  const userAgeChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserAge(newTitle);
  };

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

 const submitUserInfo = () => {
    let UserInfo = {
      username,password,confirmPassword,userNickname,userGender,userAge,imgFile
    }
    dispatch(UserActions.signUserAPI(UserInfo))
 }

  return (
    <FlexBox>
        <Preview>
        <Image src={imgBase64}></Image>
        <input
          type="file"
          name="imgFile"
          id="imgFile"
          onChange={handleChangeFile}
        />
      </Preview>
      <div>
        <DogGender>
          ID
          <DogTitleInput
            placeholder="ID를 입력하세요"
            onChange={usernameChangeHandler}
          />
        </DogGender>

        <DogGender>
          PASSWORD
          <DogTitleInput
            placeholder="비밀번호를 입력하세요"
            onChange={passwordChangeHandler}
          />
        </DogGender>
        <DogGender>
          PASSWORDCHECK
          <DogTitleInput placeholder="비밀번호확인을 입력하세요"
             onChange={confirmPasswordChangeHandler}
          />
        </DogGender>
         
        <DogGender>
          보호자 이름
          <DogTitleInput
            placeholder="보호자 이름을 입력하세요"
            onChange={ userNicknameChangeHandler}
          />
        </DogGender>

        <DogGender>
          성별
          <input
            type="checkbox"
            name="check1"
            id="check1"
            value="남"
            class="checkbox1"
            onChange={userGenderChangeHandler}
          />
          <label for="check1">남</label>
          <input
            type="checkbox"
            name="radio1"
            id="radio1"
            value="여"
            class="checkbox1"
            onChange={userGenderChangeHandler}
          />
          <label for="radio1">여</label>
        </DogGender>

        <DogGender>
          나이
          <select name="pets" id="pet-select" onChange={userAgeChangeHandler}>
            <option value="">나이를 선택하세요</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대">40대</option>
          </select>
        </DogGender>

        <DogGender>
          <Button>취소</Button>
          <Button
            onClick={submitUserInfo}
          >
            제출
          </Button>
        </DogGender>
      </div>
    </FlexBox>
  );
};
export default SignOwner;
const FlexBox = styled.div`
  margin: 20% 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.div`
  width: 550px;
  height: 300px;
  background-image: cover;
`;

const Image = styled.img`
  width: 500px;
  height: 600px;
`;
// 오른 쪽  정보창
const DogTitleInput = styled.input`
  margin-left: 20px;
  border: none;
  border-bottom: 1px solid;
`;
const DogGender = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0px;
`;
const Button = styled.button`
  margin-right: 20px;
  cursor: pointer;
`;
