import React from "react";
import styled from "styled-components";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MtModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

interface Props {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  subChildren?: React.ReactNode;
  type: "one" | "two";
  btn_title?: string;
  title: String;
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
      // height: "200px",
      backgroundColor: "#ffffff",
    },
  }),
);

function Modal({ open, close, children, subChildren, type, btn_title, title }: Props) {
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
          <Content className={classes.paper}>
            <div className="top-box">
              <span className="title">{title}</span>
              <div className="article">{children}</div>
              {subChildren && <div className="sub">{subChildren}</div>}
            </div>
            <div className="bottom-box">
              {type === "two" ? (
                <button style={{ background: "#666666" }} onClick={close}>
                  취소
                </button>
              ) : null}
              <button onClick={close}>{btn_title ? btn_title : "확인"}</button>
            </div>
          </Content>
        </Fade>
      </MtModal>
    </Wrap>
  );
}

const Wrap = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > .top-box {
    /* height: 160px; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;

    & > .sub {
      height: 50px;

      font-size: 12px;
      line-height: 18px;

      display: flex;
      align-items: flex-start;
      text-align: center;

      color: #aaaaaa;

      padding-top: 10px;

      & > select {
        width: 192px;
        height: 32px;

        background: #ffffff;
        border: 1px solid #dddddd;
        box-sizing: border-box;

        margin-top: -10px;
      }
    }

    & > .article {
      height: 70px;

      display: flex;
      align-items: center;

      text-align: center;
      font-size: 12px;
      line-height: 18px;

      color: #666666;

      & > div {
        & > em {
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;

          color: ${({ theme }) => theme.colors.primary_color};
        }
      }

      & > div > span {
        display: flex;

        margin-bottom: 4px;
        & > img {
          width: 24px;
          height: 24px;
        }

        & > span {
          font-weight: 600;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;

          color: #666666;

          margin-left: 8px;

          & > em {
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
          }
        }
      }
    }

    & > .title {
      height: 40px;

      display: flex;
      align-items: flex-end;

      font-size: 14px;
      line-height: 19px;

      color: ${({ theme }) => theme.colors.primary_color};
    }
  }

  & > .bottom-box {
    width: 100%;
    height: 75px;

    display: flex;

    justify-content: space-around;
    align-items: flex-start;

    & > button {
      width: 64px;
      height: 64px;
      font-size: 14px;
      line-height: 19px;

      color: #ffffff;
      background: ${({ theme }) => theme.colors.primary_color};

      border-radius: 80px;
    }
  }
`;
export default Modal;
