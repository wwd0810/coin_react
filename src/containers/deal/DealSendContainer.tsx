import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import DealSend from "components/deal/send";

interface Props extends RouteComponentProps, ReactCookieProps {}

class DealSendContainer extends React.Component<Props> {
  render() {
    return <DealSend />;
  }
}

export default withCookies(withRouter(DealSendContainer));
