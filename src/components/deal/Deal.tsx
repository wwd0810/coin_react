/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import DLBigIcon from "assets/icons/deal-big.png";
import SearchIcon from "assets/icons/search.png";
import DealItem from "./item";

function Deal() {
  return (
    <Wrap>
      <Link to="/deal/apply" className="coin-avg">
        <div className="avg-info">
          <img src={DLBigIcon} />
          <div>
            <em>금일 딜링 (DL) 평균시세</em>
            <span>100 KRW</span>
          </div>
        </div>
        <span className="apply">판매 등록하기 ></span>
      </Link>
      <div className="content">
        <div className="search-box">
          <input type="text" />
          <img src={SearchIcon} />
        </div>
        <div className="result-box">
          <span>전체결과</span>
          <select>
            <option>최신순</option>
            <option>관심상품</option>
          </select>
        </div>

        <div className="item-list">
          <DealItem />
          <DealItem />
          <DealItem />
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

& > .coin-avg {
    height: 80px;    
    background: ${({ theme }) => theme.colors.secondary_color};

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 12px;

    & > .avg-info{
        display: flex;
        align-items: center;

        & > img {
        width: 48px;
        height: 48px;    

        margin-right: 12px;
        margin-left: 4px;
        }

        & > div {
            display: flex;
            flex-direction: column;
            justify-content: center;

            & > em {
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;

                color: #FFFFFF;

            }

            & > span {
                font-weight: 600;
                font-size: 20px;
                line-height: 27px;

                color: #2233AA;
            }
        }
    }

    & > .apply {
        font-size: 14px;
        line-height: 19px;
        /* identical to box height */

        display: flex;
        align-items: center;

        color: #FFFFFF;

        opacity: 0.6;
    }
}

& > .content {
        
    & > .result-box {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        /* margin-bottom: 16px; */
        & > span {
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;

            display: flex;
            align-items: center;

            color: #666666;
        }

    }
}

  
${({ theme }) => theme.media.mobile`
    & > .coin-avg {
    position:fixed;
    left: 0px;
    right: 0px;
    
    }

    & > .content {
    width: 100%;

    position: absolute;
    top: 96px;

    & > .search-box {
        position: relative;
        
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
}
`}
${({ theme }) => theme.media.tablet`

& > .content {
    margin-top: 16px;
    & > .search-box {
        position: relative;

        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
        }
    }
}

`}
${({ theme }) => theme.media.desktop`

& > .content {
    margin-top: 16px;
    & > .search-box {
        position: relative;

        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
        }
    }
}

`}
`;

export default Deal;
