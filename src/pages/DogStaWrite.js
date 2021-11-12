// 이 페이지에서 해야 할 것 -> 유저 정보 불러오기

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import NavBar from "../components/NavBar";
import { actionCreators as postActions } from "../redux/modules/dogsta";

// 아이콘들
import notification from "../image/Notification.png";
import backward from "../image/backward.png";

const DogStaWrite = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = localStorage.getItem("userId");

  const [imgBase64, setImgBase64] = useState("");
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
      {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 */}
      <Header>
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          <img src={backward} style={{ width: "10px", height: "18px" }} />
        </button>
        <p>새 게시물</p>
        <button>
          <img src={notification} style={{ width: "24px", height: "24px" }} />
        </button>
      </Header>

      {/* 게시물 작성 부분 */}
      <Write>
        <div>
          <img src={imgBase64} />
          <input type="file" name="imageFile" onChange={imageChange} />
        </div>
        <textarea onChange={dogPostDescChange} style={{ height: "100px" }} />
      </Write>

      {/* 글 작성 버튼들 */}
      <div>
        <button onClick={cancelPost}>취소하기</button>
        <button onClick={addPost}>작성하기</button>
      </div>

      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  width: 390px;
  margin: auto auto 200px auto;
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  }

  input {
    width: 100%;
    /* margin: auto; */
    margin-bottom: 50px;
  }

  textarea {
    width: 90%;
    /* margin: auto; */
    margin-bottom: 50px;
  }
`;

export default DogStaWrite;
