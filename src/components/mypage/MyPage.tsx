/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SAIcon from "assets/icons/small-arrow.png";
import PBOIcon from "assets/icons/pbo.png";
import CSIcon from "assets/icons/cashlink-icon.png";
import BAIcon from "assets/icons/bazaro-icon.png";
import GLIcon from "assets/icons/global-icon.png";
import CPIcon from "assets/icons/cp-coin.png";

interface Props {
  isLoggined: boolean;
}

function MyPage({ isLoggined }: Props) {
  return (
    <Wrap>
      <div className="user-info">
        {isLoggined ? (
          <>
            <div className="loggined">
              <Link to="" className="main-info">
                <span>
                  <img src={PBOIcon} />
                  HOJOGroup <em>님</em>
                </span>
                <img src={SAIcon} />
              </Link>
              <span>반갑습니다.</span>
            </div>
            <div className="auth-info">
              <span>보안 2 등급</span>
              <div>
                <em style={{ color: "#FF9900" }}>본인인증 v</em>
                <em>계좌인증 x</em>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="login">
              <em>로그인</em>을 해주세요
            </div>
            <div className="sign-box">
              <div>
                <a
                  href={`${process.env.REACT_APP_AUTH_API_BASE}/oauth/authorize?client_id=cashlink&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}
                >
                  로그인
                </a>
              </div>
              <button>로그아웃</button>
            </div>
          </>
        )}
      </div>
      {isLoggined && (
        <div className="my-activity">
          <span>나의 활동</span>
          <div>
            <div>
              <span>0</span>
              <p>판매중</p>
            </div>
            <em />
            <div>
              <span>0</span>
              <p>구매중</p>
            </div>
            <em />
            <div>
              <span>0</span>
              <p>관심상품</p>
            </div>
          </div>
        </div>
      )}
      <div className="intro">
        <span>
          <div>
            <img src={CSIcon} />
            캐시링크 소개
          </div>
          <img src={SAIcon} />
        </span>
        <span>
          <div>
            <img src={BAIcon} />
            바자로 바로가기
          </div>
          <img src={SAIcon} />
        </span>
        <span>
          <div>
            <img src={GLIcon} />
            글로벌 직구 바로가기
          </div>
          <img src={SAIcon} />
        </span>
        {isLoggined ? (
          <Link to="/point/history" className="cp">
            <div>
              <img src={CPIcon} />
              CP관리
            </div>
            <img src={SAIcon} />
          </Link>
        ) : null}
      </div>
      <div className="center">
        <div className="title">
          <span>고객센터</span>
          <em>1500-1500</em>
        </div>
        <Link to="/center/notice">
          공지사항 <img src={SAIcon} />
        </Link>
        <Link to="/center/faq">
          FAQ <img src={SAIcon} />
        </Link>
        <Link to="/center/service">
          서비스 문의 <img src={SAIcon} />
        </Link>
        <Link to="" className="term">
          약관 및 정책 <img src={SAIcon} />
        </Link>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;


&  > .my-activity {
  
height: 91px;

background: ${({ theme }) => theme.colors.primary_color};
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
border-radius: 6px;

margin-bottom :16px;

padding : 8px 0px;

& > span {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  padding: 0px 12px;

  color: #FFFFFF;
}


& > div {
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > em {
  width: 1px;
height: 32px;

background: #FFFFFF;
opacity: 0.4;
}

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* border-right: 1px solid rgba(255,255,255,0.4); */

    & > span {
      font-weight: 600;
      font-size: 28px;
      line-height: 38px;

      color: #FFFFFF;
    }

    & > p {
      font-size: 12px;
      line-height: 16px;

      color: #FFFFFF;

      opacity: 0.8;
    }
  }
}
}



& > .center {

  

  & > a {
    height: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 14px;
    line-height: 19px;
    /* identical to box height */


    color: #666666;

    & > img {
      width: 24px;
      height: 24px;
    }
  }

  & > .term {
    margin-top :12px;
  }

  & > .title {
    height: 48px;

    display: flex;
    align-items: center;

    & > span {
      height: 19px;

      display: flex;
    align-items: center;

      font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */


    color: #666666;
    }

    & > em {

      height: 22px;

      display: flex;
    align-items: center;

      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height */


      color: ${({ theme }) => theme.colors.primary_color};

      margin-left: 12px;

    }
  }
}

& > .user-info{
  height: 128px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-bottom:  16px;

  & > .auth-info {

    & > span {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      /* identical to box height */


      color: ${({ theme }) => theme.colors.primary_color};
    }

    & > div > em {
      font-size: 12px;
      line-height: 16px;

      color: #666666;

      margin-right: 12px;
    }
  }

  &  > .loggined {

  & > span {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: #666666;

  }

  & > .main-info{
    height: 27px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & > img {
      width: 24px;
      height: 24px;
    }

    & > span {
      height: 27px;

      display: flex;
      align-items: center;

      font-weight: 600;
      font-size: 20px;
      line-height: 27px;

      color: ${({ theme }) => theme.colors.primary_color};

      & > em {
        color: #666666;

      }
      & > img {
      width: 24px;
      height: 24px;

      margin-right: 4px;
    }
    }
  }
}

  & > .login {

    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #666666;
    & > em{
      color: ${({ theme }) => theme.colors.primary_color};
    }

  }

  & > .sign-box {
    display: flex;
    & > button, div {
      width: 96px;
      height: 32px;
      background: #EEEEEE;
      border-radius: 6px;

      font-size: 14px;
      line-height: 19px;

      color: #666666;
    }

    & > div {
     
      margin-right: 8px;

      & > a {
        width: 96px;
        height: 32px;
        background: #EEEEEE;
        border-radius: 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 14px;
        line-height: 19px;

        color: #666666;
      }
    }
  }
}

& > .intro {

  & > .cp {
    height: 48px;

    margin: 16px 0px;
    

    & > div {


      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
  /* identical to box height */


      color: #2233AA;

      & > img {
        width: 48px;
        height: 48px;
      }
    }

  }

  & > a, span {
    height: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > img {
      width: 24px;
      height: 24px;
    }

    & > div {

      font-size: 14px;
      line-height: 19px;

      color: #666666;

      & > img {
        width: 32px;
        height: 32px;

        margin-right: 9px;
      }
    }
  }
}
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default MyPage;
