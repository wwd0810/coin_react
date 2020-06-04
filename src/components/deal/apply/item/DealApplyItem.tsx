/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import Keypad from "components/common/keypad";

import { Account } from "stores/users/types";
import { Dealing } from "stores/market/types";

import OpenIcon from "assets/icons/open.png";
import PlusIcon from "assets/icons/plus.png";
import MinusIcon from "assets/icons/minus.png";
import MinIcon from "assets/icons/min.png";
import MaxIcon from "assets/icons/max.png";
import Modal from "components/common/modal";
import regex from "lib/regex";

interface Props {
  high?: string;
  low?: string;
  account: Account;
  product?: Dealing;
  duplicate: (pw: string) => void;
  check: boolean;
  postSell: (quantity: number, price: number) => void;
}

function DealApplyItem({ account, postSell, high, low, product, duplicate, check }: Props) {
  const [key, setKey] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [apply, setApply] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("100");
  const [quantity, setQuantity] = useState<string>("");

  useEffect(() => {
    if (product) {
      setPrice(product.price.toString());
      setQuantity(product.quantity.toString());
    }

    if (check) {
      setKey(false);

      const quan = Number(quantity);
      const pri = Number(price);

      postSell(quan, pri);
    }
  }, [product, check, quantity, price, postSell]);

  const handleOpen = useCallback(
    (e: any) => {
      e.preventDefault();

      setOpen(!open);
    },
    [open],
  );

  const handleKeyClose = () => {
    setKey(false);
  };

  const handleApplyClose = () => {
    setApply(false);
  };

  const duplicatePin = (pw: string) => {
    duplicate(pw);
  };

  const onChangePrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setPrice(value);
  }, []);

  const onChangeQuantity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const { value } = e.target;

      if (Number(account.quantity) >= Number(value)) {
        setQuantity(value);
      } else {
        alert("보유 수량보다 많습니다.");
      }
    },
    [account.quantity],
  );

  const onPost = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (quantity && price) {
        setApply(true);
      } else {
        alert("판매수량을 입력해주세요.");
      }
    },
    [price, quantity],
  );

  const onApply = () => {
    setApply(false);
    setKey(true);
  };

  const onAdd = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id } = e.target;

      if (id === "all") {
        const tmp = Number(account.quantity).toFixed(3);
        setQuantity(tmp.toString());
      } else if (id === "10000") {
        if (Number(account.quantity) > 10000) {
          setQuantity("10000");
        } else {
          alert("보유 수량보다 많습니다.");
        }
      } else if (id === "5000") {
        if (Number(account.quantity) > 5000) {
          setQuantity("5000");
        } else {
          alert("보유 수량보다 많습니다.");
        }
      } else if (id === "1000") {
        if (Number(account.quantity) > 1000) {
          setQuantity("1000");
        } else {
          alert("보유 수량보다 많습니다.");
        }
      } else {
      }
    },
    [account.quantity],
  );

  const reset = () => {
    setQuantity("");
  };

  return (
    <Wrap>
      {key && <Keypad onPrev={handleKeyClose} go={duplicatePin} />}
      <Modal
        open={apply}
        type="two"
        close={handleApplyClose}
        title="등록 안내"
        btnTitle="등록하기"
        onClick={onApply}
      >
        <ul>
          <li className="sb-box">
            판매수량<span>{regex.moneyRegex(Number(quantity))} DL</span>
          </li>
          <li className="sb-box">
            개당가격<span>{price} KRW</span>
          </li>
          <li className="sb-box">
            판매가<span>{regex.moneyRegex(Number(quantity) * Number(price))} KRW</span>
          </li>
          <li className="sb-box">
            전송 수수료<span>{regex.moneyRegex(Number(quantity) * Number(price) * 0.05)} CP</span>
          </li>
        </ul>
      </Modal>
      <div className="title" onClick={handleOpen}>
        DL(딜링)
        <img src={OpenIcon} />
      </div>
      {open && (
        <div className="info">
          <div className="my-coin">
            <em>보유수량</em>
            <span>{regex.moneyRegex(Number(account.quantity))} DLC</span>
          </div>
          <div className="apply-coin">
            <div>
              <em>판매수량</em>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="decimal"
                onChange={onChangeQuantity}
                value={quantity}
              />
            </div>
            <span className="btn-wrap">
              <button id="all" onClick={onAdd}>
                All
              </button>
              <button id="10000" onClick={onAdd}>
                +1만개
              </button>
              <button id="5000" onClick={onAdd}>
                +5천개
              </button>
              <button id="1000" onClick={onAdd}>
                +1천개
              </button>
            </span>
          </div>
          <div className="apply-coin">
            <div>
              <em>개당가격</em>
              <div className="input-wrap">
                <input
                  type="number"
                  pattern="[0-9]*"
                  inputMode="decimal"
                  style={{ paddingRight: "70px" }}
                  onChange={onChangePrice}
                  value={price}
                  readOnly
                />
                <button>
                  <img src={MinusIcon} />
                </button>
                <button className="plus">
                  <img src={PlusIcon} />
                </button>
              </div>
            </div>
            <span style={{ marginBottom: "13px" }}>
              하한가 : {low}KRW
              <img src={MaxIcon} />
              &emsp; 상한가 : {high}KRW
              <img src={MinIcon} />
            </span>
          </div>
          <div className="apply-coin">
            <div>
              <em>판매가</em>
              <span className="result">
                {regex.moneyRegex(Number(price) * Number(quantity))}
                <em>KRW</em>
              </span>
            </div>
            <span style={{ marginTop: "0px" }}>
              전송한도 : 5,000 DL / 1일
              <br />
              CP가 모자랍니다. CP를 충전해주세요.
            </span>
          </div>

          <div className="btn-box">
            <button onClick={reset}>초기화</button>
            <button onClick={onPost}>다음</button>
          </div>
          <div className="notice">
            - 1일 최대 5,000 DL까지 전송가능합니다.
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

padding: 16px;

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
  & > a, button {
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

& > .apply-coin {

  margin-bottom: 6px;

  & > .btn-wrap {
    margin-bottom: 12px;
    & > button {
      width: 40px;
      height: 20px;
      background: #EEEEEE;

      font-size: 12px;
    line-height: 16px;

    color: #444444;

      margin-left: 4px;
    }
  }

  & > div {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > .result {
      font-weight: 600;
      font-size: 28px;
      line-height: 38px;

      color: #2233AA;

      &  > em {
        font-size: 14px;
        
      }

    }


    & > .input-wrap {
      width: 100%;
      position: relative;

      & > button {
            position: absolute;
            top: 8px;
            right: 36px;
            width: 24px;
            height: 24px;

            background: #eeeeee;   

            & > img {
              width: 24px;
              height: 24px;
            }
        }

        & > .plus {
          right: 8px;
        }

    }

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

    & > img {
      width: 12px;
      height: 12px;
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

export default DealApplyItem;
