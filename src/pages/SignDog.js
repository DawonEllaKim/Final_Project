import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as DogActions } from "../redux/modules/sign";
const SignDog = (props) => {
  const dispatch = useDispatch();

  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [dogGender, setDogGender] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [neutral, setNeutral] = useState("");
  const [dogComment, setDogComment] = useState("");

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

  const dogGenderChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogGender(newTitle);
  };
  const dogNameChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogName(newTitle);
  };
  const dogSizeChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogSize(newTitle);
  };
  const dogBreedChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogBreed(newTitle);
  };
  const dogAgeChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogAge(newTitle);
  };

  const neutralChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setNeutral(newTitle);
  };
  const dogCommentChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle);
    setDogComment(newTitle);
  };
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
          강아지 이름
          <DogTitleInput
            placeholder="강아지 이름을 입력하세요"
            onChange={dogNameChangeHandler}
          />
        </DogGender>

        <DogGender>
          성별
          <input
            type="checkbox"
            name="check1"
            id="check1"
            value="1"
            class="checkbox1"
            onChange={dogGenderChangeHandler}
          />
          <label for="check1">남</label>
          <input
            type="checkbox"
            name="radio1"
            id="radio1"
            value="1"
            class="checkbox1"
            onChange={dogGenderChangeHandler}
          />
          <label for="radio1">여</label>
        </DogGender>
        <DogGender>
          견종
          <select name="pets" id="pet-select" onChange={dogBreedChangeHandler}>
            <option value="">견종을 선택하세요</option>
            <option value="비숑">비숑</option>
            <option value="말티즈">말티즈</option>
            <option value="푸들">푸들</option>
          </select>
        </DogGender>

        <DogGender>
          크기
          <select name="pet" id="pet" onChange={dogSizeChangeHandler}>
            <option value="">강아지의 몸크기를 선택하세요!</option>
            <option value="소형견">소형견</option>
            <option value="중형견">중형견</option>
            <option value="대형견">대형견</option>
          </select>
        </DogGender>

        <DogGender>
          나이
          <select name="pet" id="pet" onChange={dogAgeChangeHandler}>
            <option value="">강아지의 나이를 선택하세요!</option>
            <option value="0~3세">0~3세</option>
            <option value="4~7세">4~7세</option>
            <option value="8세이상">8세이상</option>
          </select>
        </DogGender>

        <DogGender>
          중성화여부
          <input
            type="checkbox"
            name="check1"
            id="check1"
            value="예"
            class="checkbox1"
            onChange={neutralChangeHandler}
          />
          <label for="check1">예</label>
          <input
            type="checkbox"
            name="radio1"
            id="radio1"
            value="아니오"
            class="checkbox1"
            onChange={neutralChangeHandler}
          />
          <label for="radio1">아니오</label>
        </DogGender>
        <div>
          강아지 한줄평
          <DogTitleInput
            placeholder="강아지를 소개해주세요!"
            onChange={dogCommentChangeHandler}
          />
        </div>
        <DogGender>
          <Button>취소</Button>
          <Button
            onClick={() =>
              dispatch(
                DogActions.signDogAPI(
                  dogGender,
                  dogName,
                  dogSize,
                  dogBreed,
                  dogAge,
                  neutral,
                  dogComment,
                  imgFile
                )
              )
            }
          >
            제출
          </Button>
        </DogGender>
      </div>
    </FlexBox>
  );
};
export default SignDog;
const FlexBox = styled.div`
  margin: 20% 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Preview = styled.div`
  width: 450px;
  height: 300px;
  background-image: cover;
`;

const Image = styled.img`
  width: 400px;
  height: 300px;
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
