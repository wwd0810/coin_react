/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";

import SearchIcon from "assets/icons/search.png";
import DealSendItem from "./item/DealSendItem";

function DealSend() {
  return (
    <Wrap>
      <div className="p-box">
        <div className="title">받는사람</div>
        <div className="search">
          <select>
            <option>연락처</option>
            <option>아이디</option>
            <option>직접입력</option>
          </select>
          <span className="input-box">
            <input type="text" />
            <img src={SearchIcon} />
          </span>
        </div>
        <span>
          <input type="text" readOnly />
        </span>
      </div>
      <div className="c-box">
        <DealSendItem />
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

padding: 23px 16px;;

& > .c-box{
    display: flex;
    flex-direction: column;

}

& > .p-box {

    display: flex;
    flex-direction: column;

    margin-bottom: 32px;

    & > span {
        & > input {
            background: #EEEEEE
        }
    }
    & > .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;

        color: ${({ theme }) => theme.colors.primary_color};

        border-bottom: 2px solid ${({ theme }) => theme.colors.primary_color};

        margin-bottom: 10px;
    }

    & > .search {
        display: flex;
        justify-content: space-between;

        margin-bottom: 8px;

        & > select {
            width: 96px;
            height: 40px;
            padding-left : 14px;
            margin-right: 8px;
        }
    }

    & > span {

    }
}
  
${({ theme }) => theme.media.mobile`

.input-box {
        position: relative;
        width: 100%;
        
        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            /* background-size: 15px 15px; */
            /* overflow: hidden; */
        }
    }

`}
${({ theme }) => theme.media.tablet`

.input-box {
        position: relative;
        width: 100%;
        
        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            /* background-size: 15px 15px; */
            /* overflow: hidden; */
        }
    }

`}
${({ theme }) => theme.media.desktop`

.input-box {
        position: relative;
        width: 100%;
        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
        }
    }
`}
`;

export default DealSend;
