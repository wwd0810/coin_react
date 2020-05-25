import React from "react";
import styled from "styled-components";
import NoticeItem from "./item/NoticeItem";

function Notice() {
  return (
    <Wrap>
      <NoticeItem />
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

export default Notice;
