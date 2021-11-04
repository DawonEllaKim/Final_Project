import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as DogActions } from "../redux/modules/sign";
import { dogBreedCheck } from '../shared/check'

const SignDog = (props) => {
  const dispatch = useDispatch();

//jsonserver 데이터 맞추기 위한 코드
  const signUser = useSelector((state)=>state.sign.user)
  console.log(signUser)
  
  const submitDogInfo = () => {
    if(!dogBreedCheck(dog_breed)){
      window.alert('강아지 종은 한글,영문 형식만 입력 가능합니다')
      return;
    }

    if( dog_gender === '' || 
        dog_name === '' || 
        dog_size === '' || 
        dog_breed === '' || 
        dog_age === '' || 
        neutral === '' ||
        dog_comment === ''
      ){
      window.alert('입력하지 않은 값이 있습니다.')
      return;
    }
     
    const formData = new FormData();
    formData.append("dog_gender",dog_gender);
    formData.append("dog_name",dog_name);
    formData.append("dog_size",dog_size);
    formData.append("dog_breed",dog_breed);
    formData.append("dog_age",dog_age);
    formData.append("neutral",neutral);
    formData.append("dog_comment",dog_comment);
    formData.append("dog_image",imgFile);
    
    // let DogInfo = {
    //   dog_gender,
    //   dog_name,
    //   dog_size,
    //   dog_breed,
    //   dog_age,
    //   neutral,
    //   dog_comment
    // }
    // Object.assign(DogInfo,signUser)
    dispatch(
      DogActions.signDogAPI(
       formData
      )
    )
  }

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
          <TopTitle>반려견 등록하기</TopTitle>
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
            {/* <AddBtn>이미지 등록하기</AddBtn> */}
          </AddWrap>
        </ImageWrap>
        <Filter>
          <DogName
            placeholder="강아지 이름 입력 "
            onChange={dogNameChangeHandler}
          ></DogName>
        </Filter>
        <Filter>
          <DogBreed
            placeholder="강아지 종 입력 ex) 말티즈, 비숑..."
            onChange={dogBreedChangeHandler}
          ></DogBreed>
        </Filter>
        <Filter>
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
        </Filter>
        <Filter>
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
        </Filter>
        <Filter>
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
        </Filter>
        <Filter>
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
        </Filter>
        <Filter>
          <Title> 한 줄 소개</Title>
          <DogComment
            placeholder="ex) 우리 집 최고 애교쟁이!"
            onChange={dogCommentChangeHandler}
          ></DogComment>
        </Filter>
        <ButtonWrap>
          <Add
            onClick={submitDogInfo
              
            }
          >
            가입하기
          </Add>
          <Cancle
            onClick={() => {
              history.goBack();
            }}
          >
            취소하기
          </Cancle>
        </ButtonWrap>
      </Wrap>
    </>
  );
};

export default SignDog;

const Wrap = styled.div`
  text-align:center;
  max-width: 390px;
  padding: 0 20px;
  margin: 30px auto;
  font-size: 14px;
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

const DogName = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;

const DogBreed = styled.input`
  width: 100%;
  border: 0;
  background-color: #ebebeb;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;

const DogSize = styled.input``;
const DogGender = styled.input``;
const DogNeutral = styled.input``;
const DogAge = styled.input``;

const DogComment = styled.input`
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
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: #c4c4c4;
  cursor: pointer;
`;
const Cancle = styled.button`
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background-color: #c4c4c4;
  cursor: pointer;
`;
