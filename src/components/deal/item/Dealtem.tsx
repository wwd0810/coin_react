/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";

import DLCoinIcon from "assets/icons/dl-coin.png";
import KRWIcon from "assets/icons/krw-coin.png";
import PBOIcon from "assets/icons/pbo.png";
import { Dealing } from "stores/market/types";
import regex from "lib/regex";

interface Props {
  deal: Dealing;
}

function DealItem({ deal }: Props) {
  return (
    <Wrap>
      <div className="deal-info">
        <em>{deal.price * 1}KRW / 1DL&emsp;5분전</em>
      </div>
      <div className="coin-info">
        <span>
          <img src={DLCoinIcon} />
          <em>{deal.quantity * 1} DL</em>
        </span>
        <span>
          <img src={KRWIcon} />
          <em> {regex.moneyRegex(deal.quantity * deal.price)} KRW</em>
        </span>
      </div>
      <div className="seller">
        <img src={PBOIcon} />
        ondlc_buyer
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;
height: 113px;
left: 16px;
top: 244px;

background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
border-radius: 6px;

display: flex;
flex-direction: column;
justify-content: space-between;

padding : 12px;

margin-bottom : 16px;

& > .deal-info {
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;

    color: #AAAAAA;
}

& > .coin-info {
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    display: flex;
    align-items: center;

    color: ${({ theme }) => theme.colors.primary_color};

    & > span {
        margin-right: 24px;
        & > img {
            width: 24px;
            height: 24px;

            margin-right: 12px;
        }
    }
}

& > .seller {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;

    color: #666666;

    & > img {
        width: 24px;
        height: 24px;

        margin-right: 12px;
    }
}

  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default DealItem;
