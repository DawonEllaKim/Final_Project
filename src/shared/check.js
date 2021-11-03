// 이메일 유효성 검사
export const emailCheck = (email) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email); 
  }

//  패스워드 검사
  export const passwordCheck = (password) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/; //  8자 이상 영대소문자, 숫자 조합
    return regExp.test(password);
  }