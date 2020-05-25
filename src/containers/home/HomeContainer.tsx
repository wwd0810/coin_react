import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import Home from "components/home";

interface Props extends RouteComponentProps, ReactCookieProps {}

class HomeContainer extends React.Component<Props> {
  render() {
    return <Home />;
  }
}

export default withCookies(withRouter(HomeContainer));
