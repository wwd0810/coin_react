/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import classnames from "classnames";

import SearchIcon from "assets/icons/search.png";
import SellItem from "./sell";
import BuyItem from "./buy";
import SendItem from "./send";
import { Dealing, Paging } from "stores/market/types";
import { PointType, Account } from "stores/users/types";

interface Props {
  histories: Dealing[];
  buyList: Dealing[];
  pointList: PointType[];
  paging?: Paging;
  pointPaging?: Paging;

  account?: Account;

  // 판매 내역 관련
  getList: (page: number, status: string, duration: string, more?: boolean, query?: string) => void;
  del: (idx: number) => void;
  deny: (id: number, purId: number, reason: string) => void;
  accept: (id: number, purId: number) => void;
  done: (id: number, purId: number) => void;
  buyerReport: (id: number, purId: number, reason: string) => void;

  // 구매 내역 관련
  getBuyList: (
    page: number,
    status: string,
    duration: string,
    more?: boolean,
    query?: string,
  ) => void;
  deposit: (id: number, purId: number) => void;
  cancle: (id: number, purId: number) => void;
  sellerRepost: (id: number, purId: number, reason: string) => void;

  // 전송 내역 관련
  getSendList: (page: number, query?: string, status?: string) => void;
}

function List({
  histories,
  getList,
  paging,
  getSendList,
  pointList,
  del,
  deny,
  accept,
  done,
  buyerReport,
  getBuyList,
  deposit,
  sellerRepost,
  buyList,
  cancle,
  pointPaging,
  account,
}: Props) {
  const [selected, setSelected] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [more, setMore] = useState<boolean>(false);

  const [sendStatus, setSendStatus] = useState<string>("");

  const onChangeMenu = useCallback((e: any) => {
    e.preventDefault();

    const { id } = e.target;

    setPage(0);
    setDuration("");
    setSearch("");
    setStatus("");

    setSelected(Number(id));
  }, []);

  const getPageList = () => {
    setPage(page + 1);
    setMore(true);
  };

  const onChangeStatus = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setStatus(value);
  }, []);

  const onChangeDuration = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setDuration(value);
  }, []);

  const onChangeSendStatus = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setSendStatus(value);
  }, []);

  const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setSearch(value);
  }, []);

  const deleteMarket = (idx: number) => {
    del(idx);
  };

  const onSearch = () => {
    if (page === 0) {
      let query = search.toLowerCase();
      let count = 0;
      query = query.replace("p", "");

      query = query.replace("nk", "");

      while (true) {
        if (query[count] !== "0") break;

        query = query.replace("0", "");
      }

      // for(let i = 0; i < query.length; i++) {
      //   if(query[i] === "0") {
      //     query()
      //   }
      // }

      if (selected === 2) getSendList(page, query);
      else if (selected === 1) getBuyList(page, status, duration, more, query);
      else if (selected === 0) getList(page, status, duration, more, query);

      return;
    } else {
      setPage(0);
    }
  };

  useEffect(() => {
    // if (selected === 2) {
    // getSendList(page, search);
    if (selected === 1) {
      getBuyList(page, status, duration, more);
    } else if (selected === 0) {
      getList(page, status, duration, more, search);
    }
    console.log(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getList, more, page, selected, getSendList, getBuyList]);

  useEffect(() => {
    if (selected === 2) {
      getSendList(page, duration, sendStatus);
    }
  }, [duration, getSendList, page, selected, sendStatus]);

  //  {/* <SellItem type="sell" />
  //           <SellItem type="apply" />
  //           <SellItem type="wait" />
  //           <SellItem type="init" />
  //           <SellItem type="finish" />
  //           <SellItem type="expiration" /> */}

  return (
    <Wrap>
      <div className="top-box">
        <div className="top-menu">
          <span
            id="0"
            onClick={onChangeMenu}
            className={classnames("", {
              active: selected === 0,
            })}
          >
            판매내역
          </span>
          <span
            id="1"
            onClick={onChangeMenu}
            className={classnames("", {
              active: selected === 1,
            })}
          >
            구매내역
          </span>

          <span
            id="2"
            onClick={onChangeMenu}
            className={classnames("", {
              active: selected === 2,
            })}
          >
            전송내역
          </span>
        </div>
        <div className="search-box">
          {selected !== 2 ? (
            <>
              <div className="select-box">
                <select value={duration} onChange={onChangeDuration}>
                  <option value="">전체(기간)</option>
                  <option value="TODAY">오늘</option>
                  <option value="1WEEK">1주일</option>
                  <option value="1MONTH">1개월</option>
                  <option value="3MONTH">3개월</option>
                  <option value="6MONTH">6개월</option>
                  <option value="1YEAR">1년</option>
                </select>
                <select value={status} onChange={onChangeStatus}>
                  <option value="">전체(상태)</option>
                  {selected === 0 && <option value="INIT">판매중</option>}
                  <option value="ON_SALE">거래중</option>
                  {/* <option value="PURCHASE_REQUEST_RECEIVED">구매신청받음</option>
                <option value="WAITING_FOR_DEPOSIT">입금대기중</option>
                <option value="DEPOSIT_COMPLETED ">입금완료</option> */}
                  <option value="DONE ">거래완료</option>
                  <option value="EXPIRED">기간만료</option>
                </select>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  value={search}
                  onChange={onChangeSearch}
                  placeholder="물품번호 검색"
                />
                <img src={SearchIcon} onClick={onSearch} />
              </div>
            </>
          ) : (
            <div className="select-box">
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
          )}
        </div>
      </div>
      <div className="bottom-box">
        <span className="result-box">
          <em>전체결과</em>
          {/* <select
            style={{ width: "72px", border: "none" }}
            value={sendStatus}
            onChange={onChangeSendStatus}
          >
            {selected !== 2 ? (
              <>
                <option>최신순</option>
              </>
            ) : (
              <>
                <option value="">전체</option>
                <option value="DEPOSIT">입금</option>
                <option value="WITHDRAW">출금</option>
              </>
            )}
          </select> */}
        </span>
        {selected === 0 ? (
          <>
            {histories &&
              histories.map((data, idx) => (
                <SellItem
                  {...data}
                  type={data.status}
                  key={idx}
                  del={deleteMarket}
                  deny={deny}
                  accept={accept}
                  done={done}
                  report={buyerReport}
                />
              ))}
            {paging && page < paging.count / paging.limit - 1 && (
              <button className="more-btn" onClick={getPageList}>
                더보기
              </button>
            )}
          </>
        ) : selected === 1 ? (
          <>
            {buyList &&
              buyList.map((data, idx) => (
                <BuyItem
                  {...data}
                  key={idx}
                  deposit={deposit}
                  report={sellerRepost}
                  cancle={cancle}
                />
              ))}
            {paging && page < paging.count / paging.limit - 1 && (
              <button className="more-btn" onClick={getPageList}>
                더보기
              </button>
            )}
            {/* <BuyItem type="apply" />
            <BuyItem type="accept" />
            <BuyItem type="wait" />
            <BuyItem type="finish" />
            <BuyItem type="expiration" /> */}
          </>
        ) : (
          <>
            {pointList.map((data, idx) => (
              <SendItem key={idx} {...data} account={account} />
            ))}
            {pointPaging && page < pointPaging.count / pointPaging.limit - 1 && (
              <button className="more-btn" onClick={getPageList}>
                더보기
              </button>
            )}
          </>
        )}
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
}

& > .bottom-box {

  margin-bottom: 72px;

  & > .result-box {
    height: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > em {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;

      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.dark_grey_color};
    }
  }
}

& > .top-box {

  & > .search-box {
    & > .input-box {
      
      & > input {
        height: 32px;
        margin-top: 8px;
      }
      
    }
    
    & > .select-box {
      display: flex;
      
      margin-top: 8px;

      & > select {
        
        height: 32px;
        width:100%;
        border: 1px solid  ${({ theme }) => theme.colors.grey_color};

       
      }

      & > select:nth-child(2n) {
        margin-left: 8px;
      }
    }
  }

  & > .top-menu{
    display: flex;
    justify-content: space-between;
    
    & > span {
      height: 40px;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;

      display: flex;
      align-items: center;

      color: #666666;

      border-bottom: 1px solid ${({ theme }) => theme.colors.grey_color};
      
    }

    & > .active {
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary_color};
    }
  }
}
  
${({ theme }) => theme.media.mobile`

      .input-box {
        height: 32px;
        position: relative;
        
        & > img {
          position: absolute;
            top: 4px;
            right: 8px;
            width: 24px;
            height: 24px;
            /* overflow: hidden; */
        }
    }

`}
${({ theme }) => theme.media.tablet`
.input-box {
        position: relative;
        
        & > img {
            position: absolute;
            top: 4px;
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

        & > img {
            position: absolute;
            top: 4px;
            right: 8px;
            width: 24px;
            height: 24px;
        }
    }

`}
`;

export default List;
