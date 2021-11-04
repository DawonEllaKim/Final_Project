import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// 창 안에 버튼을 삽입
const CustomToast = ({closeToast}) =>{
    return(
        <div>
            something went wrong
            <button onClick={closeToast}>Close</button>
        </div>
    )
}

toast.configure()
const Message = (props) =>{

    const notify = () =>{
        toast('쪽지 전송 중', {
            position: toast.POSITION.TOP_CENTER,
            pauseOnHover:true,
            hideProgressBar:false,
            draggable:true,
            closeOnClick:true,            
        })
        toast.success('성공', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            pauseOnHover:false,
            hideProgressBar:true,
            draggable:false,
            closeOnClick:false,
        })
        toast.info('정보', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: false,
        })
        toast.warn(<CustomToast />, {position: toast.POSITION.BOTTOM_LEFT})
        toast.error('에러', {position: toast.POSITION.BOTTOM_RIGHT})

    }

    return (
        <>
            <textarea>내용을 입력하세요</textarea>    
            <button onClick={notify}>쪽지 보내기</button>
        </>
    )
}

export default Message;