import React, { useState, useCallback } from "react";
import styled from "styled-components";
import NIcon from "assets/icons/n.png";
import QIcon from "assets/icons/q.png";
import AIcon from "assets/icons/a.png";

function ServiceItem() {
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(
    (e) => {
      e.preventDefault();
      setOpen(!open);
    },
    [open]
  );
  return (
    <Wrap>
      <div className="service-title" onClick={onOpen}>
        <div className="title">
          <span>서비스 이용 문의</span>
          <img src={NIcon} />
          <p>2020.05.22</p>
        </div>
      </div>
      {open && (
        <div className="service-contentBox">
          <div>
            <div className="service-contentTitle">
              <img src={QIcon} />
              <span>서비스 이용혜택 변경</span>
            </div>
            <div className="service-content">
              <p>서비스 이용혜택 변경</p>
              <p>서비스 이용혜택 변경</p>
              <p>서비스 이용혜택 변경</p>
            </div>
          </div>
          <div className="answer-contentBox">
            <div className="answer-contentTitle">
              <img src={AIcon} />
              <span>서비스 이용 혜택 변경</span>
            </div>
            <div className="answer-content">
              <p>서비스 이용 혜택 변경</p>
              <p>서비스 이용 혜택 변경</p>
              <p>서비스 이용 혜택 변경</p>
              <p>서비스 이용 혜택 변경</p>
            </div>
          </div>
        </div>
      )}
    </Wrap>
  );
}
const Wrap = styled.div`
width: 100%;

& > .service-title {
    width: 100%;
    height:64px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 15px 16px 14px 16px;
    
}
  
.service-title .title span{
    font-weight: 600;
    font-size: 14px;
    color: #444444;
}

.service-title .title img{
    width:24px;
    height:24px;
}
  
.service-title .title  p{
    font-size: 12px;
    color: #888888;  
  
}

.service-contentBox{
    background-color: #F7F7F7;
    padding: 12px 16px 24px 16px;
    
}

.service-contentTitle span{
    font-weight:normal;
    font-size:12px;
    color:#444444;
}

.service-contentTitle img{
    width:24px;
    height:24px;
    margin: 0 16px;
}

.service-content{
    margin-top:20px;
    margin-left:56px;
    font-weight:normal;
    font-size:12px;
    color:#444444;
}

.answer-contentBox{
    padding-top:16px;
    font-weight:normal;
    font-size:12px;
    color:#444444;
    padding-left:38px;
}

.answer-contentTitle img{
    width:24px;
    height:24px;
    margin-right:16px;
    
}

.answer-content{
    margin-top:20px;
    padding-left:40px;
}

${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
`}
${({ theme }) => theme.media.desktop`

`}
`;

export default ServiceItem;
