import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/user";

const EditUser = (props) => {
  const dispatch = useDispatch();

  // 현재 접속한 유저(보호자) 정보
  const user = useSelector((state) => state.user?.list[0]) || "";
  const Age = user.user_age;
  const Gender = user.user_gender;
  const Image = user.user_image;
  const NickName = user.user_nickname;

  const [imgBase64, setImgBase64] = useState(Image); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [userNickname, setUserNickname] = useState(NickName);
  const [userGender, setUserGender] = useState(Gender);
  const [userAge, setUserAge] = useState(Age);

  const handleChangeFile = (event) => {
    // 이미지 파일
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

  const userNicknameChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setUserNickname(newTitle);
  };
  const genderChangeHandler = (gender) => {
    console.log(gender);
    setUserGender(gender);
  };
  const userAgeChangeHandler = (age) => {
    console.log(age);
    setUserAge(age);
  };

  // 뒤로가기 버튼 - 수정 취소
  const cancel = () => {
    if (
      window.confirm("회원 정보 수정이 끝나지 않았습니다. 정말로 취소하십니까?")
    ) {
      history.goBack();
    }
  };

  // 수정하기 버튼 = 수정 완료
  const update = () => {
    dispatch(UserActions.updateUserMD(userGender, userAge));
  };

  // 현재 접속한 보호자의 정보 불러오기
  useEffect(() => {
    dispatch(UserActions.getUserMD());
  }, []);

  return (
    <>
      <Wrap>
        {/* 뒤로가기 버튼 + 회원정보 텍스트  */}
        <Top>
          <div>
            <MdArrowBackIosNew
              style={{
                width: "20px",
                height: "20px",
              }}
              onClick={cancel}
            />
          </div>
          <p>회원 정보</p>
        </Top>

        {/* 보호자 이미지 */}
        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <AddImage
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile}
          />
        </ImageWrap>

        {/* 보호자 닉네임 + 성별 + 나이대 */}
        <Body>
          {/* 보호자 닉네임 */}
          <Filter>
            <Nickname
              placeholder="닉네임을 입력하세요"
              onChange={userNicknameChangeHandler}
              defaultValue={NickName}
            />
          </Filter>
          {/* 보호자 성별 */}
          <Filter>
            <Title>성별</Title>
            <FlexWrap>
              <Flex>
                <input
                  type="radio"
                  id="male"
                  checked={userGender === "남"}
                  onClick={() => genderChangeHandler("남")}
                  name="gender"
                />
                <Label for="male">남</Label>
              </Flex>
              <Flex>
                <input
                  type="radio"
                  id="female"
                  checked={userGender === "여"}
                  onClick={() => genderChangeHandler("여")}
                  name="gender"
                />
                <Label for="female">여</Label>
              </Flex>
            </FlexWrap>
          </Filter>

          {/* 보호자 나이대 */}
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
                    name="age"
                  />
                </RadioWrap>
                <Label for="10">10대</Label>
              </Flex>
              <Flex>
                <RadioWrap>
                  <UserAge
                    type="radio"
                    id="20"
                    checked={userAge === "20대"}
                    onClick={() => userAgeChangeHandler("20대")}
                    name="age"
                  />
                </RadioWrap>

                <Label for="20">20대</Label>
              </Flex>
              <Flex>
                <RadioWrap>
                  <UserAge
                    type="radio"
                    id="30"
                    checked={userAge === "30대"}
                    onClick={() => userAgeChangeHandler("30대")}
                    name="age"
                  />
                </RadioWrap>

                <Label for="30">30대</Label>
              </Flex>
              <Flex>
                <RadioWrap>
                  <UserAge
                    type="radio"
                    id="40"
                    checked={userAge === "40대 이상"}
                    onClick={() => userAgeChangeHandler("40대 이상")}
                    name="age"
                  />
                </RadioWrap>

                <Label for="40">40대 이상</Label>
              </Flex>
            </FlexWrap>
          </Filter>
        </Body>

        {/* 수정 완료 버튼 */}
        <Footer>
          <Add onClick={update}>수정하기</Add>
        </Footer>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 390px;
  padding: 0 20px;
  margin: 30px auto;
  font-size: 14px;
  text-align: center;
`;
const Top = styled.div`
  position: relative;
  padding: 10px;
  div {
    position: absolute;
    bottom: 10px;
    left: 0;
    cursor: pointer;
  }
  p {
    font-size: 16px;
  }
`;
const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const AddImage = styled.input`
  width: 180px;
  margin: 10px 0;
`;
const Body = styled.div``;
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
const UserAge = styled.input``;
const Footer = styled.div`
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

export default EditUser;
