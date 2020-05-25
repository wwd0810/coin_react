import React from "react";
import StackTemplate from "components/base/stackTemplate";
import DealSendContainer from "containers/deal/DealSendContainer";

function DealSendPage() {
  return (
    <StackTemplate title="전송하기">
      <DealSendContainer />
    </StackTemplate>
  );
}

export default DealSendPage;
