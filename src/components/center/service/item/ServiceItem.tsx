/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import NIcon from "assets/icons/n.png";
import QIcon from "assets/icons/q.png";
import AIcon from "assets/icons/a.png";
import { InquiryType } from "stores/notice/types";

interface Props extends InquiryType {
  id: number;
  selected?: number;
  onClick: (id: number) => void;
}

function ServiceItem({ id, selected, onClick, contents, answer, title }: Props) {
  const click = () => {
    onClick(id);
  };
  return (
    <Wrap>
      <div className="service-title" onClick={click}>
        <div className="title">
          <span>{title}</span>
          <img src={NIcon} />
          <p>2020.05.22</p>
        </div>
      </div>
      {id === selected && (
        <div className="service-contentBox">
          <div>
            <div className="service-contentTitle">
              <img src={QIcon} />
            </div>
            <div className="service-content">
              {contents.split("\n").map((ele, idx) => (
                <p key={idx}>{ele}</p>
              ))}
            </div>
          </div>
          <div className="answer-contentBox">
            <div className="answer-contentTitle">
              <img src={AIcon} />
            </div>

            {answer && (
              <div className="answer-content">
                {answer.split("\n").map((ele, idx) => (
                  <p key={idx}>{ele}</p>
                ))}
              </div>
            )}
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
