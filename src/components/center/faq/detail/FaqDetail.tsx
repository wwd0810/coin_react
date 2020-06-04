import React from "react";
import styled from "styled-components";

interface Props {
  data: string;
}

function FaqDetail({ data }: Props) {
  return (
    <Wrap>
      {data.split("\n").map((data, idx) => (
        <p key={idx}>{data}</p>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div``;

export default FaqDetail;
