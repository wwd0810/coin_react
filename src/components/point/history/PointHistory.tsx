/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PointHistoryItem from "./item";

import CPIcon from "assets/icons/cp-coin.png";
import { PointType } from "stores/users/types";
import { Paging } from "stores/market/types";

interface Props {
  paging?: Paging;
  cpList: PointType[];
  more: (page: number) => void;
}

function PointHistory({ cpList, more, paging }: Props) {
  const [page, setPage] = useState<number>(0);

  // let page: number = 0;

  const onClickMore = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      setPage(page + 1);

      more(page + 1);
    },
    [more, page],
  );

  return (
    <Wrap>
      <Link to="/point/charge">
        <div className="top">
          <img src={CPIcon} />
          충전하기 >
        </div>
      </Link>

      <div className="search">
        <select>
          <option>전체(기간)</option>
        </select>
      </div>
      <div className="list">
        <span>
          전체결과
          <select>
            <option>최신순</option>
          </select>
        </span>
        <div className="items">
          {cpList.map((data, idx) => (
            <PointHistoryItem {...data} key={idx} />
          ))}
          {paging && page < paging.count / paging.limit - 1 && (
            <button className="more-btn" onClick={onClickMore}>
              더보기
            </button>
          )}

          {/* <PointHistoryItem type="charge_account" />
          <PointHistoryItem type="charge_credit" />
          <PointHistoryItem type="tax" /> */}
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;


.more-btn {
  width: 100%;
  height: 32px;

  font-size: 14px;
  line-height: 19px;
  color: #444444;

  background: #FFFFFF;
  border: 1px solid #DDDDDD;

  margin-bottom: 20px;
}

& > .list {

    padding: 0 16px;

    & > span{
        display: flex;
        align-items: center;
        justify-content: space-between;

        font-weight: 600;
        font-size: 14px;
        line-height: 19px;

        color: #444444;


        padding : 10px 0px;

        & > select {
            border: none;
        }
    }
}

& > .search {

    padding: 8px 16px;

    & > select {
        width: 100%;
        height: 32px;
    }
}

& > a { 
    & > .top {
    width: 100%;
    height: 56px;

    display: flex;
    align-items: center;

    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */


    color: #444444;

    background: #F7F7F7;

    padding : 0 16px;

  & > img {
        width: 48px;
        height: 48px;
        margin-right: 12px;
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

export default PointHistory;
