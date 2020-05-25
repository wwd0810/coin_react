import React from "react";
import styled from "styled-components";
import ServiceItem from "./item/ServiceItem";

function Service() {
  return (
    <Wrap>
      <ServiceItem />
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

export default Service;
