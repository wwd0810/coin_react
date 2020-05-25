import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import Keypad from "components/common/keypad";

interface Props extends RouteComponentProps, ReactCookieProps {}

class KeypadContainer extends React.Component<Props> {
  onPrev = () => {
    this.props.history.goBack();
  };

  render() {
    return <Keypad onPrev={this.onPrev} />;
  }
}

export default withCookies(withRouter(KeypadContainer));
