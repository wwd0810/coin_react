/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback } from "react";
import styled from "styled-components";

import AIcon from "assets/icons/a.png";
import QIcon from "assets/icons/q.png";

function FQAItem() {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(
    (e) => {
      e.preventDefault();
      setOpen(!open);
    },
    [open],
  );

  return (
    <Wrap>
      <div className="fqa-title" onClick={onOpen}>
        <div className="fqa">
          <img src={QIcon} />
          <span>결제후 추가할인이 무언잇가요?</span>
        </div>
      </div>
      {open && (
        <div className="fqa-answer">
          <div className="fqa-contentBox">
            <div className="q-icon">
              <img src={AIcon} />
            </div>
            <div className="content">
              <div className="fqa-contentTitle">
                <h2>이용혜택 변경</h2>
              </div>
              <div className="fqa-content">
                <p>이용혜택 변경</p>
                <p>이용혜택 변경</p>
                <p>이용혜택 변경</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrap>
  );
}
const Wrap = styled.div`
width: 100%;

& > .fqa-title{
    width:100%;
    height:48px;
    
    line-height:48px;
}

.fqa-title .fqa img {
  width:24px;
  height:24px;
  margin:0 15px;
}

.fqa-title .fqa span{
  font-weight:600;
  font-size:14px;
  color:#444444;
}

.fqa-contentBox{
    background-color: #F7F7F7;
    padding: 12px 16px 24px 16px;
}

.content{
  padding-left:22px;
}

.fqa-contentTitle{
  font-weight:normal;
  font-size:12px;
  color:#444444;
}

.fqa-contentBox .q-icon img{
    width:24px;
    height:24px;
}
  
.fqa-content{
  font-weight:normal;
  font-size:12px;
  color:#444444;
  margin-top: 20px;
}
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
`}
${({ theme }) => theme.media.desktop`

`}
`;

export default FQAItem;
