import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { NoticeType } from "stores/notice/types";

interface Props {
  id: number;
  selected?: number;
  data: NoticeType;
  onClick: (id: number) => void;
}

function NoticeItem({ id, selected, data, onClick }: Props) {
  const onOpen = useCallback(
    (e) => {
      e.preventDefault();

      onClick(id);
    },
    [id, onClick],
  );

  return (
    <Wrap>
      <div className="notice-title" onClick={onOpen}>
        <div className="title">
          <span>{data.title}</span>
          <p>{data.created_at.toString().slice(0, 10)}</p>
        </div>
      </div>

      {id === selected && (
        <div>
          <div className="notice-contentBox">
            {data.contents.split("\n").map((data, idx) => (
              <p key={idx}>{data}</p>
            ))}
          </div>
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;


& > .notice-title {
  width: 100%;
  height:64px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  
  padding: 15px 16px 14px 16px;
  
}

.notice-title .title span{
  font-weight: 600;
  font-size: 14px;
  color: #444444;
}

.notice-title .title  p{
  font-size: 12px;
  color: #888888;
  font-weight: normal;

}

.notice-contentBox .notice-contentTitle{
  font-weight:normal;
  font-size:12px;
  color:#444444;
}

.notice-contentBox{
  background-color: #F7F7F7;
  padding: 12px 16px 24px 16px;
  
  & > p {
    font-size: 12px;
  line-height: 16px;

  color: #444444;

  }
}

.notice-content{
  margin-top: 20px;
  font-weight:normal;
  font-size:12px;
  color:#444444;
}


${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
`}
${({ theme }) => theme.media.desktop`
& > .notice-box {
  width:100%
  background-color: red;
}

.notice-contentbox{
  margin-top:20px;
}
`}
`;

export default NoticeItem;
