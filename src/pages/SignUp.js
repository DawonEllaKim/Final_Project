import React, {useState} from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { actionCreators as UserActions } from '../redux/modules/user';
const SignOwner = () => {
    const dispatch = useDispatch();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
  
    const usernameChangeHandler = (e) => {
      const newTitle = e.target.value;
      console.log(newTitle)
      setUsername(newTitle);
  };  
  const passwordChangeHandler = (e) => {
    const newTitle = e.target.value;
    console.log(newTitle)
    setPassword(newTitle);
};

    return (
      <FlexBox>
        <Preview>
        <Image src="https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80"></Image>
      
       </Preview>
        <div>
          <DogGender>ID
          <DogTitleInput placeholder="ID를 입력하세요" onChange={usernameChangeHandler} />
          </DogGender>
           
          <DogGender>PASSWORD
          <DogTitleInput placeholder="비밀번호를 입력하세요"onChange={passwordChangeHandler}/>
          </DogGender>
          <DogGender>PASSWORDCHECK
          <DogTitleInput placeholder="비밀번호확인을 입력하세요"/>
          </DogGender>
         
     
          <DogGender>
          <Button>취소</Button>
         <Button onClick={()=>{dispatch(UserActions.signUserAPI(username,password))}}>제출</Button>
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
width:550px;
height: 300px;
background-image:cover;
`

const Image = styled.img
`
width:500px;
height:600px;

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