import React, { useCallback, createRef } from "react";
import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MtModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  close: () => void;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      outline: "none",
      width: "240px",
      height: "275px",
      backgroundColor: "#ffffff",
    },
  }),
);

function BuyModal({ open, close, onClick }: Props) {
  const classes = useStyles();
  const checkRef = createRef<HTMLInputElement>();

  const buy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (checkRef.current?.checked) {
        onClick();
      } else {
        alert("개인정보 제 3자 제공 및 위탁에 체크하여야 합니다.");
      }

      // setCheck(value);
    },
    [checkRef, onClick],
  );

  return (
    <Wrap>
      <MtModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Content>
            <div className="top">전송안내</div>
            <div className="center">
              <ul>
                <li>하당 상품을 구매하시려면</li>
                <li>개인정보 제 3자 제공 및 위탁에</li>
                <li>동의하셔야합니다.</li>
                <li className="check">
                  <input type="checkbox" ref={checkRef} />
                  이에 동의 하시겠습니까?
                </li>
              </ul>
            </div>
            <div className="bottom">
              <button onClick={close}>취소</button>
              <button style={{ background: "#2233AA" }} onClick={buy}>
                구매하기
              </button>
            </div>
            <Link to="/term">
              <div>약관보러가기</div>
            </Link>
          </Content>
        </Fade>
      </MtModal>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Content = styled.div`
  width: 240px;
  height: 275px;

  outline: none;
  background: white;

  & > a {
    & > div {
      width: 240px;
      height: 40px;

      background: #000000;
      opacity: 0.5;

      font-size: 14px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      color: #ffffff;

      text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);

      padding: 0 8px;
    }
  }

  & > .top {
    height: 40px;

    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */
    display: flex;
    align-items: flex-end;
    justify-content: center;

    color: #2233aa;
  }

  & > .center {
    width: 100%;
    height: 120px;

    display: flex;
    align-items: center;
    justify-content: center;

    & > ul > li {
      width: 240px;
      font-size: 12px;
      line-height: 18px;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #444444;
      padding: 0 24px;
      & > span {
      }
    }

    & > ul > .check {
      color: #888888;

      margin-top: 14px;
      & > input {
        background: #f7f7f7;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
  }

  & > .bottom {
    height: 75px;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    & > button {
      width: 64px;
      height: 64px;

      font-size: 14px;
      line-height: 19px;

      color: #ffffff;

      background: #999999;
      border-radius: 80px;

      :first-child {
        margin-right: 20px;
      }
    }
  }
`;

export default BuyModal;
