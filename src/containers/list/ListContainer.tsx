import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import List from "components/list";

interface Props extends RouteComponentProps, ReactCookieProps {}

class ListContainer extends React.Component<Props> {
  render() {
    return <List />;
  }
}

export default withCookies(withRouter(ListContainer));
