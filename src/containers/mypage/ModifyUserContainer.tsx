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

  render() {
    return <ModifyUser user={this.userStore.User?.user} logout={this.logout} />;
  }
}

export default withCookies(withRouter(ModifyUserContainer));
