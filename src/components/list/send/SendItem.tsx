/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import classnames from "classnames";

import DLIcon from "assets/icons/dl-coin.png";

interface Props {
  type: "deposit" | "send" | "transform" | "buy" | "sell";
}

function SendItem({ type }: Props) {
  const typeCheck = () => {
    if (type === "deposit") return "입금";
    if (type === "send") return "전송";
    if (type === "transform") return "딜링전환";
    if (type === "buy") return "구매";
    if (type === "sell") return "판매";
  };

  const typeBottomCheck = () => {
    if (type === "deposit") return "HOJOGroup > NeedsClear";
    if (type === "send") return "HOJOGroup > NeedsClear";
    if (type === "transform") return "1,000 CP > 100 DL 전환율 1%";
    if (type === "buy") return "상품번호 : P000258344NK";
    if (type === "sell") return "상품번호 : P000258344NK";
  };

  return (
    <Wrap>
      <div className="top-box">
        <img src={DLIcon} />
        <div className="info">
          <span className="type-info">
            {typeCheck()} <span>2020.02.02 02:02</span>
          </span>
          <span
            className={classnames("", {
              "cost-blue": type === "deposit" || type === "transform" || type === "buy",
              "cost-red": type === "send" || type === "sell",
            })}
          >
            123.123 DL
          </span>
        </div>
      </div>
      <div className="bottom-box">{typeBottomCheck()}</div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;
height: 92px;

display:flex;
flex-direction: column;
justify-content: space-between;

background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
border-radius: 6px;

padding: 12px 12px 8px 12px;
margin-bottom: 16px;

& > .bottom-box {
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;

  color: #AAAAAA;
}

& > .top-box {
  display: flex;

  & > .info {
    display:flex;
    flex-grow:1;
    flex-direction:column;
    justify-content: center;

    & > .cost-blue {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: ${({ theme }) => theme.colors.secondary_color};
    }

    & > .cost-red {
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: #EE3300;
    }
    
    
    & > .type-info {
      height: 19px;
      display:flex;
      justify-content: space-between;

      font-weight: 600;
      font-size: 14px;
      line-height: 19px;

      color: #666666;

      & > span {
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;

        color: #AAAAAA;

      }

    }
    
  }

  & > img {
      width: 48px;
      height: 48px;

      margin-right: 8px;
    }
}
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default SendItem;
