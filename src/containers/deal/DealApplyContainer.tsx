import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { inject, observer } from "mobx-react";

import DealApply from "components/deal/apply";

import MarketStore from "stores/market";
import UserStore from "stores/users";

import parse from "lib/parse";

interface Props extends RouteComponentProps, ReactCookieProps {
  marketStore?: MarketStore;
  userStore?: UserStore;
}
@inject("marketStore", "userStore")
@observer
class DealApplyContainer extends React.Component<Props> {
  private MarketStore = this.props.marketStore! as MarketStore;
  private UserStore = this.props.userStore! as UserStore;

  postSell = async (quantity: number, price: number) => {
    await this.MarketStore.PostSell(quantity, price);
    if (this.MarketStore.success["POST_SELL"]) {
    } else {
      if (this.MarketStore.failure["POST_SELL"][0]) {
        const code = parse(this.MarketStore.failure["POST_SELL"][1]);
        alert(code);
      }
    }
  };

  render() {
    return <DealApply user={this.UserStore.User!} postSell={this.postSell} />;
  }
}

export default withCookies(withRouter(DealApplyContainer));
