import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body{
	padding: 0 0 120px 0;
	font-size: 16px;
	font-family: 'Noto Sans KR', sans-serif;
	min-width: 315px;
	-ms-overflow-style: none;
  scrollbar-width: none;
	::-webkit-scrollbar {
  display: none;
}
}`;

export default GlobalStyle;
