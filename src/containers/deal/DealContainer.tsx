import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import Deal from "components/deal";

interface Props extends RouteComponentProps, ReactCookieProps {}

class DealContainer extends React.Component<Props> {
  render() {
    return <Deal />;
  }
}

export default withCookies(withRouter(DealContainer));
