import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";
import { Account, User } from "stores/users/types";
import regex from "lib/regex";

interface Props {
  user?: User;
  account?: Account;
  chargePoint: (amount: number) => void;
}

function PointCharge({ account, chargePoint, user }: Props) {
  const [selected, setSelected] = useState<number>(0);
  const [charge, setCharge] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);

  const onSelectedChange = useCallback((e: any) => {
    e.preventDefault();

    const { id } = e.target;

    setSelected(Number(id));
  }, []);

  const onChangeCharge = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setCharge(value);
  }, []);

  const checkMobileDevice = () => {
    var mobileKeyWords = [
      "Android",
      "iPhone",
      "iPod",
      "BlackBerry",
      "Windows CE",
      "SAMSUNG",
      "LG",
      "MOT",
      "SonyEricsson",
    ];
    for (var info in mobileKeyWords) {
      if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
        return true;
      }
    }

    return false;
  };

  const postPoint = useCallback(() => {
    if (check && charge) {
      const code = "imp01304231";

      const payData = {
        pg: "inicis",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        name: "CP 포인트 충전",
        amount: charge,
        buyer_name: user ? user.name : "", // 구매자 이름
        buyer_tel: user ? user.phone : "", // 구매자 전화번호
      };

      if (Number(charge) <= 0) {
        alert("충전수량을 입력해주세요.");

        return;
      }

      if (checkMobileDevice()) {
        const params = {
          userCode: code, // 가맹점 식별코드
          payData, // 결제 데이터
          type: "payment", // 결제와 본인인증 구분을 위한 필드
          url: window.location.href,
        };

        const paramsToString = JSON.stringify(params);
        window.ReactNativeWebView?.postMessage(paramsToString);
        return;
      }

      const { IMP } = window;
      IMP.init(code);

      IMP.request_pay(payData, function (rsp: any) {
        // callback
        if (rsp.success) {
          alert(rsp);
          chargePoint(Number(charge));
        } else {
          alert("결제에 실패하였습니다.");
        }
      });
    } else {
      if (!charge) {
        alert("충전 수량을 입력해주세요.");

        return;
      }

      if (!check) {
        alert("개인정보 제 3자 제공 및 위탁동의에 동의해주세요.");

        return;
      }
    }
  }, [charge, chargePoint, check, user]);

  return (
    <Wrap>
      <div className="point-box">
        <div className="title">CP 포인트 충전</div>
        <div className="detail">
          <div>
            <em>보유수량</em>
            <span className="my">{regex.moneyRegex(Number(account?.quantity))} CP</span>
          </div>
          <div className="charge">
            <div>
              <em>충전수량</em>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="decimal"
                value={charge}
                onChange={onChangeCharge}
              />
            </div>
            <span>= {charge} 원</span>
          </div>
          <div>
            <em>충전결과</em>
            <span className="result">
              {account && Number(account?.quantity) + Number(charge)}
              <em> CP</em>
            </span>
          </div>
        </div>
      </div>
      <div className="pay-box">
        <div className="title">결제 방식</div>
        <div className="detail">
          <div className="toggle">
            <span
              id="0"
              onClick={onSelectedChange}
              className={classnames("", {
                active: selected === 0,
              })}
            >
              신용카드
            </span>
            <span
              id="1"
              onClick={onSelectedChange}
              className={classnames("", {
                active: selected === 1,
              })}
            >
              무통장입금
            </span>
          </div>
          {selected === 1 && (
            <div className="account">
              <em>입금계좌</em>
              <select>
                <option>우리은행 / (주)트라이아트 / 00</option>
              </select>
            </div>
          )}
          <span>
            <input type="checkbox" onClick={() => setCheck(!check)} /> 개인정보 제 3자 제공 및
            위탁동의
          </span>
          <button onClick={postPoint}>결제하기</button>
          <div className="notice">
            - 유의사항을 적어주세요.
            <br />
            - 유의사항을 적어주세요.
            <br />- 유의사항을 적어주세요.
          </div>
        </div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

padding: 23px 16px;

& > .pay-box {

    & > .detail {


        & > .account {
            height: 40px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-top:12px;

            & > em {
                width: 80px;
                font-size: 14px;
                line-height: 19px;
                align-items: center;

                color: #444444;
            }

            & > select {
                width: 100%;
                height: 40px;
            }


        }

        & > .toggle {
            display: flex;

            margin-top: 12px;
            & > span {
                
                width: 50%;
                height: 40px;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 14px;
                line-height: 19px;
                /* identical to box height */

                color: #888888;

                border: 1px solid #DDDDDD;

                :first-child {
                    margin-right: 8px;
                }
            }

            & > .active {
                color: #2233AA;
                border: 1px solid #2233AA;
            }
        }


        & > span {
            height: 16px;
            display: flex;
            align-items: center;

            margin-top: 40px;
            margin-bottom: 24px;

            font-size: 12px;
            line-height: 16px;

            color: #888888;

            & > input {
                width: 16px;
                height: 16px;

                margin: 0px;

                margin-right: 12px;
            }
        }

        & > button {
            width: 100%;
            height: 40px;

            font-size: 14px;
            line-height: 19px;
        
            color: #FFFFFF;


            background: #2233AA;
        }

        & > .notice {
            font-size: 12px;
            line-height: 16px;

            color: #888888;
            margin-top: 24px;
        }
    }
}

& > .point-box > .detail {

    & > .charge {
        height: 58px;

        display: flex;
        flex-direction:column;



        & > span {
            width: 100%;
            font-size: 12px;
            line-height: 16px;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            color: #888888;
            margin-top: 6px;
        }
    }
    
    & > div{
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 12px;

        & > .my {
            font-weight: 600;
            font-size: 20px;
            line-height: 27px;
            display: flex;
            align-items: center;
            text-align: right;

            color: #444444;

        }

        & > .result {
            font-weight: 600;
            font-size: 28px;
            line-height: 38px;
            display: flex;
            align-items: center;
            text-align: right;

            color: #2233AA;

            & > em {
                font-size: 14px;
                line-height: 19px;
            }

        }

        & > em {
            width: 80px;
        }

        & > div {
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > em {
                width: 80px;

                margin-right: 28px;
            }
        }
    }
}

 .title {
    display: flex;
    align-items: center;
    height: 40px;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;

    color: ${({ theme }) => theme.colors.primary_color};

    border-bottom: 2px solid ${({ theme }) => theme.colors.primary_color};

    margin-bottom: 10px;
 }
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default PointCharge;
