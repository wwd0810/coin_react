import React from "react";

import StackTemplate from "components/base/stackTemplate";
import NoticeContainer from "containers/center/NoticeContainer";

function NoticePage() {
  return (
    <StackTemplate title="공지사항">
      <NoticeContainer />
    </StackTemplate>
  );
}

export default NoticePage;
