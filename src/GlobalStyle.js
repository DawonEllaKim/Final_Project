import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body{
	padding: 40px 30px 100px 30px;
	font-size: 16px;
	font-family: 'Noto Sans KR', sans-serif;
}`;

export default GlobalStyle;
