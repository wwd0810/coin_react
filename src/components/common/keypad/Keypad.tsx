/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import classnames from "classnames";

import PrevIcon from "assets/icons/prev.png";

interface Props {
  onPrev: () => void;
}

function Keypad({ onPrev }: Props) {
  const pw = [1, 2, 3, 4, 5, 6];
  const keyname = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [str, setStr] = useState<String>("");

  const onChange = useCallback(
    (e: any) => {
      e.preventDefault();
      const { id } = e.target;

      if (id === "cancle") {
        setStr("");
      } else if (id === "remove") {
        setStr(str.slice(0, str.length - 1));
      } else {
        if (str.length < 6) {
          setStr(str + id);
        }
      }
    },
    [str],
  );

  return (
    <Wrap>
      <img src={PrevIcon} onClick={onPrev} />
      <div className="password">
        <span>암호를 입력하세요.</span>
        <div>
          {pw.map((data, idx) => (
            <div
              className={classnames(null, {
                active: str.length >= data,
              })}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className="key-box">
        {keyname.map((data, idx) => (
          <button className="key" id={idx.toString()} onClick={onChange} key={idx}>
            {data}
          </button>
        ))}

        <button className="key-cancle" id="cancle" onClick={onChange}>
          취소
        </button>
        <button className="key" id="0" onClick={onChange}>
          0
        </button>
        <button className="key-remove" id="remove" onClick={onChange}>
          <img src={PrevIcon} id="remove" onClick={onChange} />
        </button>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100vw;
height: 100vh;

display: flex;
flex-direction: column;

justify-content: center;
align-items: center;

& > img {
    width: 24px;
    height: 24px;

    position: absolute;
    top: 14px;
    left: 12px;
}

& > .password {
    width: 270px;
    height: 88px;

    margin-bottom: 16px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    & > span {

    }

    & > div {
        width: 270px;
        height: 56px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 22px 39px;

        & > .active {
            background: #2233AA;
        }

        & > div {
            width: 12px;
            height: 12px;
            background: #DDDDDD;
            border-radius: 100px;
        }

        
    }
}

& > .key-box {
    width: 288px;
    height: 384px;

    display:flex;
    flex-wrap: wrap;

    & > button {
        width: 64px;
        height: 64px;

        font-size: 28px;
        line-height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;

        color: #2233AA;


        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        box-sizing: border-box;
        border-radius: 50px;

        margin: 16px;
    }  

    & > .key-cancle {
        font-size: 14px;
        line-height: 19px;

        display: flex;
        align-items: center;
        text-align: center;

        color: #444444;

        border: none;

    }

    & > .key-remove {
        border: none;

        & > img {
            width: 24px;
            height: 24px;
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

export default Keypad;
