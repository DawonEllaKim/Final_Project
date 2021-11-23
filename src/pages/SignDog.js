import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as DogActions } from "../redux/modules/sign";
import { dogBreedCheck } from "../shared/check";

import TopBar from "../components/TopBar";

// 강아지 이미지 기본 값
import defaultDog from "../image/defaultImage.png";
import { ElectricScooterSharp } from "@mui/icons-material";

const SignDog = (props) => {
  const dispatch = useDispatch();

  //jsonserver 데이터 맞추기 위한 코드
  const signUser = useSelector((state) => state.sign.user);
  console.log(signUser);
  const [imgBase64, setImgBase64] = useState(defaultDog ? defaultDog : ""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [dogGender, setDogGender] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [neutral, setNeutral] = useState("1");
  const [dogComment, setDogComment] = useState("");
  
  const [alertDogGender,setAlertDogGender] = useState("")
  const [alertDogName,setAlertDogName] = useState("")
  const [alertDogSize,setAlertDogSize] = useState("")
  const [alertDogBreed,setAlertDogBreed] = useState("")
  const [alertDogAge,setAlertDogAge] = useState("")
  const [alertNeutral,setAlertNeutral] = useState("")
  const [alertDogComment,setAlertDogComment] = useState("")
  const [alertDogImage, setAlertDogImage] = useState("")
  const alertHandlerDG = () => {
    if(!dogGender)
    setAlertDogGender("강아지 성별을 입력해주세요!")
    else 
    setAlertDogGender();
  }
  const alertHandlerDN = () => {
    if(!dogName)
    setAlertDogName("강아지 이름을 입력해주세요!")
    else 
    setAlertDogName();
  }
  const alertHandlerDB = () => {
    if(!dogBreed)
    setAlertDogBreed("강아지 품종을 입력해주세요!")
    else 
    setAlertDogBreed();
  }
  const alertHandlerDA = () => {
    if(!dogAge)
    setAlertDogAge("강아지 나이를 입력해주세요!")
    else 
    setAlertDogAge();
  }
  const alertHandlerN = () => {
    if(neutral===true||neutral===false)
    setAlertNeutral();
    else 
    setAlertNeutral("강아지 성을 입력해주세요!")
  }
  const alertHandlerDC = () => {
    if(!dogComment)
    setAlertDogComment("강아지 소개를 써주세요!")
    else 
    setAlertDogComment();
  }
  const alertHandlerDS = () => {
    if(!dogSize)
    setAlertDogSize("강아지 크기를 입력해주세요!")
    else
    setAlertDogSize()
  }


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
  const submitDogInfo = () => {
    if(imgBase64==defaultDog)
    {
      setAlertDogImage("강아지 이미지가 입력해주세요!")
    }
    else
    {
      setAlertDogImage("")
    }
   
    alertHandlerDA();
    alertHandlerDB();
    alertHandlerDC();
    alertHandlerDG();
    alertHandlerDN();
    alertHandlerN();
    alertHandlerDS();
  
    if (!dogBreedCheck(dogBreed)) {
      setAlertDogBreed("강아지 종은 한글만 입력 가능합니다");
     
    }
    if (
      dogGender === "" ||
      dogName === "" ||
      dogSize === "" ||
      dogBreed === "" ||
      dogAge === "" ||
      neutral === "" ||
      dogComment === ""
    ) {
     
      return;
    }

    const formData = new FormData();
    formData.append("dogGender", dogGender);
    formData.append("dogName", dogName);
    formData.append("dogSize", dogSize);
    formData.append("dogBreed", dogBreed);
    formData.append("dogAge", dogAge);
    formData.append("neutral", neutral);
    formData.append("dogComment", dogComment);
    formData.append("dogImage", imgFile);

    dispatch(DogActions.signDogAPI(formData));
  };
  return (
    <>
      <Wrap>
        <TopBar only_left>반려견 등록</TopBar>

        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <AddWrap>
            <UploadLabel for="imgFile">사진 업로드</UploadLabel>
            <AddImage
              type="file"
              name="imgFile"
              id="imgFile"
              onChange={handleChangeFile}
            ></AddImage>
          </AddWrap>
        </ImageWrap>
        <ImageAlert>{alertDogImage?alertDogImage:""}</ImageAlert>
        <Input>
          <InputText
            placeholder="강아지 이름 입력 "
            onChange={dogNameChangeHandler}
          ></InputText>
        </Input>
        <Alert>{alertDogName?alertDogName:""}</Alert>
        <Input>
          <InputText
            placeholder="강아지 종 입력 ex) 말티즈, 비숑..."
            onChange={dogBreedChangeHandler}
          ></InputText>
        </Input>
        <Alert>{alertDogBreed?alertDogBreed:""}</Alert>
        <Input>
          <Title>크기</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogSize
                  type="radio"
                  id="s"
                  checked={dogSize === "소형견"}
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
                  checked={dogSize === "중형견"}
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
                  checked={dogSize === "대형견"}
                  onClick={() => dogSizeChangeHandler("대형견")}
                />
              </RadioWrap>

              <Label htmlFor="l">대형견</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Alert>{alertDogSize?alertDogSize:""}</Alert>
        <Input>
          <Title>성별</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogGender
                  type="radio"
                  id="b"
                  checked={dogGender === "남"}
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
                  checked={dogGender === "여"}
                  onClick={() => dogGenderChangeHandler("여")}
                />
              </RadioWrap>

              <Label htmlFor="g">여</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Alert>{alertDogGender?alertDogGender:""}</Alert>
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
        <Alert>{alertNeutral?alertNeutral:""}</Alert>
        <Input>
          <Title>나이대</Title>
          <FlexWrap>
            <Flex>
              <RadioWrap>
                <DogAge
                  type="radio"
                  id="young"
                  checked={dogAge === "0~3세"}
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
                  checked={dogAge === "4~7세"}
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
                  checked={dogAge === "8세 이상"}
                  onClick={() => dogAgeChangeHandler("8세 이상")}
                />
              </RadioWrap>

              <Label htmlFor="senior">8세 이상</Label>
            </Flex>
          </FlexWrap>
        </Input>
        <Alert>{alertDogAge?alertDogAge:""}</Alert>
        <Input style={{ backgroundColor: "#FAF7CE" }}>
          <Title> 강아지 한 줄 소개</Title>
          <InputText
            placeholder="ex) 우리 집 최고 애교쟁이!"
            onChange={dogCommentChangeHandler}
            style={{ backgroundColor: "#FAF7CE" }}
          ></InputText>
        </Input>
        <Alert>{alertDogComment?alertDogComment:""}</Alert>
        <ButtonWrap>
          <button onClick={submitDogInfo}>등록하기</button>
        </ButtonWrap>
      </Wrap>
    </>
  );
};
const Alert =styled.div`
color: #FF5252;
display:flex;
justify-content:flex-start;
`
const ImageAlert =styled.div`
color: #FF5252;
display:flex;
justify-content:center;
`
const Wrap = styled.div`
  text-align: center;

  padding: 0 5%;
  margin: 0 auto;
  font-size: 14px;
`;

const Input = styled.div`
  box-sizing: border-box;
  padding: 12px 24px;
  border-radius: 15px;
  margin: 10px 0px;
  text-align: left;
  font-size: 16px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  color: #888;
`;

const ImageWrap = styled.div``;
const Preview = styled.img`
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border-radius: 14px;
  margin: auto;
  object-fit: cover;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
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
const UploadLabel = styled.label`
  padding: 5px;

  cursor: pointer;
`;
const AddImage = styled.input`
  /* width: 180px;
  margin: 10px 0; */
  display: none;
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
  padding-top: 4px;
  font-size: 14px;
`;

const DogSize = styled.input``;
const DogGender = styled.input``;
const DogNeutral = styled.input``;
const DogAge = styled.input``;

const ButtonWrap = styled.div`
  button {
    width: 160px;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;
export default SignDog;
