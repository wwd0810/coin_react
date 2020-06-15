import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import NoticeItem from "./item/NoticeItem";
import { NoticeType } from "stores/notice/types";
import { Paging } from "stores/market/types";

interface Props {
  notices: NoticeType[];
  paging?: Paging;
  get: (page: number) => void;
}

function Notice({ notices, paging, get }: Props) {
  const [page, setPage] = useState<number>(0);
  const [selected, setSelected] = useState<number>();

  const onSelect = (id: number) => {
    if (selected === id) {
      setSelected(undefined);
    } else {
      setSelected(id);
    }
  };

  const getPageList = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setPage(page + 1);
    },
    [page],
  );

  useEffect(() => {
    get(page);
  }, [get, page]);

  return (
    <Wrap>
      {notices.map((data, idx) => (
        <NoticeItem id={idx} selected={selected} data={data} key={idx} onClick={onSelect} />
      ))}
      {paging && page < paging.count / paging.limit - 1 && (
        <button className="more-btn" onClick={getPageList}>
          더보기
        </button>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;

.more-btn {
  width: 100%;
  height: 32px;

  font-size: 14px;
  line-height: 19px;
  color: #444444;

  background: #FFFFFF;
  border: 1px solid #DDDDDD;

  margin-top: 16px;
  margin-bottom: 16px;
}

${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`
`}
${({ theme }) => theme.media.desktop`

`}
`;

export default Notice;
