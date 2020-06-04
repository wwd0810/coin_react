/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import DLBigIcon from "assets/icons/deal-big.png";
import SearchIcon from "assets/icons/search.png";
import DealItem from "./item";

import { Dealing, Paging } from "stores/market/types";
import BuyModal from "./modal";

interface Props {
  deal: Dealing[];
  info?: string;
  paging: Paging;
  getList: (page: number, order: string, query?: string, more?: boolean) => void;
  postLike: (idx: number) => void;
  buy: (idx: number) => void;
}

function Deal({ info, deal, paging, getList, postLike, buy }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState({
    sort: "RECENT|DESC",
    page: 0,
    prePage: 0,
    first: true,
  });

  const [option, setOption] = useState<number>(0);
  const [bid, setBid] = useState<number>();

  const onChageOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();

      const { value } = e.target;

      if (value === "0") {
        setState({ ...state, page: 0, prePage: 0, sort: "RECENT|DESC", first: false });
      } else {
        setState({ ...state, page: 0, prePage: 0, sort: "LIKE|DESC", first: false });
      }

      setOption(Number(value));
    },
    [state],
  );

  // ====================useCallbacks====================
  const getPageList = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setState({ ...state, prePage: state.page, page: state.page + 1, first: false });
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

  const toggleLike = (idx: number) => {
    postLike(idx);
  };

  const changeBid = (id: number) => {
    setBid(id);
  };

  const postBuy = () => {
    if (bid) {
      buy(bid);
    }
  };

  const handleClose = () => {
    setBid(undefined);
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
      <BuyModal open={bid !== undefined} close={handleClose} onClick={postBuy} />
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
          <input
            type="text"
            ref={searchRef}
            onKeyPress={enterPress}
            placeholder="아이디 & 전화번호 검색"
          />
          <img src={SearchIcon} />
        </div>
        <div className="result-box">
          <span>전체결과</span>
          <select style={{ border: "none" }} value={option} onChange={onChageOption}>
            <option value={0}>전체</option>
            <option value={1}>관심상품</option>
          </select>
        </div>

        <div className="item-list">
          {deal.map((data, idx) => (
            <DealItem {...data} key={idx} toggleLike={toggleLike} onClick={changeBid} />
          ))}
          {paging && state.page < paging.count / paging.limit - 1 && (
            <button className="more-btn" onClick={getPageList}>
              더보기
            </button>
          )}
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
}

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

  
  & > .item-list {
    margin-bottom: 72px;
  }

        
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
