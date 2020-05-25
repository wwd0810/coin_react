import React from "react";
import StackTemplate from "components/base/stackTemplate";
import PointHistoryContainer from "containers/point/PointHistoryContainer";

function PointHistoryPage() {
  return (
    <StackTemplate title="CP 관리">
      <PointHistoryContainer />
    </StackTemplate>
  );
}

export default PointHistoryPage;
