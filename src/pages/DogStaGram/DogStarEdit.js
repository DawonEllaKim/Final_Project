import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/dogsta";
import DogStarEditModal from "../../components/DogStarEditModal";
// 이미지 + 아이콘
import defaultDog from "../../image/default_dog.png";
import edit from "../../image/edit.png";
const DogStaEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [imgBase64, setImgBase64] = useState(defaultDog ? defaultDog : "");
  const [imgFile, setImgFile] = useState(null);
  const [dogPostDesc, setDogPostDesc] = useState("");
 
  const postId = props.match.params.dogPostId;
  const currentPostUserId = props.match.params.userId;
  const post = useSelector((state) => state.dogsta.eachList);
  const currentPageUserId = props.match.params.userId;
  const [modal,setModal] = useState();
  // 이미지 파일
  const imageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      if (base64) {
        setImgBase64(base64.toString());
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImgFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    dispatch(postActions.getPostMD(currentPostUserId, postId));
    setImgBase64(post.dogPostImage)
    setDogPostDesc(post.dogPostDesc)
  }, [post.dogPostImage,post.dogPostDesc]);
 
  const dogPostDescChange = (e) => {
    setDogPostDesc(e.target.value);
  };


  const updateImagePost = () => {
    const formData = new FormData();
    formData.append("dogPostImage", imgFile);
    dispatch(postActions.editPostImageMD(formData));
  };

  const updatePost = () => {

    const Info = {
        dogPostDesc
    }
    dispatch(postActions.editPostMD(postId,Info));
  };

  return (
    <Wrap>
      <TopBar>수정 게시물</TopBar>

      {/* 게시물 작성 부분 */}
      <Write>
      <UserWrap>
        <UserInfoLeft onClick={()=>setModal(true)} >
        <UserImg src={post.dogPostImage} / >
         <Edit >
           <img src={edit}/>
           </Edit>
          
           </UserInfoLeft>
           </UserWrap>
           {
             modal && <DogStarEditModal setModal={setModal} dogStarImage={post.dogPostImage}/>
           }
        <textarea
          placeholder={"강아지와의 일상을 기록하세요"}
          onChange={dogPostDescChange}
          style={{ height: "100px", padding: "10px", boxSizing: "border-box" }}
          value={dogPostDesc}
        />
      </Write>

      {/* 글 작성 버튼들 */}
      <FlexButton>

        <AddBtn onClick={updatePost}>수정하기</AddBtn>
      </FlexButton>

      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
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
  width: 350px;

`;
const UserImg = styled.img`
  width: 350px;

  padding: 2px;




  margin-right: 14.5px;
  

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
const AddBtn = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border-radius: 10px;
  border: 1px gray;
`;
const CancelBtn = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border-radius: 10px;
  border: 1px gray;
`;
const FlexButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  height: 52px;
  margin: 30px auto 130px auto;

  button {
    width: 160px;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 1px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;
const Wrap = styled.div`
  box-sizing: border-box;
  width: 390px;
  margin: auto auto 10px auto;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 52px;
  margin: 10px auto 18px auto;
  font-size: 18px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 350px;
  height: 108px;
  margin-bottom: 22px;
  border-top: 0.25px solid #b9b8b8;
  border-bottom: 0.25px solid #b9b8b8;

  img {
    width: 80px;
    height: 80px;
    margin-right: 14.5px;
    border: 1px solid black;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  span {
    margin-bottom: 7px;
    font-size: 16px;
    color: #5f5f5f;
  }
`;
const Write = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* margin: auto; */

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;

    object-fit: cover;
    border: 1px solid #ebebeb;
  }

  label {
    padding: 5px 10px;
    border: 1px solid black;
    margin: 20px 0;
    border-radius: 4px;
    cursor: pointer;
  }

  input {
    width: 100%;
    /* margin: auto; */
    margin-bottom: 50px;
    display: none;
  }

  textarea {
    width: 90%;
    /* margin: auto; */
    margin-bottom: 50px;
  }
`;

export default DogStaEdit;
