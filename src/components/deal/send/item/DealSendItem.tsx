/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Modal from "components/common/modal";

import OpenIcon from "assets/icons/open.png";

function DealSendItem() {
  const [open, setOpen] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);

  const handleOpen = useCallback(
    (e: any) => {
      e.preventDefault();

      setOpen(!open);
    },
    [open],
  );

  const handSendOpen = () => {
    setSend(true);
  };

  const handleSendClose = () => {
    setSend(false);
  };

  return (
    <Wrap>
      <Modal
        open={send}
        close={handleSendClose}
        type="two"
        title="전송 안내"
        // subChildren={"취소하시겠습니까?"}
      >
        <div>
          전송 주소
          <br />
          전송 수량
          <br />
          전송 수수료
        </div>
      </Modal>
      <div className="title" onClick={handleOpen}>
        DL(딜링)
        <img src={OpenIcon} />
      </div>
      {open && (
        <div className="info">
          <div className="my-coin">
            <em>보유수량</em>
            <span>520 DLC</span>
          </div>
          <div className="send-coin">
            <div>
              <em>전송수량</em>
              <input type="number" />
            </div>
            <span>
              전송한도 : 5,000 DL / 1일
              <br />
              CP가 모자랍니다. CP를 충전해주세요.
            </span>
          </div>
          <div className="btn-box">
            <button>초기화</button>
            <button onClick={handSendOpen}>다음</button>
          </div>
          <div className="notice">
            - 1일 최대 5,000 DL까지 전송가능합니다.
            <br /> - 유의사항을 적어주세요.
            <br /> - 유의사항을 적어주세요.
            <br /> - 유의사항을 적어주세요.
            <br /> - 유의사항을 적어주세요.
            <br /> - 유의사항을 적어주세요.
            <br /> - 유의사항을 적어주세요.
          </div>
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

& > .info {

  & > .notice {
    font-size: 12px;
    line-height: 16px;

    color: #888888;

    margin-top:24px;

  }


  & > .btn-box {
    height: 40px;
    display: flex;
    & > button {
      width: 50%;

      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      display: flex;
      align-items: center;
      justify-content: center;

      color: #FFFFFF;

      background: #2233AA;
      :first-child {
        margin-right: 8px;

        background: #999999;
      }
    }
  }

  & > .my-coin {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 12px;

    & > span {
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      display: flex;
      align-items: center;
      text-align: right;

      color: #444444;

    }
  }

  & > .send-coin {

    margin-bottom: 6px;
    & > div {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

    &  > em {
      width: 80px;
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      display: flex;
      align-items: center;

      color: #444444;

    
      }
    }

    & > span {
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      color: #888888;
      margin-top: 6px;
      margin-bottom: 24px;
    }
  }

  & > div > em {
    width: 80px;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #444444;
  }
}

& > .title {

  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;

  color: #2233AA;

  border-bottom: 2px solid ${({ theme }) => theme.colors.primary_color};

  margin-bottom: 8px;

  & > img {
    width: 24px;

    height: 24px;
  }
}
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default DealSendItem;
