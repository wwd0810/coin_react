/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";

import PrevIcon from "assets/icons/prev.png";

interface Props {
  title: String;
  onPrev?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  inquiry?: boolean;
}

function StackHeader({ title, onPrev, inquiry }: Props) {
  return (
    <Wrap>
      <span>
        <button onClick={onPrev}>
          <img src={PrevIcon} />
        </button>
      </span>
      <span className="title">{title}</span>
      <span></span>
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;

height: 52px;

position: fixed;
top: 0px;

display: flex;
align-items: center;
justify-content: space-between;

background: ${({ theme }) => theme.colors.white_color};

border-bottom: 1px solid #DDDDDD;

z-index: 999;

padding : 14px 16px;

& > title {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;

    text-align: center;

    color: #444444;
}

& > span {

  & > button {
    font-size: 14px;
    line-height: 19px;
    text-decoration-line: underline;

    color: #2233AA;
  }


    & > button > img {
        width: 24px;
        height: 24px;
    }
}

${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`
    height: 70px;
    display: none;  
    & > .span {
      
    }
`}

`;

export default StackHeader;
