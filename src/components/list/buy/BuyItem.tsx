/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import classnames from "classnames";

import Modal from "components/common/modal";

import PBOIcon from "assets/icons/pbo.png";
import PBMIcon from "assets/icons/pbm.png";
import WarnIcon from "assets/icons/warn.png";

interface Props {
  type: "apply" | "accept" | "wait" | "finish" | "expiration";
}

function BuyItem({ type }: Props) {
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

  const typeCheck = () => {
    if (type === "apply") return "구매신청(승인대기 중)";
    if (type === "accept") return "승인완료";
    if (type === "wait") return "입금 확인 중";
    if (type === "finish") return "거래완료";
    if (type === "expiration") return "기간만료";
  };

  return (
    <Wrap>
      <Modal
        open={deleteOpen}
        close={handleDeleteClose}
        type="two"
        title="신청취소 안내"
        subChildren={"취소하시겠습니까?"}
      >
        <div>
          구매신청취소는
          <br />
          1일 1회만 가능하며, 이후에는
          <br />
          신청취소가 불가합니다.
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
            <option>지체되는 입금확인</option>
            <option>기타</option>
          </select>
        }
      >
        <div>
          판매자를 신고하려면,
          <br />
          사유를 선택하여주세요.
        </div>
      </Modal>
      <Modal
        open={acceptOpen}
        close={handleAcceptClose}
        type="two"
        title="입금 완료 안내"
        subChildren={"알림을 보내시겠습니까?"}
      >
        <div>
          허위로 입금완료를
          <br />
          하는 경우, 패널티가 부가되며,
          <br />
          거래는 자동 취소됩니다.
        </div>
      </Modal>
      <Modal
        open={infoOpen}
        close={handleInfoClose}
        type="one"
        title="판매자 정보"
        subChildren={`국민 000-00-000000`}
      >
        <div>
          <span>
            <img src={PBOIcon} />
            <span>
              HOJOGroup<em> 님</em>
            </span>
          </span>
          {/* <br /> */}
          <em>보안 2 등급</em>
        </div>
      </Modal>
      <Modal open={wranOpen} close={handleWranClose} type="one" title="허위 알림 안내">
        <div>
          허위로 입금완료를
          <br />
          하는 경우, 패널티가 부가되며,
          <br />
          거래는 자동 취소됩니다.
        </div>
      </Modal>
      <div className="title">
        <div className="left-box">
          <span>P000258344NK</span>
          <em>등록일 : 2020.02.02 02:02</em>
        </div>
        {type === "wait" || type === "accept" ? (
          <div className="img-box">
            <img src={WarnIcon} onClick={handleWranOpen} />
          </div>
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
              "user-info": type !== "apply" && type !== "finish" && type !== "expiration",
              "display-none": type === "apply" || type === "finish" || type === "expiration",
            })}
          >
            <img src={type === "accept" ? PBOIcon : PBMIcon} />
            <em>HOJOGroup</em>
          </span>
        </div>
        <span
          className={classnames("", {
            "skyblue-font": type === "accept",
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
        {type === "apply" ? (
          <div>
            <button className="bg-grey" onClick={handleDeleteOpen}>
              신청 취소
            </button>
          </div>
        ) : type === "accept" ? (
          <div>
            <button className="bg-grey" onClick={handleInfoOpen}>
              판매자정보
            </button>

            <button className="bg-primary" onClick={handleAcceptOpen}>
              입금완료
            </button>
          </div>
        ) : type === "wait" ? (
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
