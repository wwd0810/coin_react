/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import ServiceItem from "./item/ServiceItem";
import { InquiryType } from "stores/notice/types";

import CloseIcon from "assets/icons/close.png";

interface Props {
  data: InquiryType[];
  post: (title: string, contents: string) => void;
}

function Service({ data, post }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setTitle(value);
  }, []);

  const onChangeContents = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setContents(value);
  }, []);

  const onClick = (id: number) => {
    if (selected === id) setSelected(undefined);
    else setSelected(id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postF = () => {
    if (title && contents) {
      setOpen(false);
      post(title, contents);
    } else {
      alert("빈 칸을 모두 작성해주세요.");
    }
  };

  return (
    <Wrap>
      {open && (
        <div className="send">
          <div className="top">
            <img src={CloseIcon} onClick={handleClose} />
            <button onClick={postF}>보내기</button>
          </div>
          <div className="form">
            <label>제목</label>
            <input value={title} onChange={onChangeTitle} />
            <label>내용</label>
            <textarea value={contents} onChange={onChangeContents} />
            <button className="btn-box" onClick={postF}>
              보내기
            </button>
          </div>
        </div>
      )}
      {!open && (
        <button className="fixed" onClick={handleOpen}>
          작성하기
        </button>
      )}
      {data.map((data, idx) => (
        <ServiceItem {...data} id={idx} selected={selected} key={idx} onClick={onClick} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;

& > .send {
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0px;
  left: 0px;

  display: flex;
  flex-direction: column;

  background: white;

  z-index: 999;

  & > .top {
    height: 52px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 16px;

    & > button {

      font-size: 14px;
      line-height: 19px;
      text-decoration-line: underline;

      color: #2233AA; 

    }
    
    & > img {
      width: 24px;
      height: 24px;
    }
  }

  & > .form {
    display: flex;
    flex-direction: column;

    padding: 0 16px;

    & > label {
      font-size: 12px;
    line-height: 16px;

    color: #888888;

    margin-top: 16px;
    }

    & > input{
      display: flex;
      height: 40px;
      background: #FFFFFF;
border: 1px solid #DDDDDD;

margin-bottom :20px;

padding: 0 10px;
    }

    & > textarea {
      height: 160px;
      border: 1px solid #DDDDDD;
      resize: none;

      outline: none;

      padding: 10px;
    }

    

    & > button {
      position: absolute;
      
      height: 40px;
      left: 16px;
      right: 16px;
      bottom: 56px;

      font-size: 14px;
  line-height: 19px;

  color: #FFFFFF;

      background: #2233AA;
    }
  }

}

& > .fixed {
  position: fixed;
  top: 17px;
  right: 16px;

  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;

  color: #2233AA;

  z-index: 999;
}



${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
`}
${({ theme }) => theme.media.desktop`

& > .fixed {
  top: 70px;
}

`}
`;

export default Service;
