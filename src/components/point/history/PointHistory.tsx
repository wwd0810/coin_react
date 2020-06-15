/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PointHistoryItem from "./item";

import CPIcon from "assets/icons/cp-coin.png";
import { PointType } from "stores/users/types";
import { Paging } from "stores/market/types";

interface Props {
  paging?: Paging;
  cpList: PointType[];
  more: (page: number, duration?: string) => void;
}

function PointHistory({ cpList, more, paging }: Props) {
  const [page, setPage] = useState<number>(0);
  const [duration, setDuration] = useState<string>("");

  // let page: number = 0;

  const onClickMore = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      setPage(page + 1);
    },
    [page],
  );

  const onChangeDuration = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setDuration(value);
  }, []);

  useEffect(() => {
    more(page, duration);
  }, [more, page, duration]);

  return (
    <Wrap>
      <Link to="/point/charge">
        <div className="top">
          <img src={CPIcon} />
          충전하기 >
        </div>
      </Link>

      <div className="search">
        <select value={duration} onChange={onChangeDuration}>
          <option value="">전체(기간)</option>
          <option value="TODAY">오늘</option>
          <option value="1WEEK">1주일</option>
          <option value="1MONTH">1개월</option>
          <option value="3MONTH">3개월</option>
          <option value="6MONTH">6개월</option>
          <option value="1YEAR">1년</option>
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
