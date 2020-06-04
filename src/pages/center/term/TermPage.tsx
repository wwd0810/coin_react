/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import StackTemplate from "components/base/stackTemplate";
import { Link } from "react-router-dom";

import SAIcon from "assets/icons/small-arrow.png";

function TermPage() {
  return (
    <StackTemplate title="약관 및 정책">
      <Wrap>
        <Link to="/center/faq/service">
          서비스 이용약관 <img src={SAIcon} />
        </Link>
        <Link to="/center/faq/e-financial">
          전자금융거래 이용약관 <img src={SAIcon} />
        </Link>
        <Link to="/center/faq/privacy">
          개인정보 취급방침 <img src={SAIcon} />
        </Link>
        <Link to="/center/faq/collect_info">
          개인정보 수집 및 이용동의 <img src={SAIcon} />
        </Link>
        <Link to="/center/faq/third">
          개인정보 제 3자 제공 및 위탁동의 <img src={SAIcon} />
        </Link>
      </Wrap>
    </StackTemplate>
  );
}

const Wrap = styled.div`
  width: 100%;
  padding: 16px;

  & > a {
    height: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    color: #666666;

    & > img {
      width: 24px;
      height: 24px;
    }
  }
`;

export default TermPage;
