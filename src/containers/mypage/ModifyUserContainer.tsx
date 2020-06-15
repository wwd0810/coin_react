import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { observer, inject } from "mobx-react";

import UserStore from "stores/users";
import ModifyUser from "components/mypage/modify";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class ModifyUserContainer extends React.Component<Props> {
  private userStore = this.props.userStore! as UserStore;

  logout = () => {
    window.localStorage.clear();
    this.userStore.logout();
    this.props.history.push("/");

    window.location.href = `${process.env.REACT_APP_AUTH_LOGOUT_BASE}`;
  };

  duplicate = async (pw: string) => {
    await this.userStore.duplicatePin(pw);

    if (this.userStore.failure["DUPLICATE_PIN"][0]) {
      alert("PIN 암호가 올바르지 않습니다.");
    }
  };

  patch = async (pw: string) => {
    await this.userStore.PatchPin(pw);

    if (this.userStore.failure["PATCH_PIN"][0]) {
      alert("비밀번호 설정에 실패하였습니다. 다시 시도해주세요.");
    } else {
      if (this.userStore.success["PATCH_PIN"]) {
        alert("비밀번호 설정에 성공하였습니다.");
      }
    }
  };

  render() {
    return (
      <ModifyUser
        check={this.userStore.CheckPin}
        user={this.userStore.User?.user}
        logout={this.logout}
        duplicate={this.duplicate}
        patch={this.patch}
        other={this.userStore.User?.other}
      />
    );
  }
}

export default withCookies(withRouter(ModifyUserContainer));
