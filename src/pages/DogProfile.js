// DogProfile.js - 강아지 프로필 편집 페이지
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

// 리덕스
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as DogActions } from "../redux/modules/user";
// 리액트 아이콘
import { MdArrowBackIosNew } from "react-icons/md";

const EditDog = (props) => {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.user.dog);
  console.log(dog)
  const dog_id = dog.dog_id;

  // 이미지
  const [imgBase64, setImgBase64] = useState(); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일

  const [dogName, setDogName] = useState(() => dog.dog_name);
  const [dogBreed, setDogBreed] = useState(() => dog.dog_breed);
  const [dogSize, setDogSize] = useState();
  const [dogGender, setDogGender] = useState();
  const [dogAge, setDogAge] = useState();
  const [neutral, setNeutral] = useState();
  const [dogComment, setDogComment] = useState(() => dog.dog_comment);

  const handleChangeFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
        // console.log(base64);
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };
  const dogNameChangeHandler = (e) => {
    const newTitle = e.target.value;
    setDogName(newTitle);
  };
  const dogBreedChangeHandler = (e) => {
    const newTitle = e.target.value;
    setDogBreed(newTitle);
  };
  const dogSizeChangeHandler = (dogSize) => {
    setDogSize(dogSize);
  };
  const dogGenderChangeHandler = (dogGender) => {
    setDogGender(dogGender);
  };
  const dogNeutralChangeHandler = (neutral) => {
    setNeutral(neutral);
  };
  const dogAgeChangeHandler = (dogAge) => {
    setDogAge(dogAge);
  };
  const dogCommentChangeHandler = (e) => {
    const newTitle = e.target.value;
    setDogComment(newTitle);
  };

  const update = () => {
    const formData = new FormData();
    formData.append("dog_name",dogName)
    formData.append("dog_breed",dogBreed)
    formData.append("dog_size",dogSize)
    formData.append("dog_gender",dogGender)
    formData.append("neutral",neutral)
    formData.append("dog_age",dogAge)
    formData.append("dog_comment",dogComment)
    formData.append("dog_image",imgFile)
    const dogInfo = {
      dog_name: dogName,
      dog_breed: dogBreed,
      dog_size: dogSize,
      dog_gender: dogGender,
      neutral,
      dog_age: dogAge,
      dog_comment: dogComment,
    };
    dispatch(DogActions.updateDogMD(dog_id, formData));
  };

  useEffect(() => {
    dispatch(DogActions.getDogMD());
    setDogSize(dog.dog_size);
    setDogGender(dog.dog_gender);
    setNeutral(dog.neutral);
    setDogAge(dog.dog_age);
  }, [dog.dog_size, dog.dog_gender, dog.neutral, dog.dog_age]);

  return (
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
        <TopTitle>반려견 정보</TopTitle>
      </TopWrap>

      {/* 강아지 사진 */}
      <ImageWrap>
        <Preview src={imgBase64}></Preview>
        {/* <AddWrap> */}
        <AddImage
          type="file"
          name="imgFile"
          id="imgFile"
          onChange={handleChangeFile}
        />
        {/* </AddWrap> */}
      </ImageWrap>

      {/* 강아지 이름 */}
      <Filter>
        <Input
          placeholder="강아지 이름을 입력하세요. "
          onChange={dogNameChangeHandler}
          defaultValue={dog.dog_name}
        />
      </Filter>

      {/* 강아지 종 */}
      <Filter>
        <Input
          placeholder="강아지 종을 입력하세요. ex) 말티즈, 비숑..."
          defaultValue={dog.dog_breed}
          onChange={dogBreedChangeHandler}
        />
      </Filter>

      {/* 강아지 크기 */}
      <Filter>
        <Title>크기</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                value="소형견"
                name="dogSize"
                type="radio"
                id="small"
                checked={dogSize === "소형견"}
                onClick={() => dogSizeChangeHandler("소형견")}
              />
            </RadioWrap>
            <Label for="small">소형견</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                value="중형견"
                name="dogSize"
                type="radio"
                id="medium"
                checked={dogSize === "중형견"}
                onClick={() => dogSizeChangeHandler("중형견")}
              />
            </RadioWrap>

            <Label for="medium">중형견</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                value="대형견"
                name="dogSize"
                type="radio"
                id="large"
                checked={dogSize === "대형견"}
                onClick={() => dogSizeChangeHandler("대형견")}
              />
            </RadioWrap>

            <Label for="large">대형견</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 성별 */}
      <Filter>
        <Title>성별</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                name="dogGender"
                type="radio"
                id="male"
                checked={dogGender === "남"}
                onClick={() => dogGenderChangeHandler("남")}
              />
            </RadioWrap>
            <Label for="male">남</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                name="dogGender"
                type="radio"
                id="female"
                checked={dogGender === "여"}
                onClick={() => dogGenderChangeHandler("여")}
              />
            </RadioWrap>
            <Label for="female">여</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 중성화 여부 */}
      <Filter>
        <Title>중성화 여부</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                name="neutral"
                type="radio"
                id="yes"
                checked={neutral === true}
                onClick={() => dogNeutralChangeHandler(true)}
              />
            </RadioWrap>
            <Label for="yes">Y</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                name="neutral"
                type="radio"
                id="no"
                checked={neutral === false}
                onClick={() => dogNeutralChangeHandler(false)}
              />
            </RadioWrap>
            <Label for="no">N</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 나이대 */}
      <Filter>
        <Title>나이대</Title>
        <FlexWrap>
          <Flex>
            <RadioWrap>
              <Input
                name="dogAge"
                type="radio"
                id="young"
                checked={dogAge === "0~3세"}
                onClick={() => dogAgeChangeHandler("0~3세")}
              />
            </RadioWrap>
            <Label for="young">0~3세</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                name="dogAge"
                type="radio"
                id="junior"
                checked={dogAge === "4~7세"}
                onClick={() => dogAgeChangeHandler("4~7세")}
              />
            </RadioWrap>
            <Label for="junior">4~7세</Label>
          </Flex>
          <Flex>
            <RadioWrap>
              <Input
                name="dogAge"
                type="radio"
                id="senior"
                checked={dogAge === "8세 이상"}
                onClick={() => dogAgeChangeHandler("8세 이상")}
              />
            </RadioWrap>
            <Label for="senior">8세 이상</Label>
          </Flex>
        </FlexWrap>
      </Filter>

      {/* 강아지 한 줄 소개 */}
      <Filter>
        <Title> 한 줄 소개</Title>
        <Input
          placeholder="ex) 우리 집 최고 애교쟁이!"
          onChange={dogCommentChangeHandler}
          defaultValue={dog.dog_comment}
        />
      </Filter>

      {/* 수정 완료 버튼 */}
      <ButtonWrap>
        <Add onClick={update}>수정하기</Add>
      </ButtonWrap>
    </Wrap>
  );
};

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
const AddImage = styled.input`
  display: block;
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
const Input = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
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

export default EditDog;
