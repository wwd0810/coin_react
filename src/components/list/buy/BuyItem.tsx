/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";
import moment from "moment";
import Modal from "components/common/modal";

import PBOIcon from "assets/icons/pbo.png";
import PBMIcon from "assets/icons/pbm.png";
import WarnIcon from "assets/icons/warn.png";
import { Dealing } from "stores/market/types";
import regex from "lib/regex";

interface Props extends Dealing {
  deposit: (id: number, purId: number) => void;
  cancle: (id: number, purId: number) => void;
  report: (id: number, purId: number, reason: string) => void;
}

function BuyItem({
  quantity,
  price,
  created_at,
  updated_at,
  seller,
  id,
  purchase,
  status,
  deposit,
  report,
  cancle,
}: Props) {
  const [opitonReport, setOptionReport] = useState<string>("사유선택");
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [acceptOpen, setAcceptOpen] = useState<boolean>(false);
  const [declarationOpen, setDeclarationOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [wranOpen, setWranOpen] = useState<boolean>(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleAcceptOpen = () => {
    setAcceptOpen(true);
  };

  const handleAcceptClose = () => {
    setAcceptOpen(false);
  };

  const handleDeclarationOpen = () => {
    setDeclarationOpen(true);
  };

  const handleDeclarationClose = () => {
    setDeclarationOpen(false);
  };

  const handleInfoOpen = () => {
    setInfoOpen(true);
  };

  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const handleWranOpen = () => {
    setWranOpen(true);
  };

  const handleWranClose = () => {
    setWranOpen(false);
  };

  const depositF = () => {
    if (purchase) {
      setAcceptOpen(false);
      deposit(id, purchase?.id);
    }
  };

  const reportF = () => {
    if (purchase) {
      setDeclarationOpen(false);
      report(id, purchase?.id, opitonReport);
    }
  };

  const cancleF = () => {
    if (purchase) {
      setDeleteOpen(false);
      cancle(id, purchase?.id);
    }
  };

  const onChangeOptionReport = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setOptionReport(value);
  }, []);

  const typeCheck = () => {
    // if (type === "apply") return "구매신청(승인대기 중)";
    // if (type === "accept") return "승인완료";
    // if (type === "wait") return "입금 확인 중";
    // if (type === "finish") return "거래완료";
    // if (type === "expiration") return "기간만료";

    if (status === "ON_SALE" && purchase?.status === "WAITING_FOR_APPROVAL")
      return "구매신청(승인대기 중)";
    if (status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT") return "승인완료";
    if (status === "ON_SALE" && purchase?.status === "DEPOSIT_COMPLETED") return "입금 확인 중";
    if (status === "DONE") return "거래완료";
    if (status === "INIT" && purchase?.status === "DENY") return "거래거절";
    if (status === "EXPIRED") return "기간만료";
  };

  return (
    <Wrap>
      <Modal
        open={deleteOpen}
        close={handleDeleteClose}
        type="two"
        title="신청취소 안내"
        onClick={cancleF}
      >
        <ul>
          <li>구매신청취소는</li>
          <li>1일 1회만 가능하며, 이후에는</li>
          <li>신청취소가 불가합니다.</li>
        </ul>
      </Modal>
      <Modal
        open={declarationOpen}
        close={handleDeclarationClose}
        type="two"
        title="신고 안내"
        onClick={reportF}
        subChildren={
          <select onChange={onChangeOptionReport} value={opitonReport}>
            <option value="사유선택">사유선택</option>
            <option value="구매자 인증 미비">허위 입금알림</option>
            <option value="다른 구매자에게 판매">잘못된 입금금액</option>
            <option value="판매중지 / 상품 삭제 예정">기타</option>
          </select>
        }
      >
        <ul>
          <li>판매자를 신고하려면,</li>
          <li>사유를 선택하여주세요.</li>
        </ul>
      </Modal>
      <Modal
        open={acceptOpen}
        close={handleAcceptClose}
        type="two"
        title="입금 완료 안내"
        onClick={depositF}
      >
        <ul>
          <li>허위로 입금완료를</li>
          <li>하는 경우, 패널티가 부가되며,</li>
          <li>거래는 자동 취소됩니다.</li>
        </ul>
      </Modal>
      <Modal
        open={infoOpen}
        close={handleInfoClose}
        type="one"
        title="판매자 정보"
        subChildren={<div>국민 {purchase?.buyer.phone}</div>}
      >
        <ul>
          <li>{purchase?.buyer.name} 님</li>
          <li>보안등급 1 등급</li>
        </ul>
      </Modal>
      <Modal open={wranOpen} close={handleWranClose} type="one" title="허위 알림 안내">
        <ul>
          <li>허위로 입금완료를</li>
          <li>하는 경우, 패널티가 부가되며,</li>
          <li>거래는 자동 취소됩니다.</li>
        </ul>
      </Modal>
      <div className="title">
        <div className="left-box">
          <span>P000258344NK</span>
          <em>등록일 : {moment(created_at).format("YYYY-MM-DD HH:mm")}</em>
        </div>
        {(status === "ON_SALE" && purchase?.status === "DEPOSIT_COMPLETED ") ||
        (status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT") ? (
          <div className="img-box">
            <img src={WarnIcon} onClick={handleWranOpen} />
          </div>
        ) : null}
      </div>
      <div className="info">
        <div>
          <span>결제 금액</span>
          <span className="krw">{regex.moneyRegex(Number(quantity) * Number(price))} KRW(원)</span>
        </div>
        <div>
          <span>코인 수량</span>
          <span>{regex.moneyRegex(Number(quantity))} DL(딜링)</span>
        </div>
        <div>
          <span>개당 가격</span>
          <span>{regex.moneyRegex(Number(price))} KRW(원)</span>
        </div>
      </div>
      <div className="status">
        <div>
          <span
            className={classnames("user-info", {
              "user-info":
                purchase?.status === "WAITING_FOR_APPROVAL" &&
                status !== "DONE" &&
                status !== "EXPIRED",
              "display-none":
                (status === "ON_SALE" && purchase?.status === "WAITING_FOR_APPROVAL") ||
                status === "DONE" ||
                status === "EXPIRED",
            })}
          >
            {/* <img
              src={
                status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT"
                  ? PBOIcon
                  : PBMIcon
              }
            /> */}
            <em>{seller.name}</em>
          </span>
        </div>
        <span
          className={classnames("", {
            "skyblue-font":
              (status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT") ||
              (status === "INIT" && purchase?.status === "DENY"),
          })}
        >
          {typeCheck()} : {moment(updated_at).format("MM.DD HH:mm")}
        </span>
      </div>
      <div
        className={classnames("btn-box", {
          "display-none":
            status === "EXPIRED" ||
            status === "DONE" ||
            (status === "INIT" && purchase?.status === "DENY"),
        })}
      >
        {status === "ON_SALE" && purchase?.status === "WAITING_FOR_APPROVAL" ? (
          <div>
            <button className="bg-grey" onClick={handleDeleteOpen}>
              신청 취소
            </button>
          </div>
        ) : status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT" ? (
          <div>
            <button className="bg-grey" onClick={handleInfoOpen}>
              판매자정보
            </button>

            <button className="bg-primary" onClick={handleAcceptOpen}>
              입금완료
            </button>
          </div>
        ) : status === "ON_SALE" && purchase?.status === "DEPOSIT_COMPLETED" ? (
          <div>
            <button className="bg-primary" onClick={handleDeclarationOpen}>
              판매자 신고
            </button>
          </div>
        ) : null}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;


box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
border-radius: 6px;
  
margin-bottom: 16px;

& > .title {
    height: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;    

    padding : 7px 12px;

    & > .img-box {
      & > img {
        width: 24px;
        height: 24px;
      }
      & > img:last-child {
        margin-left: 12px;
      }
    }

    & > .left-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & > span {
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        

        display: flex;
        align-items: center;

        color: ${({ theme }) => theme.colors.primary_color};

    }   
    
    & > em {
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;

        color: ${({ theme }) => theme.colors.font_grey};

    }
    }

    
}

& > .info {
    height: 75px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding : 8px 12px;

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: center;

        color: ${({ theme }) => theme.colors.dark_grey_color};

        & > .krw {
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
        }

    }
}

& > .status {
    height: 32px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding : 4px 12px;
    color: #AAAAAA;
    & > span {
        font-size: 12px;
        /* line-height: 16px;  */
    }

    & > div {

        & > span {

            & > img {
                width: 24px;
                height: 24px;

                margin-right: 8px;
            }
        }

        & > .user-info{
            display: flex;
            align-items: center;

            & > img {
                width: 24px;
                height: 24px;

                margin-right: 8px;
            }

            & > em {
                font-weight: 600;
                font-size: 12px;
                /* line-height: 16px; */

                color: ${({ theme }) => theme.colors.dark_grey_color};

            }
        }

        
    }
}

& > .btn-box {
    height: 48px;

    padding : 8px 12px;

    & > div {
        display: flex;
        & > button {
            width: 100%;
            height: 32px;

            
            font-size: 14px;
            line-height: 19px;
            color: white;

            margin-right: 8px;
        }

        & > button:last-child {
            margin-right: 0px;
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

export default BuyItem;
