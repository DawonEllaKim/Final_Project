import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/sign";

const EditUser = () => {
  const dispatch = useDispatch();
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

  const [userNickname, setUserNickname] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");

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

//   const usernameChangeHandler = (e) => {
//     const newTitle = e.target.value;
//     console.log(newTitle);
//     setUsername(newTitle);
//   };
//   const passwordChangeHandler = (e) => {
//     const newTitle = e.target.value;
//     console.log(newTitle);
//     setPassword(newTitle);
//   };

  const userNicknameChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserNickname(newTitle);
  };
  const userGenderChangeHandler = (gender) => {
    console.log(gender);
    setUserGender(gender);
  };
  const userAgeChangeHandler = (age) => {
    console.log(age);
    setUserAge(age);
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
          <TopTitle>회원 정보</TopTitle>
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
        <Filter>
          <Nickname
            placeholder="닉네임을 입력하세요"
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
                  checked={userGender === "여"}
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
        </Filter>

        <ButtonWrap>
          <Add
            onClick={() =>
              dispatch(
                UserActions.signUserAPI(
                //   username,
                //   password,
                  userNickname,
                  userGender,
                  userAge,
                  imgFile
                )
              )
            }
          >
            수정하기
          </Add>
          {/* <Cancle
            onClick={() => {
              history.goBack();
            }}
          >
            취소하기
          </Cancle> */}
        </ButtonWrap>
      </Wrap>
    </>
  );
};

export default EditUser;

const Wrap = styled.div`
  max-width: 390px;
  padding: 0 20px;
  margin: 30px auto;
  font-size: 14px;
  text-align: center;
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
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: #c4c4c4;
  cursor: pointer;
`;
// const Cancle = styled.button`
//   width: 160px;
//   height: 48px;
//   border: none;
//   border-radius: 10px;
//   background-color: #c4c4c4;
//   cursor: pointer;
// `;
