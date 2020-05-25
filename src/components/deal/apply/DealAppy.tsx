import React from "react";
import styled from "styled-components";
import DealApplyItem from "./item";

function DealApply() {
  return (
    <Wrap>
      <DealApplyItem />
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default DealApply;
