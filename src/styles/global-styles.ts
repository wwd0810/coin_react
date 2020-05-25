import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
* {
box-sizing: border-box;
/* overflow-x: hidden; */

}
body{
/* font-family: Noto Sans; */
font-family: "Noto Sans KR", sans-serif;

font-style: normal;
line-height: 1.5;
color: #333;
letter-spacing: -0.5px;
font-weight: 400;

-ms-overflow-style: none;
scrollbar-width: none; /* Firefox */

::-webkit-scrollbar {
display: none; /* Chrome, Safari, Opera*/
}
}
a {
color: #000;
text-decoration: none;
}

input, textarea {
line-height: 1.5;
color: #333;
letter-spacing: -0.5px;
font-weight: 400;
}

input, button {
background-color: transparent;
vertical-align: middle;
border: none;
outline: none;
padding: 0;
}

h1, h2, h3, h4, h5, h6{
font-family:'Maven Pro', sans-serif;
}

ol, ul, li {
list-style: none;
}

img {
height: auto;
vertical-align: middle;
}

strong {
font-weight: bold;
}

.box {
-ms-overflow-style: none; /* IE and Edge */
scrollbar-width: none; /* Firefox */
}

img {
width: 100%;
height: auto;
vertical-align: middle;
}

input[type="text"],input[type="number"] {
width: 100%;
height: 40px;
/* background: #FFFFFF; */
border: 1px solid #DDDDDD;
border-radius: 2px;

text-align: right;

font-size: 16px;
line-height: 22px;
/* identical to box height */

display: flex;
align-items: center;
text-align: right;

color: #444444;


padding: 0 34px 0px 10px;
-webkit-appearance: none;
box-shadow: none !important;
}

select {
/* width: auto; */
height: 30px;
font-size: 14px;
/* line-height: 19px; */
display: flex;
align-items: center;
/* text-align: right; */
color: #444444;
border: none;
outline: none;
/* overflow: hidden; */
border: 1px solid #DDDDDD;
background: #fff;
}

.red-font {
    color: #EE0033;
}

.skyblue-font {
    color: #FF9900;
}


.normal-font {
    color: #AAAAAA;
}

.display-none {
    display: none;
}

.bg-primary {
    background: #0000AA;
}

.bg-grey {
    background: #666666;
}

.user-info-s {
    display: flex;
            align-items: center;

            & > img {
                width: 24px;
                height: 24px;

                margin-right: 8px;
            }

            & > em {
                font-weight: 600;
                font-size: 12px;
                

            }
}


`;

export default GlobalStyle;
