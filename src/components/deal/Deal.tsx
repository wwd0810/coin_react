/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import DLBigIcon from "assets/icons/deal-big.png";
import SearchIcon from "assets/icons/search.png";
import DealItem from "./item";

import { Dealing, Paging } from "stores/market/types";

interface Props {
  deal: Dealing[];
  info: string;
  paging: Paging;
  getList: (page: number, order: string, query?: string, more?: boolean) => void;
}

function Deal({ deal, info, paging, getList }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState({
    sort: "RECENT|DESC",
    page: 0,
    prePage: 0,
    first: true,
  });

  // ====================useCallbacks====================
  const getPageList = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setState({ ...state, prePage: state.page, page: state.page + 1, first: false });
    },
    [state],
  );

  const sortByRecent = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (state.sort === "RECENT|DESC")
        setState({ ...state, page: 0, prePage: 0, sort: "RECENT|ASC", first: false });
      else setState({ ...state, page: 0, prePage: 0, sort: "RECENT|DESC", first: false });
    },
    [state],
  );

  const sortByPrice = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (state.sort === "PRICE|DESC")
        setState({ ...state, page: 0, prePage: 0, sort: "PRICE|ASC", first: false });
      else setState({ ...state, page: 0, prePage: 0, sort: "PRICE|DESC", first: false });
    },
    [state],
  );

  // ====================functions====================
  const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // getList(state.page, state.sort, state.search, true);
      getList(state.page, state.sort, searchRef.current?.value);
    }
  };

  // ====================useEffects====================
  useEffect(() => {
    if (!state.first) {
      if (state.prePage !== state.page) {
        getList(state.page, state.sort, searchRef.current?.value, true);
      } else {
        getList(state.page, state.sort, searchRef.current?.value);
      }
    }
  }, [getList, state.sort, state.page, state.first, state.prePage]);

  return (
    <Wrap>
      <Link to="/deal/apply" className="coin-avg">
        <div className="avg-info">
          <img src={DLBigIcon} />
          <div>
            <em>금일 딜링 (DL) 평균시세</em>
            <span>{info} KRW</span>
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
          <select style={{ border: "none" }}>
            <option>전체</option>
            <option>관심상품</option>
          </select>
        </div>

        <div className="item-list">
          {deal.map((data, idx) => (
            <DealItem deal={data} key={idx} />
          ))}
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

    z-index: 999;



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

  margin-bottom: 52px;
        
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
