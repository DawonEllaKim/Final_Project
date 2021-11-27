import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

* {
	box-sizing: border-box;
	margin: 0 ;
	padding: 0;
}

body{
	padding: 0 0 120px 0;
	font-size: 16px;
	font-family: 'Noto Sans KR', sans-serif;
	min-width: 315px;
	max-width: 500px;
	-ms-overflow-style: none;
  scrollbar-width: none;
	::-webkit-scrollbar {
  display: none;
	}
	margin:0 auto;
	/* border:1px solid #c4c4c4; */
	
}`;

export default GlobalStyle;
