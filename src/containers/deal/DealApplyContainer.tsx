import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import DealApply from "components/deal/apply";

interface Props extends RouteComponentProps, ReactCookieProps {}

class DealApplyContainer extends React.Component<Props> {
  render() {
    return <DealApply />;
  }
}

export default withCookies(withRouter(DealApplyContainer));
