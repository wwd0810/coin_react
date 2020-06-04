import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Carousle from "components/common/carousle";
import CoinItem from "./item";
import { Account } from "stores/users/types";

import regex from "lib/regex";

interface Props {
  modalType: string;
  openModal: boolean;
  account?: Account[];
  point?: number;
  // chargePoint: (amount: number) => void;
}

function Home({ account, point }: Props) {
  // useEffect(() => {
  //   window.receivePayResponse = (res: any) => {
  //     if (res) {
  //       const { payData } = JSON.parse(res);

  //       if (payData) {
  //         const amount = Number(payData.amount);
  //         chargePoint(amount);
  //       } else {
  //         alert("결제 실패");
  //       }
  //     } else {
  //       alert("결제 실패");
  //     }
  //   };
  // }, [chargePoint]);

  return (
    <Wrap>
      <Carousle />

      <Link to="/point/charge" className="my-point">
        <span>
          {account && <span className="point-box">내 포인트</span>}
          {account ? (
            <em>
              {regex.moneyRegex(
                // Number(account?.filter((data) => data.type === "COIN_POINT")[0].quantity),
                Number(point),
              )}
              CP
            </em>
          ) : (
            <em>로그인이 필요합니다.</em>
          )}
        </span>
        <span className="charging">충전하기 ></span>
      </Link>

      <div className="item-list">
        {account
          ?.filter((data) => data.type !== "COIN_POINT")
          .map((data, idx) => (
            <CoinItem account={data} key={idx} />
          ))}

        {account && <div className="add-coin">+</div>}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;

/* position: absolute;
left: 0px;
right: 1px; */


& > .my-point {
    width: 100%;
    height: 80px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.colors.primary_color};
    border-radius: 6px;

    margin-top: 16px;
    margin-bottom: 16px;
    padding: 12px;

    & > span {
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;

        color: #FFFFFF;

        & > .point-box {
            font-size: 14px;
            line-height: 19px;

            display: flex;
            align-items: center;

            color: #FFFFFF;
        }

        & > em {
            font-weight: 600;
            font-size: 20px;
            line-height: 27px;
            display: flex;
            align-items: center;

            color: #FFFFFF;
        }
    }

    & > .charging {
        opacity: 0.6;
    }
}

& > .item-list {

  & > .add-coin{
    
    /* flex: 1 0 45%; */
    /* width: 50%; */
    height: 120px;

    background: #F7F7F7;
    border: 1px solid #DDDDDD;

    border-radius: 6px;

    font-weight: 600;
    font-size: 24px;
    line-height: 33px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #AAAAAA;

    margin-bottom: 16px;

}
}
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

& > .my-point {
    
    height: 120px;

   
}

& > .item-list {

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

& > .add-coin{
  width: 352px;
  height: 164px;

}
}

`}
`;

export default Home;
