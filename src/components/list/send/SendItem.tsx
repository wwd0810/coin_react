/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import classnames from "classnames";

import DLIcon from "assets/icons/dl-coin.png";
import { PointType, Account } from "stores/users/types";
import regex from "lib/regex";
import moment from "moment";

interface Props extends PointType {
  account?: Account;
}

function SendItem({ title, amount, created_at, to_user, from_user, to, from, account }: Props) {
  const typeBottomCheck = () => {
    if (title === "입금") return `${from_user?.name} > ${to_user?.name}`;
    if (title === "전송") return `${from_user?.name} > ${to_user?.name}`;
    if (title === "구매") return "상품번호 : P000258344NK";
    if (title === "판매") return "상품번호 : P000258344NK";
  };

  const titleCheck = () => {
    if (account) {
      const id = account.id;

      if (title.includes("구매")) {
        if (to.id === id) return "구매";

        if (from.id === id) return "판매";
      }

      if (title.includes("전송")) {
        if (to.id === id) return "입금";

        if (from.id === id) return "전송";
      }

      if (title.includes("환불")) {
        return "환불";
      }

      return "알수 없음";
    }
  };

  return (
    <Wrap>
      <div className="top-box">
        <img src={DLIcon} />
        <div className="info">
          <span className="type-info">
            {titleCheck()} <span>{moment(created_at).format("YYYY-MM-DD HH:mm")}</span>
          </span>
          <span
            className={classnames("", {
              "cost-blue":
                titleCheck() === "입금" || titleCheck() === "구매" || titleCheck() === "환불",
              "cost-red": titleCheck() === "전송" || titleCheck() === "판매",
            })}
          >
            {regex.moneyRegex(Number(amount))} DL
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
