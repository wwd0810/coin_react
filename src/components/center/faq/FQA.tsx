import React, { useState } from "react";
import styled from "styled-components";
import FQAItem from "./item/FQAItem";
import { FAQType } from "stores/notice/types";

interface Props {
  list: FAQType[];
}

function FQA({ list }: Props) {
  const [selected, setSelected] = useState<number>();

  const onClick = (id: number) => {
    if (selected === id) {
      setSelected(undefined);
    } else {
      setSelected(id);
    }
  };

  return (
    <Wrap>
      {list.map((data, idx) => (
        <FQAItem {...data} onClick={onClick} id={idx} selected={selected!} key={idx} />
      ))}
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
