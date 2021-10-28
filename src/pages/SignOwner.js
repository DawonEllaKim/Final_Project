import React, {useState} from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as OwnerActions } from '../redux/modules/user';
const SignOwner = () => {
    const dispatch = useDispatch();
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    
    const [ownerName, setOwnerName] = useState("")
    const [ownerGender, setOwnerGender] = useState("")
    const [ownerAge, setOwnerAge] = useState("")

    const ownerNameChangeHandler = (e) => {
        const newTitle= e.target.value
        console.log(newTitle)
        setOwnerName(newTitle)
    }
    const ownerGenderChangeHandler = (e) => {
        const newTitle= e.target.value
        console.log(newTitle)
        setOwnerGender(newTitle)
    }
    const ownerAgeChangeHandler = (e) => {
        const newTitle= e.target.value
        console.log(newTitle)
        setOwnerAge(newTitle)
    }

    const handleChangeFile = (event) => {
      event.preventDefault();
      let reader = new FileReader();
  
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          setImgBase64(base64.toString()); 
        }
      }
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]); 
        setImgFile(event.target.files[0]); 
        
    }
  }

//   const SubmitOwner=() => {
//     const formData = new FormData();
//     formData.append("ownerName",ownerName)
//     formData.append("ownerGender",ownerGender)
//     formData.append("ownerAge",ownerAge)
//     formData.append("ownerImage",imgFile)
//     dispatch(OwnerActions.signOwnerAPI(formData))
//   }

 
    return (
      <FlexBox>
        <Preview>
        <Image src={imgBase64}></Image>
        <input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>
       </Preview>
        <div>
          <DogGender>보호자 이름
          <DogTitleInput placeholder="보호자 이름을 입력하세요" onChange={ownerNameChangeHandler}/>
          </DogGender>
           
           <DogGender>
             성별
          <input type="checkbox" name="check1" id="check1" value="남" class="checkbox1"  onChange={ownerGenderChangeHandler}/>
    <label for="check1">남</label>
    <input type="checkbox" name="radio1" id="radio1" value="여" class="checkbox1"  onChange={ownerGenderChangeHandler}/>
    <label for="radio1">여</label>
          </DogGender>
          <DogGender>
         나이
         <select name="pets" id="pet-select"   onChange={ownerAgeChangeHandler}>
    <option value="">나이를 선택하세요</option>
    <option value="20대">20대</option>
    <option value="30대">30대</option>
    <option value="40대">40대</option>
  
</select>

         </DogGender>
         
     
          <DogGender>
          <Button>취소</Button>
         <Button onClick={()=>dispatch(OwnerActions.signOwnerAPI(ownerName,ownerGender,ownerAge,imgFile))}>제출</Button>
        </DogGender>
        
        </div>
        </FlexBox>
    );
  }
export default SignOwner
const FlexBox= styled.div
`
margin: 20% 0;
display:flex;
justify-content:center;
align-items: center;
`

const Preview = styled.div
`
width:450px;
height: 300px;
background-image:cover;
`

const Image = styled.img
`
width:400px;
height:300px;-

`
// 오른 쪽  정보창
const DogTitleInput = styled.input
`
margin-left:20px;
border:none;
border-bottom: 1px solid;
`
const DogGender = styled.div
`
display:flex;
justify-content:flex-start;
margin: 20px 0px;

`
const Button =styled.button
`
margin-right:20px;
cursor:pointer;
`