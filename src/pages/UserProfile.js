import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import AWS from 'aws-sdk'
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as UserActions } from "../redux/modules/user";
import edit from "../image/edit.png";
// 상단바
import TopBar from "../components/TopBar";
import UserModal from "../components/UserModal";

const EditUser = (props) => {
  
  
  const dispatch = useDispatch();
 
  // 현재 접속한 유저(보호자) 정보
  // const user = useSelector((state) => state.user?.list[0]) || "";
  const user = useSelector((state) => state.user.user);
  const _userAge = user.userAge;
  const _userGender = user.userGender;
  const _userImage = user.userImage;
  const _userNickname = user.userNickname;
  const _userLocation = user.userLocation;
  const [imgBase64, setImgBase64] = useState(_userImage); // 파일 base64
  const [imgFile, setImgFile] = useState(); //파일
  const [userNickname, setUserNickname] = useState(
    _userNickname ? _userNickname : ""
  );
  const [user_gender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userLocation,setUserLocation] = useState();


  const userNicknameChangeHandler = (e) => {
    setUserNickname(e.target.value);
  };
  const genderChangeHandler = (gender) => {
    setUserGender(gender);
  };
  const userAgeChangeHandler = (age) => {
    setUserAge(age);
  };
  const userLocationChangeHandler= (e) => {
    setUserLocation(e.target.value)
  } 

  const [modal,setModal] = useState();

   console.log(modal)
  // 뒤로가기 버튼 - 수정 취소
  const cancel = () => {
    // if (
    //   window.confirm("회원 정보 수정이 끝나지 않았습니다. 정말로 취소하십니까?")
    // ) {
    history.goBack();
    // }
  };

  // 현재 접속한 보호자의 정보 불러오기
  useEffect(() => {
    dispatch(UserActions.getUserMD());
    setUserNickname(_userNickname);
    setUserGender(_userGender);
    setUserAge(_userAge);
    setImgBase64(_userImage);
    setImgFile(_userImage);
    setUserLocation(_userLocation)
  }, [_userGender, _userAge, _userImage, _userNickname]);

  // 수정하기 버튼 = 수정 완료
  console.log(_userAge)
 

 

  const updateInfo = () => {


    console.log(userNickname, user_gender, userAge, imgFile);
    const userInfo = {
      userNickname,
      userGender:user_gender,
      userAge,
       userLocation,
    };
    dispatch(UserActions.updateUserMD(userInfo));
  };


  return (
    <>
      <Wrap>
        {/* 뒤로가기 버튼 + 회원정보 텍스트  */}
        <TopBar only_left>회원 정보 수정</TopBar>

        {/* 보호자 이미지 */}
       
        <UserWrap>
        <UserInfoLeft onClick={()=>setModal(true)} >
        <UserImg src={_userImage}  />
         <Edit >
           <img src={edit}/>
           </Edit>
           </UserInfoLeft>
           </UserWrap>
           {
             modal && <UserModal setModal={setModal} userImage={_userImage}/>
           }

        {/* 보호자 닉네임 + 성별 + 나이대 */}
        <Body>
          {/* 보호자 닉네임 */}
          <Filter>
          <Title>닉네임</Title>
            <Nickname
              placeholder="닉네임을 입력하세요"
              onChange={userNicknameChangeHandler}
              defaultValue={_userNickname}
            />
          </Filter>
          <Filter>
          <Title>사는곳(시,구,동)</Title>
            <Nickname
            
              onChange={userLocationChangeHandler}
              defaultValue={_userLocation}
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
                  checked={user_gender === "남"}
                  onClick={() => genderChangeHandler("남")}
                  name="gender"
                />
                <Label for="male">남</Label>
              </Flex>
              <Flex>
                <input
                  type="radio"
                  id="female"
                  checked={user_gender === "여"}
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
          <Add onClick={updateInfo}>수정하기</Add>
     
        </Footer>
      </Wrap>
    </>
  );
};
const UserWrap = styled.div
`
display:flex;
justify-content:center;
margin-bottom:20px;
`
const UserInfoLeft = styled.div`
  position: relative;

  width: 150px;
  height: 150px;


`;
const UserImg = styled.img`
  width: 150px;
  height: 150px;
  padding: 2px;
  background-size:cover;
  overflow:hidden;
  margin-right: 14.5px;
  border-radius: 50%;
  object-fit: cover;
`;
const Edit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 36px;
  height: 36px;
  padding: 6px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: #fff;

  img {
    width: 22px;
    height: 22px;
  }
`;
const Wrap = styled.div`
  max-width: 390px;
  padding: 0 20px;
  margin: 30px auto;
  font-size: 14px;
  text-align: center;
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
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0 auto;
  object-fit: cover;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const UploadLabel = styled.label`
  border-bottom: 1px solid black;
  padding: 10px 5px 5px 5px;
  margin: 10px;
  cursor: pointer;
`;
const AddImage = styled.input`
  /* width: 180px;
  margin: 10px 0; */
  display: none;
`;
const Body = styled.div``;
const Filter = styled.div`
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 20px;
  text-align: left;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  color: #888;
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
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const UserAge = styled.input``;
const Footer = styled.div`
  /* display: flex;
  justify-content: space-between; */
  margin: 40px 0;
`;
const Add = styled.button`
  width: 160px;
  height: 48px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default EditUser;
