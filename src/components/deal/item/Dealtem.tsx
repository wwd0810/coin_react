/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";

import DLCoinIcon from "assets/icons/dl-coin.png";
import KRWIcon from "assets/icons/krw-coin.png";
import PBOIcon from "assets/icons/pbo.png";

import HeartIcon from "assets/icons/heart.png";
import HeartColorIcon from "assets/icons/heart-color.png";

import { Dealing } from "stores/market/types";
import regex from "lib/regex";
import Modal from "components/common/modal";

interface Props extends Dealing {
  // deal: Dealing;
  toggleLike: (idx: number) => void;
  onClick: (id: number) => void;
}

function DealItem({
  toggleLike,
  id,
  created_at,
  isLike,
  price,
  quantity,
  seller,
  onClick,
  status,
}: Props) {
  const Today = useRef<Moment>(moment()).current;

  const [like, setLike] = useState<boolean>(false);

  const DeadLineText = useMemo(() => {
    const End = moment.utc(`${created_at}Z`);

    const duration = moment.duration(Today.diff(End));

    const days = duration.as("days");
    const hours = duration.get("hours");
    const minutes = duration.get("minutes");
    const seconds = duration.get("seconds");

    if (days >= 1) {
      return `${days.toFixed(0)}일 전`;
    } else if (hours <= 0 && minutes <= 0) {
      return `out_of_date`;
    } else if (minutes < 1) {
      return `${seconds.toFixed(0)}초 전`;
    } else if (hours < 1) {
      return `${minutes.toFixed(0)}분 전`;
    } else if (days < 1) {
      return `${hours.toFixed(0)}시간 전`;
    }
  }, [Today, created_at]);

  const onLike = useCallback(
    (e: any) => {
      e.preventDefault();

      toggleLike(id);

      setLike(!like);
    },
    [id, like, toggleLike],
  );

  const changeBid = useCallback(
    (e: any) => {
      e.preventDefault();
      onClick(id);
    },
    [id, onClick],
  );

  useEffect(() => {
    setLike(false);
    if (isLike) setLike(true);
  }, [isLike]);

  return (
    <Wrap style={{ background: status === "ON_SALE" ? "#DDDDDD" : "" }}>
      <div className="deal-info">
        <em>
          {regex.moneyRegex(Number(price))}KRW / 1DL&emsp;{DeadLineText}
        </em>
        <img src={like ? HeartColorIcon : HeartIcon} onClick={onLike} />
      </div>
      <div className="coin-info" onClick={changeBid}>
        <span>
          <img src={DLCoinIcon} />
          <em>{regex.moneyRegex(Number(quantity))} DL</em>
        </span>
        <span>
          <img src={KRWIcon} />
          <em> {regex.moneyRegex(quantity * price)} KRW</em>
        </span>
      </div>
      <div className="seller">
        {/* <img src={PBOIcon} /> */}
        {seller.name}
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

    justify-content: space-between;

    color: #AAAAAA;

  & > img {
    width: 24px;
    height: 24px;
  }
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
