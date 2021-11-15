// DogStaDetail.js - 개스타그램 게시물 하나에 대한 상세페이지
import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/dogsta";

const DogStaDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const postId = props.match.params.dogPostId;
  const currentPostUserId = props.match.params.userId;
  const post = useSelector((state) => state.dogsta.eachList);
  const currentPageUserId = props.match.params.userId;
  const userId = localStorage.getItem("userId");
   console.log(post)
  const editPost = () => {
    history.push(`/mapEdit/${postId}`);
  };

  const deletePost = () => {
    dispatch(postActions.deletePostMD(postId));
  };

  useEffect(() => {
    dispatch(postActions.getPostMD(currentPostUserId, postId));
  }, []);

  return (
    <Wrap>
      {/* 뒤로가기 버튼 + 누구의 페이지 + 알람 */}
      <TopBar>{post.userNickname}님의 게시물</TopBar>

      {/* 유저 정보 */}
      {/* <UserInfo>
        <img src={post.userImage} />
        <div>
          <span>{post.userNickname}</span>
          <span>{post.userLocation}</span>
        </div>
      </UserInfo> */}

      <UserInfo
        onClick={() => {
          history.push(`/mypage/${post.userId}`);
        }}
      >
        <UserInfoLeft>
          {/* 유저 사진 */}
          <UserImg src={post.userImage} />
        </UserInfoLeft>

        <UserRight>
          {/* 유저 닉네임 + 유저 주소 */}
          <div>
            <span style={{ fontWeight: "400" }}>{post.userNickname}</span>
            <span style={{ color: "#5F5F5F" }}>{post.userLocation}</span>
          </div>
        </UserRight>
      </UserInfo>

      {/* 게시물 부분 */}
      <Write>
        <img src={post.dogPostImage} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            marginBottom: "50px",
          }}
        >
          <img
            src={post.userImage}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "7px",
              borderRadius: "50%",
            }}
          />
          <p style={{ marginRight: "10px" }}>{post.userNickname}</p>
          <p>{post.dogPostDesc}</p>
          {/* <span>어제</span> */}
        </div>
      </Write>

      {currentPageUserId === userId && (
        // <div
        //   style={{
        //     display: "flex",
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     margin: "0 40px",
        //   }}
        // >
        //   <Button
        //     onClick={() => {
        //       history.push(`/dogstaedit/${postId}`);
        //     }}
        //   >
        //     수정하기
        //   </Button>
        //   <Button onClick={deletePost}>삭제하기</Button>
        // </div>
        <FlexButton>
          <EditButton onClick={editPost}>수정하기</EditButton>
          <DeleteButton onClick={deletePost}>삭제하기</DeleteButton>
        </FlexButton>
      )}

      {/* 고정 네비게이션 바 */}
      <NavBar />
    </Wrap>
  );
};
const DeleteButton = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border-radius: 10px;
  border: 1px gray;
`;
const EditButton = styled.button`
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
const Button = styled.button`
  width: 100px;
  height: 30px;
  border: none;

  border-radius: 20px;

  cursor: pointer;
`;
const UserInfo = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  width: 100%;
  height: 88px;

  margin-bottom: 24px;
  cursor: pointer;
`;
const UserInfoLeft = styled.div`
  position: relative;

  width: 91px;
  height: 88px;

  margin-right: 16px;
`;
const UserRight = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const UserImg = styled.img`
  width: 83px;
  height: 83px;
  padding: 2px;

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
// const UserInfo = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: left;
//   align-items: center;
//   width: 350px;
//   height: 108px;
//   margin-bottom: 22px;
//   border-top: 0.25px solid #b9b8b8;
//   border-bottom: 0.25px solid #b9b8b8;

//   img {
//     width: 80px;
//     height: 80px;
//     margin-right: 14.5px;
//     border: 1px solid black;
//     border-radius: 50%;
//     object-fit: cover;
//   }

//   div {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: flex-start;
//   }

//   span {
//     margin-bottom: 7px;
//     font-size: 16px;
//     color: #5f5f5f;
//   }
// `;
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

export default DogStaDetail;
