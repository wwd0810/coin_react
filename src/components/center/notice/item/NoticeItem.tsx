import React, { useState, useCallback } from "react";
import styled from "styled-components";

function NoticeItem() {
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
      <div className="notice-title" onClick={onOpen}>
        <div className="title">
          <span>공지사항</span>
          <p>2020.05.22</p>
        </div>
      </div>

      {open && (
        <div>
          <div className="notice-contentBox">
            <div className="notice-contentTitle">
              <h2>이용혜택 변경</h2>
            </div>
            <div className="notice-content">
              <p>이용혜택 변경</p>
              <p>이용혜택 변경</p>
              <p>이용혜택 변경</p>
            </div>
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
