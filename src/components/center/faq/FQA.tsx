import React from "react";
import styled from "styled-components";
import FQAItem from "./item/FQAItem";

function FQA() {
  return (
    <Wrap>
      <FQAItem />
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

export default FQA;
