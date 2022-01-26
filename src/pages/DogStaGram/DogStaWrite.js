// DogStaWrite.js - 개스타그램 게시물 작성 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import Spinner from "../../shared/Spinner";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";

// 이미지 + 아이콘
import defaultImage from "../../image/defaultImage.png";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const DogStaWrite = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const [imgBase64, setImgBase64] = useState(defaultImage ? defaultImage : "");
  const [imgFile, setImgFile] = useState(null);
  const [dogPostDesc, setDogPostDesc] = useState("");
  const [loading, setLoading] = useState("");

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

  const dogPostDescChange = (e) => {
    setDogPostDesc(e.target.value);
  };

  const addPost = () => {
    if (imgBase64 == "" || dogPostDesc == "") {
      history.push("/errorModal");
      return;
    }

    const formData = new FormData();
    formData.append("dogPostImage", imgFile);
    formData.append("dogPostDesc", dogPostDesc);
    setLoading(true);

    dispatch(dogstaActions.addPostMD(formData));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Wrap>
        <TopBar>게시글 작성</TopBar>

        {/* 게시물 작성 부분 */}
        <Write>
          <div>
            {/* 이미지 등록 */}
            <img src={imgBase64} />
            <label for="input-file">
              <UploadFileIcon
                style={{
                  color: "#ff5656",
                  verticalAlign: "bottom",
                  marginRight: "4px",
                }}
              />
              이미지 업로드
            </label>
            <input
              type="file"
              id="input-file"
              name="imageFile"
              onChange={imageChange}
            />
          </div>
          {/* 내용 등록 */}
          <textarea
            placeholder={"강아지와의 일상을 기록하세요"}
            onChange={dogPostDescChange}
            style={{
              height: "100px",
              padding: "10px",
              boxSizing: "border-box",
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          />
        </Write>

        {/* 버튼 */}
        <FlexButton>
          <AddBtn onClick={addPost}>작성하기</AddBtn>
        </FlexButton>
      </Wrap>
      <NavBar />
    </>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 5%;
`;
const Write = styled.div`
  width: 100%;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border: 1px solid #ebebeb;
    border-radius: 55px;
  }
  label {
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #ff5656;
    padding: 10px 0;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    margin: 20px 0;
    border-radius: 4px;
    cursor: pointer;
  }
  input {
    width: 100%;
    margin-bottom: 50px;
    display: none;
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 12px;
    resize: none;
    scrollbar-width: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 14px;
    font-family: "Noto Sans KR", sans-serif;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const FlexButton = styled.div`
  width: 100%;
  text-align: center;
  margin: 30px auto;
`;
const AddBtn = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border-radius: 10px;
  background-color: #fff;
  border: none;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default DogStaWrite;
