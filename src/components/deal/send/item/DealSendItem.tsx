/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import SendModal from "../modal";
import Keypad from "components/common/keypad";

import OpenIcon from "assets/icons/open.png";
import { Account } from "stores/users/types";
import regex from "lib/regex";

interface Props {
  account: Account;
  addr: string;
  post: (price: string) => void;
  duplicate: (pw: string) => void;
  check: boolean;
}

function DealSendItem({ account, post, addr, check, duplicate }: Props) {
  const [key, setKey] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [send, setSend] = useState<boolean>(false);

  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (check) {
      setKey(false);
      post(price.toString());
    }
  }, [check, price, post]);

  const onChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const { value } = e.target;

      if (account.quantity >= Number(value)) {
        setPrice(value);
      } else {
        alert("보유수량보다 많습니다.");
        setPrice(account.quantity.toString());
      }
    },
    [account.quantity],
  );

  const handleOpen = useCallback(
    (e: any) => {
      e.preventDefault();

      setOpen(!open);
    },
    [open],
  );

  const handSendOpen = () => {
    if (!addr) {
      alert("받는 사람을 입력해주세요.");
    } else if (!price) {
      alert("전송 수량을 입력해주세요.");
    } else {
      setSend(true);
    }
  };

  const handleSendClose = () => {
    setSend(false);
  };

  const handleKeyClose = () => {
    setKey(false);
  };

  const duplicatePin = (pw: string) => {
    duplicate(pw);
  };

  const postSend = () => {
    setSend(false);
    setKey(true);

    // post(price.toString());
  };

  return (
    <Wrap>
      <SendModal open={send} close={handleSendClose} addr={addr} quan={price} onClick={postSend} />
      <div className="title" onClick={handleOpen}>
        DL(딜링)
        <img src={OpenIcon} />
      </div>
      {key && <Keypad onPrev={handleKeyClose} go={duplicatePin} />}
      {open && (
        <div className="info">
          <div className="my-coin">
            <em>보유수량</em>
            <span>{regex.moneyRegex(Number(account.quantity))} DLC</span>
          </div>
          <div className="send-coin">
            <div>
              <em>전송수량</em>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="decimal"
                value={price}
                onChange={onChangePrice}
              />
            </div>
            <span>전송한도 : 5,000 DL / 1일</span>
            {Number(price) > account.quantity && <span>CP가 모자랍니다. CP를 충전해주세요.</span>}
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
      :last-child {
        margin-bottom: 24px;
      }
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
