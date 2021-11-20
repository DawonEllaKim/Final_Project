import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}
body{
	padding: 0 20px;
	margin: 0;
	margin: auto;
	font-size: 16px;
	font-family: 'Noto Sans KR', sans-serif;
}`;

export default GlobalStyle;
