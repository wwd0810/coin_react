import React from "react";
import StackTemplate from "components/base/stackTemplate";
import DealApplyContainer from "containers/deal/DealApplyContainer";
import { useParams } from "react-router";

function DealModifyPage() {
  const { idx } = useParams();

  return (
    <StackTemplate title="판매수정">
      <DealApplyContainer idx={idx} />
    </StackTemplate>
  );
}

export default DealModifyPage;
