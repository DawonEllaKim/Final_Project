// 유저 정보 받아오기

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/dogsta";

// 아이콘들
import notification from "../../image/Notification.png";
import backward from "../../image/backward.png";

const DogStaEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const postId = props.match.params.id;
  const post = useSelector((state) => state.dogsta.eachList);

  const [imgBase64, setImgBase64] = useState(post.dogPostImage);
  const [imgFile, setImgFile] = useState(null);
  const [dogPostDesc, setDogPostDesc] = useState("");

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
    console.log(dogPostDesc);
  };

  const dogStaEditCancel = () => {
    window.alert("취소");
  };

  const dogStaEdit = () => {
    dispatch(postActions.editPostMD(postId, eachPost));
  };

  const eachPost = {
    dogPostDesc: dogPostDesc,
  };

  useEffect(() => {
    dispatch(postActions.getPostMD(postId));
  }, [postId]);

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
        <p>Dawon님의 페이지</p>
        <button>
          <img src={notification} style={{ width: "24px", height: "24px" }} />
        </button>
      </Header>

      {/* 유저 정보 */}
      <UserInfo>
        <img />
        <div>
          <span>Dawon0411</span>
          <span>서울시 양천구 목동</span>
        </div>
      </UserInfo>

      {/* 게시물 부분 */}
      <Write>
        <img src={imgBase64} />
        <input type="file" name="imageFile" onChange={imageChange} />
        <div>
          <textarea
            defaultValue={post.dogPostDesc}
            onChange={dogPostDescChange}
          />
        </div>
      </Write>

      <button onClick={dogStaEditCancel}>취소하기</button>
      <button onClick={dogStaEdit}>수정 완료하기</button>

      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  box-sizing: border-box;
  width: 390px;
  margin: auto;
  padding: 0 20px 150px 20px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 52px;
  margin: 46px auto 18px auto;
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
  margin: auto;

  img {
    width: 100%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }
`;

export default DogStaEdit;
