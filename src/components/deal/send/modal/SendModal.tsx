import React from "react";
import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MtModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

interface Props {
  open: boolean;
  close: () => void;
  children?: React.ReactNode;

  //   ==================================================
  addr: string;
  quan: string;

  onClick: () => void;
  //   ==================================================
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
      height: "235px",
      backgroundColor: "#ffffff",
    },
  }),
);

function SendModal({ open, close, children, addr, quan, onClick }: Props) {
  const classes = useStyles();

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
                <li>
                  전송 주소<span>{addr}</span>
                </li>
                <li>
                  전송 수량<span>{quan} DL</span>
                </li>
                <li>
                  전송 수수료<span>{Number(quan) * 0.05} CP</span>
                </li>
              </ul>
            </div>
            <div className="bottom">
              <button onClick={close}>취소</button>
              <button style={{ background: "#2233AA" }} onClick={onClick}>
                보내기
              </button>
            </div>
          </Content>
        </Fade>
      </MtModal>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Content = styled.div`
  width: 240px;
  height: 235px;

  outline: none;
  background: white;

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
      justify-content: space-between;
      align-items: center;

      color: #444444;
      padding: 0 24px;
      & > span {
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

export default SendModal;
