import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";

const MyProfile = () => {
  const dispatch = useDispatch();

  // 강아지 정보
  // const dogInfo = useSelector((state) => state.user.list[0].dogInfo);
  // const dogName = dogInfo.dogName;
  // const dogGender = dogInfo.dogGender;
  // const dogBreed = dogInfo.dogBreed;
  // const dogSize = dogInfo.dogSize;
  // const dogAge = dogInfo.dogAge;
  // const neutral = dogInfo.neutral;
  // const dogComment = dogInfo.dogComment;
  // const dogImage = dogInfo.dogImage;

  // 보호자 정보
  // const ownerInfo = useSelector((state) => state.user.list[0].ownerInfo);
  // console.log(ownerInfo);

  // const ownerAge = ownerInfo.ownerAge;
  // const ownerGender = ownerInfo.ownerGender;
  // const ownerImage = ownerInfo.ownerImage;
  // const ownerName = ownerInfo.ownerName;

  React.useEffect(() => {
    dispatch(userActions.getUserMD());
  }, []);
  // 여기공부

  return (
    <div>
      <Head>
        <div>마이 프로필~</div>
        <button>edit</button>
      </Head>
      {/* <Body>
        <Dog>
          <ImageBox>
            <Image src={dogImage} />
            <input type="file" />
          </ImageBox>
          <DogInfo>
            강아지
            <DogName>
              <span>이름</span>
              <input defaultValue={dogName} style={{ border: "none" }} />
            </DogName>
            <div>
              <span>성별</span>
              <input type="radio" name="dogGender" />
              <input type="radio" name="dogGender" />
            </div>
            <div>
              <span>종류</span>
              <input defaultValue={dogBreed} style={{ border: "none" }} />
            </div>
            <div>
              <span>강아지 크기</span>
              <select>
                <option>소형견</option>
                <option>대형견</option>
                <option>중형견</option>
              </select>
            </div>
            <div>
              <span>나이</span>
              <select>
                <option>0~3세</option>
                <option>4~7세</option>
                <option>8세 이상</option>
              </select>
            </div>
            <div>
              <span>중성화 여부</span>
              <input type="radio" name="neutralization" />
              <input type="radio" name="neutralization" />
            </div>
            <div>
              강아지 한줄평
              <input defaultValue={dogComment} style={{ border: "none" }} />
            </div>
          </DogInfo>
        </Dog>

        <Owner>
          <ImageBox>
            <Image src={ownerImage} />
            <input type="file" />
          </ImageBox>
          <OwnerInfo>
            <div>
              보호자이름
              <input defaultValue={ownerName} style={{ border: "none" }} />
            </div>
            <div>
              성별
              <input type="radio" name="ownerGender" />
              <input type="radio" name="ownerGender" />
            </div>
            <div>
              나이
              <select>
                <option>10대</option>
                <option>20대</option>
                <option>30대</option>
                <option>40대</option>
                <option>50대 이상</option>
              </select>
            </div>
          </OwnerInfo>
        </Owner>
      </Body> */}

      <div>
        <button>편집 완료</button>
      </div>
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
  display: flex;
  flex-direction: column;
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
`;
export default MyProfile;
