import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 창 안에 버튼을 삽입
const CustomToast = ({ closeToast }) => {
  return (
    <div>
      something went wrong
      <button onClick={closeToast}>Close</button>
    </div>
  );
};

toast.configure();
const Message = (props) => {
  const notify = () => {
    toast("쪽지 전송 중", {
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: true,
      hideProgressBar: false,
      draggable: true,
      closeOnClick: true,
    });
    toast.success("성공", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      pauseOnHover: false,
      hideProgressBar: true,
      draggable: false,
      closeOnClick: false,
    });
    toast.info("정보", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: false,
    });
    toast.warn(<CustomToast />, { position: toast.POSITION.BOTTOM_LEFT });
    toast.error("에러", { position: toast.POSITION.BOTTOM_RIGHT });
  };

  return (
    <>
      <textarea style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
        내용을 입력하세요
      </textarea>
      <SendBtn onClick={notify}>쪽지 보내기</SendBtn>
    </>
  );
};

const SendBtn = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  margin: 30px auto 0 auto;

  button {
    width: 40%;
    height: 48px;
    background-color: #fff;
    border-radius: 14px;
    border: 1px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    margin: 0 10px;
  }
`;
export default Message;
