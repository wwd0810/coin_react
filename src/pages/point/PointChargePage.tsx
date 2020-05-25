import React from "react";
import StackTemplate from "components/base/stackTemplate";
import PointChargeContainer from "containers/point/PointChargeContainer";

function PointChargePage() {
  return (
    <StackTemplate title="포인트 충전">
      <PointChargeContainer />
    </StackTemplate>
  );
}

export default PointChargePage;
