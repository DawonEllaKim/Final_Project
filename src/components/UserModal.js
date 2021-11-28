import React, { useState } from "react";
import styled from "styled-components";

import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { actionCreators as markerActions } from "../redux/modules/marker";
import { useHistory } from "react-router";
import { MdCloudUpload } from "react-icons/md";

import { actionCreators as UserActions } from "../redux/modules/user";
import Spinner from "../shared/Spinner";
const UserModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const addMarker = () => {
    const image = imgFile ? imgFile : props.userImage;

    const formData = new FormData();
    //  console.log(image)
    formData.append("userImage", imgFile);

    setLoading(true);
    dispatch(UserActions.updateUserImageMD(formData));
  };

  const [imgBase64, setImgBase64] = useState(props.userImage); // 파일 base64
  const [imgFile, setImgFile] = useState(); //파일

  const handleChangeFile = (event) => {
    // 이미지 파일
    event.preventDefault();
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
    // else
    // reader.readAsDataURL(userImage);
    //   setImgFile(userImage)
  };
  const [loading, setLoading] = useState("");
  if (loading) {
    return <Spinner />;
  }
  return (
    <React.Fragment>
      <Component />
      <ModalComponent>
        <ModalExitBtn onClick={() => props.setModal(false)}>
          <Close />
        </ModalExitBtn>
        <ModalHeader>프로필 이미지를 수정하시겠습니까?</ModalHeader>
        <ImageWrap>
          <Preview src={imgBase64}></Preview>
          <UploadLabel for="imgFile">
            <MdCloudUpload
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
                color: "#404040",
              }}
            />
            이미지 업로드
          </UploadLabel>
          <AddImage
            type="file"
            name="imgFile"
            id="imgFile"
            onChange={handleChangeFile}
          />
        </ImageWrap>
        <ModalButtonContainer>
          <ModalSubmitBtn onClick={addMarker}> 이미지 수정 </ModalSubmitBtn>
        </ModalButtonContainer>
      </ModalComponent>
    </React.Fragment>
  );
};
const Component = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.4;
  height: 100vh;
  width: 100%;
  background-color: black;
  z-index: 10;
`;
const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 450px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ModalHeader = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
`;
const ModalInput = styled.div`
  box-sizing: border-box;
  width: 50%;
`;
const ModalButtonContainer = styled.div`
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 30px;
`;
const ModalSubmitBtn = styled.button`
  width: 100%;
  background-color: #ff5656;
  border: none;
  outline: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
`;
const ModalExitBtn = styled.button`
  position: absolute;
  top: 23;
  right: 0;
  padding: 8px 12px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  color: black;
`;
const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
const Preview = styled.img`
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0 auto;
  object-fit: cover;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const UploadLabel = styled.label`
  width: 150px;
  padding: 5px 5px 5px 5px;
  margin: 10px auto;
  cursor: pointer;
  display: flex;
  border-radius: 24px;
  justify-content: center;
  /* background-color: #9de8df; */
  border: 1px solid #c4c4c4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const AddImage = styled.input`
  /* width: 180px;
  margin: 10px 0; */
  display: none;
`;

export default UserModal;
