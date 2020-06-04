import React, { useState, useCallback } from "react";
import styled from "styled-components";
import NoticeItem from "./item/NoticeItem";
import { NoticeType } from "stores/notice/types";

interface Props {
  notices: NoticeType[];
}

function Notice({ notices }: Props) {
  const [selected, setSelected] = useState<number>();

  const onSelect = (id: number) => {
    if (selected === id) {
      setSelected(undefined);
    } else {
      setSelected(id);
    }
  };

  return (
    <Wrap>
      {notices.map((data, idx) => (
        <NoticeItem id={idx} selected={selected} data={data} key={idx} onClick={onSelect} />
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

export default Notice;
