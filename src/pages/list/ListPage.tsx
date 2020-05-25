import React from "react";
import BaseTemplate from "components/base/baseTemplate";
import ListContainer from "containers/list/ListContainer";

function DealPage() {
  return (
    <BaseTemplate seletedItem="list" title="거래내역">
      <ListContainer />
    </BaseTemplate>
  );
}

export default DealPage;
