// DogStaEdit.js - 개스타그램 게시물 수정 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";
import SuccessModal from "../../components/Modal/SuccessModal";
import DogStarEditModal from "../../components/DogStarEditModal";

// 리덕스
import { actionCreators as dogstaActions } from "../../redux/modules/dogsta";

// 아이콘
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const DogStaEdit = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const [dogPostDesc, setDogPostDesc] = useState("");

  const postId = props.match.params.dogPostId; // 게시물 아이디
  const currentPostUserId = props.match.params.userId; // 게시물 작성한 유저 아이디

  const post = useSelector((state) => state.dogsta.eachList);
  const getModal = useSelector((state) => state.dogsta.modal);

  const [isModal, setIsModal] = useState();
  const [modal, setModal] = useState();

  useEffect(() => {
    dispatch(dogstaActions.getPostMD(currentPostUserId, postId));
    setDogPostDesc(post.dogPostDesc);
    setModal(getModal);
  }, [post.dogPostImage, post.dogPostDesc, getModal]);

  const dogPostDescChange = (e) => {
    setDogPostDesc(e.target.value);
  };

  const updatePost = () => {
    const Info = {
      dogPostDesc,
    };
    dispatch(dogstaActions.editPostMD(postId, Info));
  };

  return (
    <Wrap>
      {modal ? <SuccessModal text={"게시글이 수정되었습니다"} /> : ""}
      <TopBar>게시물 수정</TopBar>

      {/* 게시물 작성 부분 */}
      <Write>
        {/* 이미지 클릭시 이미지 수정 모달창 생성 */}
        <ImageEditWrap>
          <Modal onClick={() => setIsModal(true)}>
            <PostImg src={post.dogPostImage} />
            <Edit>
              <ModeEditIcon />
            </Edit>
          </Modal>
        </ImageEditWrap>

        {/* 이미지 수정 모달 */}
        {isModal && (
          <DogStarEditModal
            setIsModal={setIsModal}
            dogStarImage={post.dogPostImage}
            dogPostId={postId}
            currentPostUserId={currentPostUserId}
          />
        )}

        {/* 텍스트 수정 부분 */}
        <textarea
          placeholder={"강아지와의 일상을 기록하세요"}
          onChange={dogPostDescChange}
          value={dogPostDesc}
        />
      </Write>

      {/* 글 작성 버튼들 */}
      <FlexButton>
        <AddBtn onClick={updatePost}>수정하기</AddBtn>
      </FlexButton>
      <NavBar />
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 0 5%;
`;

const Write = styled.div`
  width: 100%;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 14px;
  }

  textarea {
    width: 100%;
    height: 100px;
    font-size: 16px;
    padding: 12px;
    resize: none;
    scrollbar-width: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid #bdbdbd;
    border-radius: 14px;
    font-family: "Noto Sans KR", sans-serif;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const ImageEditWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;
const Modal = styled.div`
  width: 100%;
`;
const PostImg = styled.img`
  width: 100%;
`;
const Edit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 6px;
  text-align: center;
  border: 2px solid black;
  border-radius: 50%;
  background-color: #fff;
`;

const FlexButton = styled.div`
  margin: 30px auto;
  text-align: center;
`;
const AddBtn = styled.button`
  cursor: pointer;
  width: 160px;
  height: 48px;
  border: none;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

export default DogStaEdit;
