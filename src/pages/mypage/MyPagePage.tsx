import React from "react";
import BaseTemplate from "components/base/baseTemplate";

import MyPageContainer from "containers/mypage/MyPageContainer";

function MyPagePage() {
  return (
    <BaseTemplate seletedItem="mypage" title="마이페이지">
      <MyPageContainer />
    </BaseTemplate>
  );
}

export default MyPagePage;
