import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import PointCharge from "components/point/charge";

interface Props extends RouteComponentProps, ReactCookieProps {}

class PointChargeContainer extends React.Component<Props> {
  render() {
    return <PointCharge />;
  }
}

export default withCookies(withRouter(PointChargeContainer));
