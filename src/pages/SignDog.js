import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import e from "cors";
import { toast } from "react-toastify";

// 컴포넌츠
import TopBar from "../components/TopBar";
import SignDogSuccessModal from "../components/Modal/SignDogSuccessModal";
import Spinner from "../shared/Spinner";

// 유효성 검사
import { dogBreedCheck } from "../shared/check";

// 리덕스
import { actionCreators as DogActions } from "../redux/modules/sign";

// 아이콘 + 이미지
import defaultDog from "../image/defaultImage.png";
import { MdCloudUpload } from "react-icons/md";
toast.configure();

const SignDog = (props) => {
  const dispatch = useDispatch();

  //jsonserver 데이터 맞추기 위한 코드
  const signUser = useSelector((state) => state.sign.user);
  // console.log(signUser);
  const [imgBase64, setImgBase64] = useState(defaultDog ? defaultDog : ""); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [dogGender, setDogGender] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [neutral, setNeutral] = useState("");
  const [dogComment, setDogComment] = useState("");

  const [alertDogImage, setAlertDogImage] = useState("");
  const [alertDogGender, setAlertDogGender] = useState("");
  const [alertDogName, setAlertDogName] = useState("");
  const [alertDogSize, setAlertDogSize] = useState("");
  const [alertDogBreed, setAlertDogBreed] = useState("");
  const [alertDogAge, setAlertDogAge] = useState("");
  const [alertNeutral, setAlertNeutral] = useState("");
  const [alertDogComment, setAlertDogComment] = useState("");

  const [alertDogImageColor, setAlertDogImageColor] = useState("");
  const [alertDogGenderColor, setDogGenderColor] = useState("");
  const [alertDogNameColor, setDogNameColor] = useState("");
  const [alertDogSizeColor, setDogSizeColor] = useState("");
  const [alertDogBreedColor, setDogBreedColor] = useState("");
  const [alertDogAgeColor, setDogAgeColor] = useState("");
  const [alertNeutralColor, setNeutralColor] = useState("");
  const [alertDogCommentColor, setDogCommentColor] = useState("");

  const [dogNameStatus, setDogNameStatus] = useState("");
  const [dogBreedStatus, setDogBreedStatus] = useState("");
  const [dogSizeStatus, setDogSizeStatus] = useState("");
  const [dogGenderStatus, setDogGenderStatus] = useState("");
  const [neutralStatus, setNeutralStatus] = useState("");
  const [dogAgeStatus, setDogAgeStatus] = useState("");
  const [dogCommentStatus, setDogCommentStatus] = useState("");

  const [loading, setLoading] = useState();
  const [modal, setModal] = useState();
  const is_loading = useSelector((state) => state.sign.is_loading);
  const dog_modal = useSelector((state) => state.sign.dog_modal);

  useEffect(() => {
    // dispatch(postActions.getAllMD());

    setLoading(is_loading);
    setLoading(true);
    setModal(dog_modal);
  }, [is_loading, dog_modal]);

  useEffect(() => {
    // 이미지 등록 확인
    if (imgBase64 !== defaultDog) {
      setAlertDogImageColor("green");
      setAlertDogImage("✔︎ 강아지 사진이 등록되었습니다.");
    }

    // 강아지 이름 입력 확인
    if (dogName === "" && dogNameStatus === false) {
      setDogNameColor("red");
      setAlertDogName("✔︎ 강아지 이름을 입력해 주세요.");
    } else if (dogName === "") {
      setAlertDogName("");
    } else if (dogName) {
      setDogNameColor("green");
      setAlertDogName("✔︎ 강아지 이름이 입력되었습니다.");
    }

    // 강아지 종 입력 확인
    if (dogBreed === "" && dogBreedStatus === false) {
      setDogBreedColor("red");
      setAlertDogBreed("✔︎ 강아지 종을 입력해 주세요. 예) 말티즈, 비숑");
    } else if (dogBreed === "") {
      setAlertDogBreed("");
    } else if (dogBreed !== "" && dogBreedCheck(dogBreed) === false) {
      setDogBreedColor("red");
      setAlertDogBreed("✔︎ 강아지 종은 한글만 입력 가능합니다.");
    } else if (dogBreed) {
      setDogBreedColor("green");
      setAlertDogBreed("✔︎ 강아지 종이 입력되었습니다.");
    }

    // 강아지 크기 확인
    if (dogSize === "" && dogSizeStatus === false) {
      setDogSizeColor("red");
      setAlertDogSize("✔︎ 크기를 선택해 주세요.");
    } else if (dogSize === "") {
      setAlertDogSize("");
    } else if (dogSize) {
      setDogSizeColor("green");
      setAlertDogSize("✔︎ 크기가 선택되었습니다.");
    }

    // 강아지 성별 확인
    if (dogGender === "" && dogGenderStatus === false) {
      setDogGenderColor("red");
      setAlertDogGender("✔︎ 성별을 선택해 주세요.");
    } else if (dogGender === "") {
      setAlertDogGender("");
    } else if (dogGender) {
      setDogGenderColor("green");
      setAlertDogGender("✔︎ 성별이 선택되었습니다.");
    }

    // 강아지 중성화 여부 확인
    if (neutral === "" && neutralStatus === false) {
      setNeutralColor("red");
      setAlertNeutral("✔︎ 중성화 여부를 선택해 주세요.");
    } else if (neutral === "") {
      setAlertNeutral("");
    } else if (neutral) {
      setNeutralColor("green");
      setAlertNeutral("✔︎ 중성화 여부가 선택되었습니다.");
    }

    // 강아지 나이대 확인
    if (dogAge === "" && dogAgeStatus === false) {
      setDogAgeColor("red");
      setAlertDogAge("✔︎ 나이대를 선택해 주세요.");
    } else if (dogAge === "") {
      setAlertDogAge("");
    } else if (dogAge) {
      setDogAgeColor("green");
      setAlertDogAge("✔︎ 나이대가 선택되었습니다.");
    }

    // 강아지 한줄 소개 확인
    if (dogComment === "" && dogCommentStatus === false) {
      setDogCommentColor("red");
      setAlertDogComment("✔︎ 강아지 소개를 입력해 주세요.");
    } else if (dogComment === "") {
      setAlertDogComment("");
    } else if (dogComment) {
      setDogCommentColor("green");
      setAlertDogComment("✔︎ 강아지 소개가 입력되었습니다.");
    }
  }, [
    imgBase64,
    dogGender,
    dogName,
    dogSize,
    dogBreed,
    dogAge,
    neutral,
    dogComment,

    alertDogName,
    alertDogGender,
    alertDogName,
    alertDogSize,
    alertDogBreed,
    alertDogAge,
    alertNeutral,
    alertDogComment,

    alertDogImageColor,
    alertDogGenderColor,
    alertDogNameColor,
    alertDogSizeColor,
    alertDogBreedColor,
    alertDogAgeColor,
    alertNeutralColor,
    alertDogCommentColor,

    dogNameStatus,
    dogBreedStatus,
    dogSizeStatus,
    dogGenderStatus,
    neutralStatus,
    dogAgeStatus,
    dogCommentStatus,
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

  const dogNameChangeHandler = (e) => {
    const newTitle = e.target.value;
    setDogName(newTitle);
  };

  const dogBreedChangeHandler = (e) => {
    const newTitle = e.target.value;
    setDogBreed(newTitle);
  };

  const dogSizeChangeHandler = (size) => {
    setDogSize(size);
  };

  const dogGenderChangeHandler = (gender) => {
    setDogGender(gender);
  };

  const dogNeutralChangeHandler = (neutral) => {
    setNeutral(neutral);
  };

  const dogAgeChangeHandler = (age) => {
    setDogAge(age);
  };

  const dogCommentChangeHandler = (e) => {
    const newTitle = e.target.value;
    setDogComment(newTitle);
  };
  const submitDogInfo = () => {
    // 이미지가 공백일때
    if (imgBase64 == defaultDog) {
      setAlertDogImageColor("red");
      setAlertDogImage("✔︎ 강아지 사진을 등록해 주세요.");
    } else {
      setAlertDogImage("");
    }

    // 강아지 이름이 공백일때
    if (dogName == "") {
      setDogNameStatus(false);
    }

    //  강아지 종 공백
    if (dogBreed == "") {
      setDogBreedStatus(false);
    }

    // 강아지 크기 공백
    if (dogSize == "") {
      setDogSizeStatus(false);
    } else {
    }
    // 강아지 성별 공백
    if (dogGender == "") {
      setDogGenderStatus(false);
    } else {
    }
    // 강아지 중성화 여부 공백
    if (neutral == "") {
      setNeutralStatus(false);
    } else {
    }
    // 강아지 나이대 공백
    if (dogAge == "") {
      setDogAgeStatus(false);
    } else {
    }
    // 강아지 한줄 소개 공백
    if (dogComment == "") {
      setDogCommentStatus(false);
    }

    // 정보가 하나라도 입력이 되지 않았으면 경고창 보여줌
    if (
      imgBase64 == defaultDog ||
      dogName === "" ||
      dogBreed === "" ||
      dogSize === "" ||
      dogGender === "" ||
      neutral === "" ||
      dogAge === "" ||
      dogComment === ""
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

    if (!dogBreedCheck(dogBreed)) {
      setDogBreedColor("red");
      // setAlertDogBreed("✔︎ 강아지 종은 한글만 입력 가능합니다.");
      toast.error("강아지 종은 한글만 입력 가능합니다.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
        // hideProgressBar: true,
      });
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
    setLoading(false);
    dispatch(DogActions.signDogAPI(formData));
  };

  if (!loading) {
    return <Spinner />;
  }
  return (
    <>
      {modal ? <SignDogSuccessModal setModal={setModal} /> : ""}
      <Wrap>
        <TopBar dogSign>반려견 등록</TopBar>

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
            ></AddImage>
          </AddWrap>
        </ImageWrap>
        <ImageAlert
          style={{ color: alertDogImageColor === "red" ? "red" : "green" }}
        >
          {alertDogImage ? alertDogImage : ""}
        </ImageAlert>
        <Input>
          <InputText
            placeholder="강아지 이름 "
            onChange={dogNameChangeHandler}
          ></InputText>
        </Input>
        <Alert style={{ color: alertDogNameColor === "red" ? "red" : "green" }}>
          {alertDogName ? alertDogName : ""}
        </Alert>
        <Input>
          <InputText
            placeholder="강아지 종 ex) 말티즈, 비숑..."
            onChange={dogBreedChangeHandler}
          ></InputText>
        </Input>
        <Alert
          style={{ color: alertDogBreedColor === "red" ? "red" : "green" }}
        >
          {alertDogBreed ? alertDogBreed : ""}
        </Alert>
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
        <Alert style={{ color: alertDogSizeColor === "red" ? "red" : "green" }}>
          {alertDogSize ? alertDogSize : ""}
        </Alert>
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
        <Alert
          style={{ color: alertDogGenderColor === "red" ? "red" : "green" }}
        >
          {alertDogGender ? alertDogGender : ""}
        </Alert>
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
        <Alert style={{ color: alertNeutralColor === "red" ? "red" : "green" }}>
          {alertNeutral ? alertNeutral : ""}
        </Alert>
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
        <Alert style={{ color: alertDogAgeColor === "red" ? "red" : "green" }}>
          {alertDogAge ? alertDogAge : ""}
        </Alert>
        <Input style={{ backgroundColor: "#FAF7CE" }}>
          <Title> 강아지 한 줄 소개</Title>
          <InputText
            placeholder="ex) 우리 집 최고 애교쟁이!"
            onChange={dogCommentChangeHandler}
            style={{ backgroundColor: "#FAF7CE" }}
          ></InputText>
        </Input>
        <Alert
          style={{ color: alertDogCommentColor === "red" ? "red" : "green" }}
        >
          {alertDogComment ? alertDogComment : ""}
        </Alert>
        <ButtonWrap>
          <button onClick={submitDogInfo}>등록하기</button>
        </ButtonWrap>
      </Wrap>
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

  font-size: 12px;

  margin-left: 20px;
`;
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
  width: 150px;
  padding: 5px 5px 5px 5px;
  margin: 10px auto;
  cursor: pointer;
  display: flex;
  border-radius: 24px;
  justify-content: center;
  /* background-color: #9de8df; */
  border: 1px solid #c4c4c4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
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
  margin: 30px 0 0 0;

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
