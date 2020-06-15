/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";

import SAIcon from "assets/icons/small-arrow.png";
import { User, OtherType } from "stores/users/types";

import Keypad from "components/common/keypad";

interface Props {
  user?: User;
  other?: OtherType;
  check: boolean;
  logout: () => void;
  duplicate: (pw: string) => void;
  patch: (pw: string) => void;
}

function ModifyUser({ user, logout, check, other, duplicate, patch }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [mOpen, setMOpen] = useState<boolean>(false);
  const [mrOpen, setMROpen] = useState<boolean>(false);

  const [pw, setPW] = useState<string>("");
  const [mPw, setMPW] = useState<string>("");

  const logoutF = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const res = confirm("로그아웃 하시겠습니까?");
    if (res) {
      logout();
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPW("");
    setMPW("");
    setMOpen(false);
    setMROpen(false);
    setOpen(false);
  };
  const setPassword = (pw: string) => {
    setPW(pw);
  };

  const setMPassword = (pw: string) => {
    setMPW(pw);
  };

  const setMRPassword = (pw: string) => {
    if (pw === mPw) {
      patch(pw);
      setMROpen(false);
    } else {
      alert("비밀번호가 틀립니다. 재입력해주세요.");
    }
  };

  useEffect(() => {
    if (pw) {
      if (other) {
        if (other.check_pin) {
          duplicate(pw);
        } else {
          patch(pw);
          setOpen(false);
        }
      }
    }
  }, [pw, duplicate, patch, other]);

  useEffect(() => {
    if (check) {
      setOpen(false);
      setMOpen(true);
    }
  }, [check]);

  useEffect(() => {
    if (mPw) {
      setMOpen(false);
      setMROpen(true);
    }
  }, [mPw]);

  return (
    <>
      {open && <Keypad onPrev={handleClose} go={setPassword} />}
      {mOpen && <Keypad onPrev={handleClose} go={setMPassword} modify={true} />}
      {mrOpen && <Keypad onPrev={handleClose} go={setMRPassword} modify={true} more={true} />}

      <Wrap>
        <div className="user-info">
          <span>
            <span>
              {user?.name} <em>님</em>
            </span>
            <button onClick={logoutF}>로그아웃</button>
          </span>
          <p>보안등급 0 등급</p>
        </div>
        <div className="pass">
          <a href="/asd">
            비밀번호 수정 <img src={SAIcon} />
          </a>
        </div>
        <div className="pass">
          <a onClick={handleOpen}>
            핀 암호 {other && !other.check_pin ? "생성" : "수정"} <img src={SAIcon} />
          </a>
        </div>
        <div>
          <h5>본인인증</h5>
          <span>
            인증이 필요합니다.<button>인증하기</button>
          </span>
        </div>
        <div>
          <h5>계좌인증</h5>
          <span>
            인증이 필요합니다.<button>인증하기</button>
          </span>
        </div>
        <a>회원을 탈퇴하시겠습니까?</a>
        <p>-asd</p>
        <p>-asd</p>
        <p>-asd</p>
        <p>-asd</p>
        <p>-asd</p>
        <p>-asd</p>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  width: 100%;
  padding: 0 16px;

  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */
  color: #444444;

  & > .user-info {
    height: 88px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    & > span {
      font-weight: 600;
      font-size: 20px;
      line-height: 27px;
      display: flex;
      align-items: center;

      color: #2233aa;

      & > span > em {
        color: #444444;
      }
    }

    & > p {
      font-size: 14px;
      line-height: 19px;
      /* identical to box height */

      color: #2233aa;
    }
  }

  & > p {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #888888;
  }

  & > a {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #888888;
    display: flex;
    justify-content: center;

    margin-top: 16px;
    margin-bottom: 40px;
  }

  & > div {
    height: 80px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    & > h5 {
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;

      color: #2233aa;
    }

    & > span {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 5px;

      & > button {
        width: 56px;
        height: 24px;

        font-weight: normal;
        font-size: 12px;
        line-height: 16px;

        color: #444444;

        background: #dddddd;
        border-radius: 4px;
      }
    }
  }

  & > .pass {
    height: 64px;

    & > a {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > img {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export default ModifyUser;
