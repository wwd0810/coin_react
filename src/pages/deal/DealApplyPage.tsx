import React from "react";
import StackTemplate from "components/base/stackTemplate";
import DealApplyContainer from "containers/deal/DealApplyContainer";

function DealApplyPage() {
  return (
    <StackTemplate title="판매등록">
      <DealApplyContainer />
    </StackTemplate>
  );
}

export default DealApplyPage;
