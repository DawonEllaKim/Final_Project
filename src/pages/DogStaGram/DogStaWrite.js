// 이 페이지에서 해야 할 것 -> 유저 정보 불러오기

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import NavBar from "../../components/NavBar";
import { actionCreators as postActions } from "../../redux/modules/dogsta";

// 이미지 기본값
import defaultDog from "../../image/default_dog.png";
import TopBar from "../../components/TopBar";

const DogStaWrite = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = localStorage.getItem("userId");

  const [imgBase64, setImgBase64] = useState(defaultDog ? defaultDog : "");
  const [imgFile, setImgFile] = useState(null);
  const [dogPostDesc, setDogPostDesc] = useState("");

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

    console.log("imgBase64", imgBase64);
    console.log("imgFile", imgFile);
  };

  const dogPostDescChange = (e) => {
    setDogPostDesc(e.target.value);
  };

  const cancelPost = () => {
    window.alert("게시물 작성을 취소합니다.");
    history.goBack();
  };

  const addPost = () => {
    if (imgBase64 === "" || dogPostDesc === "") {
      window.alert("입력하지 않은 값이 있습니다.");
      return;
    }

    // const post = {
    //   dogPostDesc: dogPostDesc,
    // };
    // console.log(post);

    const formData = new FormData();
    formData.append("dogPostImage", imgFile);
    formData.append("dogPostDesc", dogPostDesc);

    history.goBack();
    dispatch(postActions.addPostMD(formData));
  };

  return (
    <Wrap>
      <TopBar>새 게시물</TopBar>

      {/* 게시물 작성 부분 */}
      <Write>
        <div>
          <img src={imgBase64} />
          <label for="input-file">사진 업로드</label>
          <input
            type="file"
            id="input-file"
            name="imageFile"
            onChange={imageChange}
          />
        </div>
        <textarea
          placeholder={"강아지와의 일상을 기록하세요"}
          onChange={dogPostDescChange}
          style={{ height: "100px", padding: "10px", boxSizing: "border-box" }}
        />
      </Write>

      {/* 글 작성 버튼들 */}
      <FlexButton>
        <CancelBtn onClick={cancelPost}>취소하기</CancelBtn>
        <AddBtn onClick={addPost}>작성하기</AddBtn>
      </FlexButton>

      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
  );
};

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
    height: 250px;
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

export default DogStaWrite;
