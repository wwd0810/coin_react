/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";

import Modal from "components/common/modal";

import { Account } from "stores/users/types";

import DLIcon from "assets/icons/dl-coin.png";
import ImportIcon from "assets/icons/import.png";
import ExportIcon from "assets/icons/export.png";
import CopyIcon from "assets/icons/copy.png";
import regex from "lib/regex";

interface Props {
  account: Account;
}

function CoinItem({ account }: Props) {
  const [sendOpen, setSendOpen] = useState<boolean>(false);

  const handleSendOpen = () => {
    setSendOpen(true);
  };

  const handleSednClose = () => {
    setSendOpen(false);
  };

  const copy = () => {
    alert("클립보드에 복사되었습니다.");
  };

  const share = () => {
    window.ReactNativeWebView?.postMessage(`addrShare|${account.id}`);
  };

  return (
    <Wrap>
      <Modal
        open={sendOpen}
        close={handleSednClose}
        type="two"
        title="딜링(DL) 주소보내기"
        btnTitle="QR공유"
        onClick={share}
        subChildren={
          <div>
            <img src={CopyIcon} />
            {account.id}
          </div>
        }
      >
        <CopyToClipboard text={account.id} onCopy={copy}>
          <QRCode value={account.id} size={96} />
        </CopyToClipboard>
      </Modal>
      <span className="coin-info">
        <img src={DLIcon} />
        <span className="info-box">
          <em className="info-title">딜링(DL)</em>
          <em>{account && account.id}</em>
        </span>
      </span>
      <div className="deal-box">
        <span className="coin-price">
          {account && regex.moneyRegex(Number(account.quantity))}
          <em> DL</em>
        </span>
        <div className="deal-btns">
          <button onClick={handleSendOpen}>
            <img src={ImportIcon} />
            <em>입금하기</em>
          </button>
          <Link to="/deal/send">
            <img src={ExportIcon} />
            <em>딜링보내기</em>
          </Link>
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

flex: 1 0 45%;

height: 164px;

display: flex;

flex-direction: column;
justify-content: space-between;

background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
border-radius: 6px;

margin-bottom: 16px;

& > .coin-info {
    display: flex;
    align-items: center;

    padding: 12px;

    & > img {
        width: 32px;
        height: 32px;
    }

    & > .info-box {
        display: flex;
        flex-direction: column;

        margin-left: 4px; 

        
        & > em {
            font-size: 14px;
            line-height: 19px;

            display: flex;
            align-items: center;

            color: #AAAAAA;
        }

        & > .info-title {
            font-weight: 600;
            color: ${({ theme }) => theme.colors.primary_color};
        }
    }
}

& > .deal-box {
    display: flex;
    flex-direction: column;

    & > .coin-price {
        font-weight: 600;
        font-size: 28px;
        line-height: 38px;
        text-align: right;

        color: ${({ theme }) => theme.colors.secondary_color};

        padding: 8px 12px;

        & > em {
            font-size: 14px;
        }
    }

    & > .deal-btns {
        display: flex;

        & > button, a {
            height: 40px;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-grow: 1;

            & > img {
            width: 24px;
            height: 24px;

            margin-right: 13px;
        }

            & > em {
                font-size: 14px;
                line-height: 19px;

                color: #666666;

            }
        }

    }
}
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`
  // width: 50%;

  margin-right: 16px;

  :nth-child(2n) {
    margin-right: 0px;
  }
`}
`;

export default CoinItem;
