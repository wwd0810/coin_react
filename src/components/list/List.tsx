/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";

import SearchIcon from "assets/icons/search.png";
import SellItem from "./sell";
import BuyItem from "./buy";
import SendItem from "./send";

function List() {
  const [selected, setSelected] = useState<number>(0);

  const onChangeMenu = useCallback((e: any) => {
    e.preventDefault();

    const { id } = e.target;

    setSelected(Number(id));
  }, []);

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
            <div className="select-box">
              <select>
                <option>전체(기간)</option>
              </select>
              <select>
                <option>전체(상태)</option>
              </select>
            </div>
          ) : null}
          <div className="input-box">
            <input type="text" />
            <img src={SearchIcon} />
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <span className="result-box">
          <em>전체결과</em>
          <select style={{ width: "72px" }}>
            {selected !== 2 ? (
              <>
                <option>최신순</option>
              </>
            ) : (
              <>
                <option>전체</option>
                <option>입금</option>
                <option>출금</option>
              </>
            )}
          </select>
        </span>
        {selected === 0 ? (
          <>
            <SellItem type="sell" />
            <SellItem type="apply" />
            <SellItem type="wait" />
            <SellItem type="init" />
            <SellItem type="finish" />
            <SellItem type="expiration" />
          </>
        ) : selected === 1 ? (
          <>
            <BuyItem type="apply" />
            <BuyItem type="accept" />
            <BuyItem type="wait" />
            <BuyItem type="finish" />
            <BuyItem type="expiration" />
          </>
        ) : (
          <>
            <SendItem type="deposit" />
            <SendItem type="send" />
            <SendItem type="transform" />
            <SendItem type="buy" />
            <SendItem type="sell" />
          </>
        )}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

& > .bottom-box {

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
        width:50%;
        border: 1px solid  ${({ theme }) => theme.colors.grey_color};

        border-radius: 0;
      }

      & > select:first-child {
        margin-right: 8px;
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
