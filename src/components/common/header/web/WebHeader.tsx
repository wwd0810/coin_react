/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import classnames from "classnames";

import NoticeIcon from "assets/icons/notice.png";

interface Props {
  title?: String;
}

function WebHeader({ title }: Props) {
  return (
    <Wrap>
      <Link to="/home" className="logo">
        cash<em>link</em>
      </Link>
      <div className="nav">
        <Link to="/deal" className={classnames("", { active: title === "거래하기" })}>
          거래하기
        </Link>
        <Link to="/list" className={classnames("", { active: title === "거래내역" })}>
          거래내역
        </Link>
        <Link to="/mypage" className={classnames("", { active: title === "마이페이지" })}>
          마이페이지
        </Link>
      </div>
      <Link to="/center/notice">
        <img src={NoticeIcon} />
      </Link>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

height: 70px;

position: fixed;
top: 0px;

background: ${({ theme }) => theme.colors.white_color};

display: flex;
align-items: center;
justify-content: space-between;

z-index: 999;

padding : 24px 18px;

& > .nav {
    width: 288px;

    display: flex;
    justify-content: space-between;

    &  > a {
        font-size: 16px;
        line-height: 22px;
        /* identical to box height */

        text-align: center;

        color: #AAAAAA;

    }

    & > .active {
        color : ${({ theme }) => theme.colors.primary_color};
    }
}

& > .logo {
    font-weight: 600;
font-size: 24px;
line-height: 33px;
/* identical to box height */

display: flex;
align-items: center;

color: #001166;

& > em {
    color: ${({ theme }) => theme.colors.secondary_color};

}
}

& > a {
    & > img {
        width : 24px;
        height: 24px;
    }
}
  
${({ theme }) => theme.media.mobile`
display: none;
`}
${({ theme }) => theme.media.tablet`
display: none;
`}
${({ theme }) => theme.media.desktop`

`}
`;

export default WebHeader;
