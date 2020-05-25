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
  render() {
    return <MyPage isLoggined={this.userStore.IsLoggedIn} />;
  }
}

export default withCookies(withRouter(MyPageContainer));
