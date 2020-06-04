import React from "react";
import StackTemplate from "components/base/stackTemplate";
import ModifyUserContainer from "containers/mypage/ModifyUserContainer";

function ModifyUserPage() {
  return (
    <StackTemplate title="회원정보 수정">
      <ModifyUserContainer />
    </StackTemplate>
  );
}

export default ModifyUserPage;
