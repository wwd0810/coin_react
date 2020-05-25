/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import OpenIcon from "assets/icons/open.png";
import PlusIcon from "assets/icons/plus.png";
import MinusIcon from "assets/icons/minus.png";
import MinIcon from "assets/icons/min.png";
import MaxIcon from "assets/icons/max.png";

function DealApplyItem() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = useCallback(
    (e: any) => {
      e.preventDefault();

      setOpen(!open);
    },
    [open],
  );

  return (
    <Wrap>
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
          <div className="apply-coin">
            <div>
              <em>판매수량</em>
              <input type="number" />
            </div>
            <span className="btn-wrap">
              <button>All</button>
              <button>+1만개</button>
              <button>+5천개</button>
              <button>+1천개</button>
            </span>
          </div>
          <div className="apply-coin">
            <div>
              <em>개당가격</em>
              <div className="input-wrap">
                <input type="number" />
                <button>
                  <img src={MinusIcon} />
                </button>
                <button className="plus">
                  <img src={PlusIcon} />
                </button>
              </div>
            </div>
            <span style={{ marginBottom: "13px" }}>
              하한가 : 90KRW
              <img src={MaxIcon} />
              &emsp; 상한가 : 110KRW
              <img src={MinIcon} />
            </span>
          </div>
          <div className="apply-coin">
            <div>
              <em>판매가</em>
              <span className="result">
                2,000<em>KRW</em>
              </span>
            </div>
            <span style={{ marginTop: "0px" }}>
              전송한도 : 5,000 DL / 1일
              <br />
              CP가 모자랍니다. CP를 충전해주세요.
            </span>
          </div>

          <div className="btn-box">
            <button>초기화</button>
            <Link to="/keypad/apply">다음</Link>
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
