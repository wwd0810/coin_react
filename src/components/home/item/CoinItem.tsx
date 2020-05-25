/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Modal from "components/common/modal";

import DLIcon from "assets/icons/dl-coin.png";
import ImportIcon from "assets/icons/import.png";
import ExportIcon from "assets/icons/export.png";

function CoinItem() {
  const [sendOpen, setSendOpen] = useState<boolean>(false);

  const handleSendOpen = () => {
    setSendOpen(true);
  };

  const handleSednClose = () => {
    setSendOpen(false);
  };

  return (
    <Wrap>
      <Modal
        open={sendOpen}
        close={handleSednClose}
        type="two"
        title="딜링(DL) 주소보내기"
        subChildren={"000000000000000"}
      >
        <div>QR코드 들어가는 부분</div>
      </Modal>
      <span className="coin-info">
        <img src={DLIcon} />
        <span className="info-box">
          <em className="info-title">딜링(DL)</em>
          <em>A2345E789</em>
        </span>
      </span>
      <div className="deal-box">
        <span className="coin-price">
          100,000<em> DL</em>
        </span>
        <div className="deal-btns">
          <button onClick={handleSendOpen}>
            <img src={ImportIcon} />
            <em>입금하기</em>
          </button>
          <Link to="/deal/send">
            <img src={ExportIcon} />
            <em>출금하기</em>
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
