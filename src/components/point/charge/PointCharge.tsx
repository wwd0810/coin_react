import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";

function PointCharge() {
  const [selected, setSelected] = useState<number>(0);

  const onSelectedChange = useCallback((e: any) => {
    e.preventDefault();

    const { id } = e.target;

    setSelected(Number(id));
  }, []);

  return (
    <Wrap>
      <div className="point-box">
        <div className="title">CP 포인트 충전</div>
        <div className="detail">
          <div>
            <em>보유수량</em>
            <span className="my">520 CP</span>
          </div>
          <div className="charge">
            <div>
              <em>충전수량</em>
              <input type="number" />
            </div>
            <span>= 20,000 원</span>
          </div>
          <div>
            <em>충전결과</em>
            <span className="result">
              20,520<em> CP</em>
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
            <input type="checkbox" /> 개인정보 제 3자 제공 및 위탁동의
          </span>
          <button>결제하기</button>
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
