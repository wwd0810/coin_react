/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import classnames from "classnames";

import Modal from "components/common/modal";

import PBOIcon from "assets/icons/pbo.png";
import PBMIcon from "assets/icons/pbm.png";
import HelpIcon from "assets/icons/help.png";

interface Props {
  type: "sell" | "apply" | "wait" | "init" | "finish" | "expiration";
}

function SellItem({ type }: Props) {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const [acceptOpen, setAcceptOpen] = useState<boolean>(false);
  const [declarationOpen, setDeclarationOpen] = useState<boolean>(false);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

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

  const typeCheck = () => {
    if (type === "sell") return "판매중";
    if (type === "apply") return "구매신청받음";
    if (type === "wait") return "입금대기 중";
    if (type === "init") return "입금완료";
    if (type === "finish") return "거래완료";
    if (type === "expiration") return "기간만료";
  };

  return (
    <Wrap>
      <Modal
        open={deleteOpen}
        close={handleDeleteClose}
        type="one"
        title="물품삭제 안내"
        subChildren={"삭제하시겠습니까?"}
      >
        <div>
          삭제한 물품은
          <br />
          다시복구가 불가능합니다.
        </div>
      </Modal>
      <Modal
        open={rejectOpen}
        close={handleRejectClose}
        type="two"
        title="판매거절 안내"
        subChildren={
          <select>
            <option>사유선택</option>
            <option>구매자 인증 미비</option>
            <option>다른 구매자에게 판매</option>
            <option>판매중지 / 상품 삭제 예정</option>
            <option>기타</option>
          </select>
        }
      >
        <div>
          판매를 거절하시려면,
          <br />
          사유를 선택해주세요.
        </div>
      </Modal>
      <Modal
        open={acceptOpen}
        close={handleAcceptClose}
        type="one"
        title="거래승인 안내"
        subChildren={"승인하시겠습니까?"}
      >
        <div>
          거래승인 이후 회원님 계좌로의
          <br />
          구매자 입금내역을 확인하세요.
        </div>
      </Modal>
      <Modal
        open={declarationOpen}
        close={handleDeclarationClose}
        type="two"
        title="신고 안내"
        subChildren={
          <select>
            <option>사유선택</option>
            <option>허위 입금알림</option>
            <option>잘못된 임금금액</option>
            <option>기타</option>
          </select>
        }
      >
        <div>
          구매자를 신고하려면,
          <br />
          사유를 선택하여주세요.
        </div>
      </Modal>
      <Modal open={helpOpen} close={handleHelpClose} type="two" title="안내">
        <div>
          입금완료 알림 후 3시간 내에
          <br />
          확인이 이루어지지 않으면 구매자에게
          <br />
          회원님의 연락처가 공개됩니다.
        </div>
      </Modal>
      <Modal
        open={infoOpen}
        close={handleInfoClose}
        type="one"
        title="구매자 정보"
        subChildren={`계좌인증을 완료하지 않은 구매자입니다.`}
      >
        <div>
          <span>
            <img src={PBOIcon} />
            <span>
              HOJOGroup<em> 님</em>
            </span>
          </span>
          {/* <br /> */}
          <em>보안 1 등급</em>
        </div>
      </Modal>
      <div className="title">
        <div className="left-box">
          <span>P000258344NK</span>
          <em>등록일 : 2020.02.02 02:02</em>
        </div>
        {type === "wait" || type === "init" ? (
          <img src={HelpIcon} onClick={handleHelpOpen} />
        ) : null}
      </div>
      <div className="info">
        <div>
          <span>결제 금액</span>
          <span className="krw">152,000 KRW(원)</span>
        </div>
        <div>
          <span>코인 수량</span>
          <span>100 DL(딜링)</span>
        </div>
        <div>
          <span>개당 가격</span>
          <span>1.520 KRW(원)</span>
        </div>
      </div>
      <div className="status">
        <div>
          <span
            className={classnames("", {
              "user-info": type !== "sell" && type !== "finish" && type !== "expiration",
              "display-none": type === "sell" || type === "finish" || type === "expiration",
            })}
          >
            <img src={type === "apply" ? PBOIcon : PBMIcon} />
            <em>HOJOGroup</em>
          </span>
        </div>
        <span
          className={classnames("", {
            "red-font": type === "sell",
            "skyblue-font": type === "apply" || type === "init",
          })}
        >
          {typeCheck()} : 02.02 02:30
        </span>
      </div>
      <div
        className={classnames("btn-box", {
          "display-none": type === "expiration" || type === "finish",
        })}
      >
        {type === "sell" ? (
          <div>
            <button className="bg-grey" onClick={handleDeleteOpen}>
              삭제하기
            </button>
            <button className="bg-primary">수정하기</button>
          </div>
        ) : type === "apply" ? (
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
        ) : type === "wait" || type === "init" ? (
          <div>
            <button className="bg-grey" onClick={handleDeclarationOpen}>
              구매자 신고
            </button>
            <button className="bg-primary">확인 및 판매</button>
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
        & > button {
            width: 50%;
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

export default SellItem;
