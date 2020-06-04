/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";

import CPIcon from "assets/icons/cp-coin.png";
import { PointType } from "stores/users/types";
import regex from "lib/regex";
import moment from "moment";

interface Props extends PointType {
  // type?: "charge_credit" | "charge_account" | "tax";
}

function PointHistoryItem({ description, amount, created_at, title }: Props) {
  return (
    <Wrap>
      <div>
        <img src={CPIcon} />
        <div>
          <div>
            <p>{title}</p>
            <span>{moment(created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
          <p style={{ color: Number(amount) < 0 ? "#EE3300" : "#00AAFF" }}>
            {regex.moneyRegex(Number(amount))} CP
          </p>
        </div>
      </div>
      <span>{description}</span>
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;
height: 92px;

display: flex;
flex-direction: column;
justify-content: space-between;

background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
border-radius: 6px;

padding : 12px;
margin-bottom: 16px;

& > span {
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;

    color: #888888;
}

& > div {
    display: flex;
    align-items: center;

    & > img {
        width: 48px;
        height: 48px;

        margin-right: 8px;
    }

    & > div {
        width: 100%;

        & > p {
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            /* identical to box height */

            display: flex;
            align-items: center;

            color: #00AAFF; 
        }

        & > div {
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > p {
                font-weight: 600;
                font-size: 14px;
                line-height: 19px;
                /* identical to box height */

                display: flex;
                align-items: center;

                color: #444444;
            }

            & > span {
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;

                color: #888888;

            }
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

export default PointHistoryItem;
