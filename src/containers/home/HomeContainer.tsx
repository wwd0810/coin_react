import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { inject, observer } from "mobx-react";

import Home from "components/home";
import UserStore from "stores/users";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class HomeContainer extends React.Component<Props> {
  private userStore = this.props.userStore! as UserStore;

  render() {
    return <Home />;
  }
}

export default withCookies(withRouter(HomeContainer));
