import React from "react";
import styled from "styled-components";
import StackTemplate from "components/base/stackTemplate";

function BusinessPage() {
  return (
    <StackTemplate title="사업자정보">
      <Wrap>
        <p>
          주식회사 트라이아트(캐시링크)
          <br />
          사업자 : 793-81-00566
          <br />
          통신판매업 신고번호 : 2019-서울금천-1696호
          <br />
          연락처 : 070-4350-0318
          <br />
          팩스번호 : 0303-3441-0003
          <br />
          이메일 : pehnice@nate.com
          <br />
          주소 : 서울시 금천구 가산디지털1로 145, 207호 <br />
          (가산동, 에이스하이엔드3차)
        </p>
      </Wrap>
    </StackTemplate>
  );
}

const Wrap = styled.div`
    width: 100%;

    position: absolute;
    top:52px;
    bottom: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  & > P {
    color: #888888;
    font-size: 13px;
    /* font-weight: bold; */
  }

  ${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
 & > p {
    font-size: 24px;
 }
`}
${({ theme }) => theme.media.desktop`
top:70px;
 & > p {
    font-size: 28px;
 }
`}
`;

export default BusinessPage;
