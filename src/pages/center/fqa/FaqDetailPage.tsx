import React from "react";
import { useParams } from "react-router";

import StackTemplate from "components/base/stackTemplate";
import FQADetailContainer from "containers/center/FAQDetailContainer";

function FaqDetailPage() {
  const { title } = useParams();

  return (
    <StackTemplate title={title}>
      <FQADetailContainer title={title} />
    </StackTemplate>
  );
}

export default FaqDetailPage;
