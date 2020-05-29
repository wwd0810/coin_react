import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { observer, inject } from "mobx-react";

import MyPage from "components/mypage";
import UserStore from "stores/users";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class MyPageContainer extends React.Component<Props> {
  private userStore = this.props.userStore! as UserStore;

  logout = async () => {
    this.userStore.logout();
    this.props.cookies!.remove("auth", { path: "/" });
    this.props.history.push("/");
  };

  render() {
    return <MyPage isLoggined={this.userStore.IsLoggedIn} logout={this.logout} />;
  }
}

export default withCookies(withRouter(MyPageContainer));
