import React from "react";

import StackTemplate from "components/base/stackTemplate";
import ServiceContaniner from "containers/center/ServiceContainer";

function ServicePage() {
  return (
    <StackTemplate title="서비스 문의" inquiry={true}>
      <ServiceContaniner />
    </StackTemplate>
  );
}

export default ServicePage;
