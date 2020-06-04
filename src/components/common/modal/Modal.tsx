import React from "react";
import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MtModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

interface Props {
  open: boolean;
  close: () => void;
  onClick?: () => void;
  children: React.ReactNode;
  subChildren?: React.ReactNode;
  title: String;
  btnTitle?: string;
  type?: "one" | "two";
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
      // height: "235px",
      backgroundColor: "#ffffff",
    },
  }),
);

function Modal({ open, close, children, title, type, btnTitle, onClick, subChildren }: Props) {
  const classes = useStyles();

  return (
    <Wrap>
      <MtModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Content className={classes.paper}>
            <div className="top">{title}</div>
            <div className="center">{children}</div>
            {subChildren && <div className="sub">{subChildren}</div>}
            <div className="bottom">
              {type === "two" ? (
                <>
                  <button onClick={close}>취소</button>
                  <button style={{ background: "#2233AA" }} onClick={onClick}>
                    {btnTitle ? btnTitle : "확인"}
                  </button>
                </>
              ) : (
                <button style={{ background: "#2233AA" }} onClick={onClick ? onClick : close}>
                  확인
                </button>
              )}
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
  /* height: 235px; */

  outline: none;
  background: white;

  & > .sub {
    height: 40px;

    font-size: 12px;
    line-height: 16px;
    display: flex;

    justify-content: center;

    color: #888888;

    & > div > img {
      width: 12px;
      height: 12px;

      margin-right: 6px;
    }

    & > select {
      width: 192px;
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

    & > ul > .sb-box {
      justify-content: space-between;
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

      :nth-child(2n) {
        margin-left: 20px;
      }
    }
  }
`;
export default Modal;
