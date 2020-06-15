/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";
import moment from "moment";
import Modal from "components/common/modal";

import PBOIcon from "assets/icons/pbo.png";
import PBMIcon from "assets/icons/pbm.png";
import HelpIcon from "assets/icons/help.png";
import { Dealing } from "stores/market/types";
import regex from "lib/regex";
import { Link } from "react-router-dom";

interface Props extends Dealing {
  type: string;
  del: (idx: number) => void;
  deny: (id: number, purId: number, reason: string) => void;
  accept: (id: number, purId: number) => void;
  report: (id: number, purId: number, reason: string) => void;
  done: (id: number, purId: number) => void;
}

function SellItem({
  type,
  quantity,
  price,
  created_at,
  updated_at,
  seller,
  id,
  purchase,
  status,
  del,
  deny,
  accept,
  report,
  done,
}: Props) {
  const [option, setOption] = useState<string>("사유선택");
  const [opitonReport, setOptionReport] = useState<string>("사유선택");
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const [acceptOpen, setAcceptOpen] = useState<boolean>(false);
  const [declarationOpen, setDeclarationOpen] = useState<boolean>(false);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);

  const handleFinishOpen = () => {
    setFinish(true);
  };

  const handleFinishClose = () => {
    setFinish(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleRejectOpen = () => {
    setRejectOpen(true);
  };

  const handleRejectClose = () => {
    setRejectOpen(false);
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

  const handleHelpOpen = () => {
    setHelpOpen(true);
  };

  const handleHelpClose = () => {
    setHelpOpen(false);
  };

  const handleInfoOpen = () => {
    setInfoOpen(true);
  };

  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const deleteMarket = () => {
    setDeleteOpen(false);
    del(id);
  };

  const productCode = (id: number) => {
    const str = "00000000000" + id.toString();

    return str.slice(-10);
  };

  const onChangeOption = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setOption(value);
  }, []);

  const onChangeOptionReport = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setOptionReport(value);
  }, []);

  const denyF = () => {
    if (purchase) {
      setRejectOpen(false);
      deny(id, purchase?.id, option);
    }
  };

  const acceptF = () => {
    if (purchase) {
      setAcceptOpen(false);
      accept(id, purchase?.id);
    }
  };

  const doneF = () => {
    if (purchase) {
      setFinish(false);
      done(id, purchase?.id);
    }
  };

  const reportF = () => {
    if (purchase) {
      setDeclarationOpen(false);
      report(id, purchase?.id, opitonReport);
    }
  };

  const typeCheck = () => {
    if (status === "INIT") return "판매중";
    if (status === "ON_SALE" && purchase?.status === "WAITING_FOR_APPROVAL") return "구매신청받음";
    if (status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT") return "입금대기 중";
    if (status === "ON_SALE" && purchase?.status === "DEPOSIT_COMPLETED") return "입금완료";
    if (status === "DONE") return "거래완료";
    if (status === "EXPIRED") return "기간만료";
    if (status === "CANCEL") return "취소";
  };

  return (
    <Wrap>
      <Modal
        open={finish}
        close={handleFinishClose}
        type="two"
        title="안내"
        onClick={doneF}
        subChildren={<div>판매하시겠습니까?</div>}
      >
        <ul>
          <li>입금확인 및 판매를 하는 경우</li>
          <li>거래를 되돌릴 수 없습니다.</li>
        </ul>
      </Modal>
      <Modal
        open={deleteOpen}
        close={handleDeleteClose}
        type="one"
        title="물품삭제 안내"
        onClick={deleteMarket}
        subChildren={<div>삭제하시겠습니까?</div>}
      >
        <ul>
          <li>삭제한 물품은</li>
          <li>다시복구가 불가능합니다.</li>
        </ul>
      </Modal>
      <Modal
        open={rejectOpen}
        close={handleRejectClose}
        type="two"
        title="판매거절 안내"
        onClick={denyF}
        subChildren={
          <select onChange={onChangeOption} value={option}>
            <option value="사유선택">사유선택</option>
            <option value="구매자 인증 미비">구매자 인증 미비</option>
            <option value="다른 구매자에게 판매">다른 구매자에게 판매</option>
            <option value="판매중지 / 상품 삭제 예정">판매중지 / 상품 삭제 예정</option>
            <option value="기타">기타</option>
          </select>
        }
      >
        <ul>
          <li>판매를 거절하시려면,</li>
          <li>사유를 선택해주세요.</li>
        </ul>
      </Modal>
      <Modal
        open={acceptOpen}
        close={handleAcceptClose}
        type="one"
        title="거래승인 안내"
        onClick={acceptF}
      >
        <ul>
          <li>거래승인 이후 회원님 계좌로의</li>
          <li>구매자 입금내역을 확인하세요.</li>
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
          <li>구매자를 신고하려면,</li>
          <li>사유를 선택하여주세요.</li>
        </ul>
      </Modal>
      <Modal open={helpOpen} close={handleHelpClose} type="two" title="안내">
        <ul>
          <li>입금완료 알림 후 3시간 내에</li>
          <li>확인이 이루어지지 않으면 구매자에게</li>
          <li></li>
        </ul>
      </Modal>
      <Modal
        open={infoOpen}
        close={handleInfoClose}
        type="one"
        title="구매자 정보"
        subChildren={<div>국민 {purchase?.buyer.phone}</div>}
      >
        <ul>
          <li>{purchase?.buyer.name} 님</li>
          <li>보안등급 1 등급</li>
        </ul>
      </Modal>
      <div className="title">
        <div className="left-box">
          <span>P{productCode(id)}NK</span>
          <em>등록일 : {moment(created_at).format("YYYY-MM-DD HH:MM")}</em>
        </div>
        {status === "ON_SALE" && purchase?.status === "WAITING_FOR_DEPOSIT" ? (
          <img src={HelpIcon} onClick={handleHelpOpen} />
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
            className={classnames("", {
              "user-info": status !== "INIT" && status !== "DONE " && status !== "EXPIRED",
              "display-none": status === "INIT" || status === "DONE " || status === "EXPIRED",
            })}
          >
            {/* <img
              src={
                status === "ON_SALE" && purchase?.status === "WAITING_FOR_APPROVAL"
                  ? PBOIcon
                  : PBMIcon/>
              } */}

            <em>{purchase?.buyer.name}</em>
          </span>
        </div>
        <span
          className={classnames("", {
            "red-font": status === "INIT",
            "skyblue-font": status === "ON_SALE" && purchase?.status === "DEPOSIT_COMPLETED",
          })}
        >
          {typeCheck()} : {moment(updated_at ? updated_at : created_at).format("MM.DD HH:mm")}
        </span>
      </div>
      <div
        className={classnames("btn-box", {
          "display-none": status === "EXPIRED" || status === "DONE" || status === "CANCEL",
        })}
      >
        {status === "INIT" ? (
          <div>
            <button className="bg-grey" onClick={handleDeleteOpen}>
              삭제하기
            </button>
            <Link to={`/deal/modify/${id}`} className="bg-primary">
              수정하기
            </Link>
          </div>
        ) : status === "ON_SALE" && purchase?.status === "WAITING_FOR_APPROVAL" ? (
          <div>
            <button className="bg-grey" onClick={handleInfoOpen}>
              구매자정보
            </button>
            <button className="bg-grey" onClick={handleRejectOpen}>
              거절
            </button>
            <button className="bg-primary" onClick={handleAcceptOpen}>
              승인
            </button>
          </div>
        ) : status === "ON_SALE" && purchase?.status === "DEPOSIT_COMPLETED" ? (
          <div>
            <button className="bg-grey" onClick={handleDeclarationOpen}>
              구매자 신고
            </button>
            <button className="bg-primary" onClick={handleFinishOpen}>
              확인 및 판매
            </button>
          </div>
        ) : null}
      </div>
    </Wrap>
  );
}

// ||
//             purchase?.status === "WAITING_FOR_DEPOSIT"

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

    & > img {
        width: 24px;
        height: 24px;
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
        & > button, a {
            width: 50%;
            height: 32px;

            
            font-size: 14px;
            line-height: 19px;
            color: white;

            display: flex;
            justify-content: center;
            align-items: center;

            margin-right: 8px;

            :last-child {
            margin-right: 0px;
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

export default SellItem;
