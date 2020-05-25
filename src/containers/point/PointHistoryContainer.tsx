import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import PointHistory from "components/point/history";

interface Props extends ReactCookieProps, RouteComponentProps {}

class PointHistoryContainer extends React.Component<Props> {
  render() {
    return <PointHistory />;
  }
}

export default withCookies(withRouter(PointHistoryContainer));
