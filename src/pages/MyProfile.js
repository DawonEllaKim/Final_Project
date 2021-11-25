import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

const MyProfile = () => {
  const dispatch = useDispatch();
  // 편집모드인 지 아닌지?
  const [editMode, setEditMode] = useState(false);

  const [gender, setGender] = useState("");
  const [neutralized, setNeutralized] = useState("");

  const male = (e) => {
    setGender("male");
  };
  const female = (e) => {
    setGender("female");
  };
  const neutralY = (e) => {
    setNeutralized(true);
  };
  const neutralN = (e) => {
    setNeutralized(false);
  };

  // 강아지 정보
  const dogInfo = useSelector((state) => state.user.list[0]?.dog) || "";
  // console.log(useSelector((state) => state.user));
  const dogName = dogInfo.dogName;
  const dogGender = dogInfo.dogGender;
  const dogBreed = dogInfo.dogBreed;
  const dogSize = dogInfo.dogSize;
  const dogAge = dogInfo.dogAge;
  const neutral = dogInfo.neutral;
  const dogComment = dogInfo.dogComment;
  const dogImage = dogInfo.dogImage;

  // 보호자 정보
  const ownerInfo = useSelector((state) => state.user.list[0]?.owner) || "";
  // console.log(ownerInfo);
  const ownerAge = ownerInfo.ownerAge;
  const ownerGender = ownerInfo.ownerGender;
  const ownerImage = ownerInfo.ownerImage;
  const ownerName = ownerInfo.ownerName;
  // console.log(ownerName);

  // 강아지 크기 필터
  const [dogSizeActive, setDogSizeActive] = useState(false);
  const [dogSizeSelected, setDogSizeSelected] = useState(dogSize);
  const dogSizeOptions = ["소형견", "중형견", "대형견"];

  // 강아지 나이 필터
  const [dogAgeActive, setDogAgeActive] = useState(false);
  const [dogAgeSelected, setDogAgeSelected] = useState(dogAge);
  const dogAgeOptions = ["0세~3세", "4세~7세", "8세 이상"];

  // 보호자 나이 필터
  const [ownerAgeActive, setOwnerAgeActive] = useState(false);
  const [ownerAgeSelected, setOwnerAgeSelected] = useState(ownerAge);
  const ownerAgeOptions = ["10대", "20대", "30대", "40대", "50대", "60대"];

  const submitEdit = () => {
    setEditMode(!editMode);
    // dispatch(userActions.updateUser(user));
  };
  const [image, setImage] = useState("");

  // 이미지 프리뷰
  const fileInput = React.useRef();
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  React.useEffect(() => {
    dispatch(userActions.getUserMD());
  }, []);

  // console.log(useSelector((state) => state));

  return editMode ? (
    // 편집 모드 edit === false
    <div>
      <Head>
        <h1>마이 프로필~</h1>
      </Head>
      <Body>
        <Owner>
          <ImageBox>
            <Image src={ownerImage} />
            <input type="file" />
          </ImageBox>
          <OwnerInfo>
            <div>
              <span>보호자 이름</span>
              <input defaultValue={ownerName} />
            </div>
            <div>
              <span>성별</span>
              <input
                type="radio"
                name="ownerGender"
                id="남"
                value="남"
                defaultChecked={ownerGender === "남"}
                onChange={male}
              />
              <label for="남">남자</label>
              <input
                type="radio"
                name="ownerGender"
                id="여"
                value="여"
                defaultChecked={ownerGender === "여"}
                onChange={female}
              />
              <label for="여">여자</label>
            </div>
            <div>
              <span>나이</span>
              {/* 보호자 나이 */}
              <Dropdown>
                <DropdownBtn
                  onClick={(e) => setOwnerAgeActive(!ownerAgeActive)}
                >
                  {ownerAgeSelected ? ownerAgeSelected : ownerAge}
                </DropdownBtn>
                {ownerAgeActive && (
                  <DropdownContent>
                    {ownerAgeOptions.map((ownerAgeOption) => (
                      <DropdownItem
                        onClick={(e) => {
                          setOwnerAgeSelected(ownerAgeOption);
                          setOwnerAgeActive(false);
                        }}
                      >
                        {ownerAgeOption}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </Dropdown>
            </div>
          </OwnerInfo>
        </Owner>
        <Dog>
          <ImageBox>
            <Image src={image ? image : dogImage} />
            <input type="file" />
          </ImageBox>
          <DogInfo>
            강아지
            <DogName>
              <span>이름</span>
              <input defaultValue={dogName} />
            </DogName>
            <div>
              <span>성별</span>
              <input
                type="radio"
                name="dogGender"
                id="남"
                value="남"
                defaultChecked={dogGender === "남"}
                onChange={male}
              />
              <label for="남">남아</label>
              <input
                type="radio"
                name="dogGender"
                id="여"
                value="여"
                defaultChecked={dogGender === "여"}
                onChange={female}
              />
              <label for="여">여아</label>
            </div>
            <div>
              <span>종류</span>
              <input defaultValue={dogBreed} />
            </div>
            <div>
              <span>강아지 크기</span>
              {/* 강아지크기 */}
              <Dropdown>
                <DropdownBtn onClick={(e) => setDogSizeActive(!dogSizeActive)}>
                  {dogSizeSelected ? dogSizeSelected : dogSize}
                </DropdownBtn>
                {dogSizeActive && (
                  <DropdownContent>
                    {dogSizeOptions.map((dogSizeOption) => (
                      <DropdownItem
                        onClick={(e) => {
                          setDogSizeSelected(dogSizeOption);
                          setDogSizeActive(false);
                        }}
                      >
                        {dogSizeOption}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </Dropdown>
            </div>
            <div>
              <span>나이</span>
              {/* 나이 */}
              <Dropdown>
                <DropdownBtn onClick={(e) => setDogAgeActive(!dogAgeActive)}>
                  {dogAgeSelected ? dogAgeSelected : dogAge}
                </DropdownBtn>
                {dogAgeActive && (
                  <DropdownContent>
                    {dogAgeOptions.map((dogAgeOption) => (
                      <DropdownItem
                        onClick={(e) => {
                          setDogAgeSelected(dogAgeOption);
                          setDogAgeActive(false);
                          console.log(dogAgeOption);
                        }}
                      >
                        {dogAgeOption}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                )}
              </Dropdown>
            </div>
            <div>
              <span>중성화 여부</span>
              <input
                type="radio"
                name="neutralization"
                id="y"
                value="y"
                defaultChecked={neutral === true}
                onChange={neutralY}
              />
              <label for="y">Yes</label>
              <input
                type="radio"
                name="neutralization"
                id="n"
                value="n"
                defaultChecked={neutral === false}
                onChange={neutralN}
              />
              <label for="y">No</label>
            </div>
            <div>
              강아지 한줄평
              <input defaultValue={dogComment} />
            </div>
          </DogInfo>
        </Dog>
      </Body>
      <div>
        <button onClick={submitEdit}>편집 완료</button>
      </div>
    </div>
  ) : (
    // 일반 모드 edit === false
    <div>
      <button onClick={() => history.goBack()}>뒤로가기(임시)</button>
      <Head>
        <h1>마이 프로필~</h1>
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          edit
        </button>
      </Head>
      <Body>
        <Owner>
          <ImageBox>
            <Image src={ownerImage} />
          </ImageBox>
          <OwnerInfo>
            <div>
              <span>보호자 이름</span> <span>{ownerName}</span>
            </div>
            <div>
              <span>성별</span>
              <span>{dogGender ? "남자" : "여자"}</span>
            </div>
            <div>
              <span>나이</span>
              <span>{ownerAge}</span>
            </div>
          </OwnerInfo>
        </Owner>
        <Dog>
          <ImageBox>
            <Image src={dogImage} />
          </ImageBox>
          <DogInfo>
            강아지
            <DogName>
              <span>이름</span>
              <span>{dogName}</span>
            </DogName>
            <div>
              <span>성별</span>
              <span>{dogGender ? "남아" : "여아"}</span>
            </div>
            <div>
              <span>종류</span>
              <span>{dogBreed}</span>
            </div>
            <div>
              <span>강아지 크기</span>
              <span>{dogSize}</span>
            </div>
            <div>
              <span>나이</span>
              <span>{dogAge}</span>
            </div>
            <div>
              <span>중성화 여부</span>
              <span>{neutral ? "yes" : "no"}</span>
            </div>
            <div>
              <span>강아지 한줄평</span>
              <span>{dogComment}</span>
            </div>
          </DogInfo>
        </Dog>
      </Body>
    </div>
  );
};

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Body = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;
  margin: auto;
  padding: 5%;
`;
const Dog = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 100px;
  border: 1px solid black;
`;
const DogInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;
const DogName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Owner = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
`;
const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: pink;
  object-fit: cover;
`;

// 드롭다운 필터를 위한 스타일
const Dropdown = styled.div`
  width: 100px;
  margin: 0 20px;
  /* position: relative; */
`;
const DropdownBtn = styled.button`
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  cursor: pointer;
`;
const DropdownContent = styled.div`
  padding: 15px;
  background-color: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: 500;
  color: #333;
  width: 95%;
`;
const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;
export default MyProfile;
