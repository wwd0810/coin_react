import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import PointCharge from "components/point/charge";
import UserStore from "stores/users";
import { inject, observer } from "mobx-react";
import MarketStore from "stores/market";
import parse from "lib/parse";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
  marketStore?: MarketStore;
}

@inject("userStore", "marketStore")
@observer
class PointChargeContainer extends React.Component<Props> {
  private UserStore = this.props.userStore! as UserStore;
  private MarketStore = this.props.marketStore! as MarketStore;

  async componentDidMount() {
    await this.UserStore.GetUser();

    if (this.UserStore.failure["GET_USER"][0]) {
      const code = parse(this.UserStore.failure["GET_USER"][1]);
      alert(code);
    }
  }

  chargePoint = async (amount: number) => {
    await this.MarketStore.PostPoint(amount);

    if (this.MarketStore.failure["POST_POINT"][0]) {
      const code = parse(this.MarketStore.failure["POST_POINT"][1]);
      alert(code);
    }
  };

  render() {
    return (
      <PointCharge
        user={this.UserStore.User?.user}
        account={this.UserStore.User?.account.filter((data) => data.type === "COIN_POINT")[0]}
        chargePoint={this.chargePoint}
      />
    );
  }
}

export default withCookies(withRouter(PointChargeContainer));
