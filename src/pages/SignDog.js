import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as DogActions } from "../redux/modules/sign";
import { dogBreedCheck } from "../shared/check";

import Button from "../elements/Button";
import backward from "../image/backward.png";

const SignDog = (props) => {
  const dispatch = useDispatch();

  //jsonserver 데이터 맞추기 위한 코드
  const signUser = useSelector((state) => state.sign.user);
  console.log(signUser);

  const submitDogInfo = () => {
    if (!dogBreedCheck(dog_breed)) {
      window.alert("강아지 종은 한글,영문 형식만 입력 가능합니다");
      return;
    }

    if (
      dog_gender === "" ||
      dog_name === "" ||
      dog_size === "" ||
      dog_breed === "" ||
      dog_age === "" ||
      neutral === "" ||
      dog_comment === ""
    ) {
      window.alert("입력하지 않은 값이 있습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("dog_gender", dog_gender);
    formData.append("dog_name", dog_name);
    formData.append("dog_size", dog_size);
    formData.append("dog_breed", dog_breed);
    formData.append("dog_age", dog_age);
    formData.append("neutral", neutral);
    formData.append("dog_comment", dog_comment);
    formData.append("dog_image", imgFile);

    dispatch(DogActions.signDogAPI(formData));
  };

  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [dog_gender, setDogGender] = useState("");
  const [dog_name, setDogName] = useState("");
  const [dog_size, setDogSize] = useState("");
  const [dog_breed, setDogBreed] = useState("");
  const [dog_age, setDogAge] = useState("");
  const [neutral, setNeutral] = useState("");
  const [dog_comment, setDogComment] = useState("");

  const handleChangeFile = (event) => {
    event.preventDefault();
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
        console.log(base64);
      }
    };

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }

    console.log(event.target.files[0]);
  };

  const dogNameChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogName(newTitle);
  };

  const dogBreedChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogBreed(newTitle);
  };

  const dogSizeChangeHandler = (size) => {
    console.log(size);
    setDogSize(size);
  };

  const dogGenderChangeHandler = (gender) => {
    console.log(gender);
    setDogGender(gender);
  };

  const dogNeutralChangeHandler = (neutral) => {
    console.log(neutral);
    setNeutral(neutral);
  };

  const dogAgeChangeHandler = (age) => {
    console.log(age);
    setDogAge(age);
  };

  const dogCommentChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogComment(newTitle);
  };

  return (
    <>
      <Wrap>
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

        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <AddWrap>
            <AddImage
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
            ></AddImage>
            {/* <AddBtn>이미지 등록하기</AddBtn> */}
          </AddWrap>
        </ImageWrap>
        <Input>
          <InputText
            placeholder="강아지 이름 입력 "
            onChange={dogNameChangeHandler}
          ></InputText>
        </Input>
        <Input>
          <InputText
            placeholder="강아지 종 입력 ex) 말티즈, 비숑..."
            onChange={dogBreedChangeHandler}
          ></InputText>
        </Input>
        <Input>
          <Title>크기</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogSize
                  type="radio"
                  id="s"
                  checked={dog_size === "소형견"}
                  onClick={() => dogSizeChangeHandler("소형견")}
                />
              </RadioWrap>
              <Label htmlFor="s">소형견</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <DogSize
                  type="radio"
                  id="m"
                  checked={dog_size === "중형견"}
                  onClick={() => dogSizeChangeHandler("중형견")}
                />
              </RadioWrap>

              <Label htmlFor="m">중형견</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <DogSize
                  type="radio"
                  id="l"
                  checked={dog_size === "대형견"}
                  onClick={() => dogSizeChangeHandler("대형견")}
                />
              </RadioWrap>

              <Label htmlFor="l">대형견</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Input>
          <Title>성별</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogGender
                  type="radio"
                  id="b"
                  checked={dog_gender === "남"}
                  onClick={() => dogGenderChangeHandler("남")}
                />
              </RadioWrap>

              <Label htmlFor="b">남</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <DogGender
                  type="radio"
                  id="g"
                  checked={dog_gender === "여"}
                  onClick={() => dogGenderChangeHandler("여")}
                />
              </RadioWrap>

              <Label htmlFor="g">여</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Input>
          <Title>중성화 여부</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogNeutral
                  type="radio"
                  id="yes"
                  checked={neutral === true}
                  onClick={() => dogNeutralChangeHandler(true)}
                />
              </RadioWrap>

              <Label htmlFor="yes">Y</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <DogNeutral
                  type="radio"
                  id="no"
                  checked={neutral === false}
                  onClick={() => dogNeutralChangeHandler(false)}
                />
              </RadioWrap>

              <Label htmlFor="no">N</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Input>
          <Title>나이대</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogAge
                  type="radio"
                  id="young"
                  checked={dog_age === "0~3세"}
                  onClick={() => dogAgeChangeHandler("0~3세")}
                />
              </RadioWrap>

              <Label htmlFor="young">0~3세</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <DogAge
                  type="radio"
                  id="junior"
                  checked={dog_age === "4~7세"}
                  onClick={() => dogAgeChangeHandler("4~7세")}
                />
              </RadioWrap>

              <Label htmlFor="junior">4~7세</Label>
            </Flex>
            <Flex>
              <RadioWrap>
                <DogAge
                  type="radio"
                  id="senior"
                  checked={dog_age === "8세 이상"}
                  onClick={() => dogAgeChangeHandler("8세 이상")}
                />
              </RadioWrap>

              <Label htmlFor="senior">8세 이상</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Input>
          <Title> 한 줄 소개</Title>
          <InputText
            placeholder="ex) 우리 집 최고 애교쟁이!"
            onChange={dogCommentChangeHandler}
          ></InputText>
        </Input>
        <ButtonWrap>
          <button onClick={submitDogInfo}>가입하기</button>
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
const Input = styled.div`
  box-sizing: border-box;
  padding: 12px 24px;
  border: 2px solid #000;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 16px;
`;

const TopTitle = styled.div`
  font-size: 16px;
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
const InputText = styled.input`
  width: 100%;
  border: 0;

  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const AddWrap = styled.div``;
const AddImage = styled.input`
  width: 180px;
  margin: 10px 0;
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

const DogSize = styled.input``;
const DogGender = styled.input``;
const DogNeutral = styled.input``;
const DogAge = styled.input``;

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
export default SignDog;
