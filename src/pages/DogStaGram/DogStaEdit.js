import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// 컴포넌츠
import TopBar from "../../components/TopBar";
import NavBar from "../../components/NavBar";

// 리덕스
import { actionCreators as postActions } from "../../redux/modules/dogsta";
import DogStarEditModal from "../../components/DogStarEditModal";

// 아이콘
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const DogStaEdit = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dogPostDesc, setDogPostDesc] = useState("");

  const postId = props.match.params.dogPostId;
  const currentPostUserId = props.match.params.userId;
  const post = useSelector((state) => state.dogsta.eachList);
  const userId = localStorage.getItem("userId");

  const [isModal, setIsModal] = useState();

  useEffect(() => {
    dispatch(postActions.getPostMD(currentPostUserId, postId));
    setDogPostDesc(post.dogPostDesc);
  }, [post.dogPostImage, post.dogPostDesc]);

  const dogPostDescChange = (e) => {
    setDogPostDesc(e.target.value);
  };

  const updatePost = () => {
    const Info = {
      dogPostDesc,
    };
    dispatch(postActions.editPostMD(postId, Info));
    history.push(`/dogStaDetail/${userId}/${postId}`);
  };

  return (
    <Wrap>
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

        {isModal && (
          <DogStarEditModal
            setIsModal={setIsModal}
            dogStarImage={post.dogPostImage}
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
