import React from "react";
import BaseTemplate from "components/base/baseTemplate";

import DealContainer from "containers/deal/DealContainer";

function DealPage() {
  return (
    <BaseTemplate seletedItem="deal" title="거래하기">
      <DealContainer />
    </BaseTemplate>
  );
}

export default DealPage;
