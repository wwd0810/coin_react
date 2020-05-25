import React from "react";
import styled from "styled-components";

function QuestionItem() {
  return (
    <Wrap>
      <div className="textTitle">
        <p className="title">제목</p>
        <textarea className="submit-title" />
      </div>
      <div>
        <p className="title">내용</p>
        <textarea className="submit-content" />
      </div>
      <div className="submit-button">
        <span className="submit">보내기</span>
      </div>
    </Wrap>
  );
}
const Wrap = styled.div`
width: 100%;
padding:0 16px;

.textTitle .title{
  font-weight:normal;
  font-size:12px;
  color: #888888;
  padding-bottom:4px;
}

.textTitle .submit-title{
  width:328px;
  height:40px;
  background:#FFFFFF;
  resize:none;
  margin-bottom:56px;
}

.submit-content{
  width:328px;
  height:160px;
  resize:none;
  margin-bottom:200px;
}

.submit-button{
  width:328px;
  height:40px;
  background:#2233AA;
}

.submit{
  font-weight:normal;
  font-size:14px;
  display:flex;
  align-items:center;
  text-align:center;
  color:#FFFFFF;
}

${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
`}
${({ theme }) => theme.media.desktop`

`}
`;

export default QuestionItem;
