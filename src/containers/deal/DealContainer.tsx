import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { inject, observer } from "mobx-react";

import parse from "lib/parse";
import MarketStore from "stores/market";

import Deal from "components/deal";
import UserStore from "stores/users";

interface Props extends RouteComponentProps, ReactCookieProps {
  marketStore?: MarketStore;
  userStore?: UserStore;
}

@inject("userStore", "marketStore")
@observer
class DealContainer extends React.Component<Props> {
  private MarketStore = this.props.marketStore! as MarketStore;
  private UserStore = this.props.userStore! as UserStore;

  async componentDidMount() {
    // 기본값으로 처름에는 페이지 : 0 정렬 : RECENT
    await this.MarketStore.GetDealingList(0, "RECENT|DESC");
    if (this.MarketStore.failure["GET_DEALING_LIST"][0]) {
      const code = parse(this.MarketStore.failure["GET_DEALING_LIST"][1]);
      alert(code);
    }
    await this.MarketStore.GetMarketCondition();
    if (this.MarketStore.failure["GET_AVERAGE_CONDITION"][0]) {
      const code = parse(this.MarketStore.failure["GET_AVERAGE_CONDITION"][1]);
      alert(code);
    }
  }

  getList = async (page: number, order: string, query?: string, more?: boolean) => {
    if (more) {
      await this.MarketStore.GetDealingList(page, order, query, more);
      if (this.MarketStore.failure["GET_DEALING_LIST"][0]) {
        const code = parse(this.MarketStore.failure["GET_DEALING_LIST"][1]);
        alert(code);
      }
    } else {
      await this.MarketStore.GetDealingList(page, order, query);
      if (this.MarketStore.failure["GET_DEALING_LIST"][0]) {
        const code = parse(this.MarketStore.failure["GET_DEALING_LIST"][1]);
        alert(code);
      }
    }
  };

  buyApply = async (idx: number) => {
    await this.MarketStore.PostBuyApply(idx);

    if (this.MarketStore.success["POST_BUY_APPLY"]) {
      this.props.history.push("/list");
    } else {
      if (this.MarketStore.failure["POST_BUY_APPLY"][0]) {
        const code = parse(this.MarketStore.failure["POST_BUY_APPLY"][1]);
        alert(code);
      }
    }
  };

  toggleLike = async (idx: number) => {
    await this.UserStore.PostLike(idx);
  };

  render() {
    return (
      <Deal
        buy={this.buyApply}
        postLike={this.toggleLike}
        deal={this.MarketStore.DealingList}
        info={this.MarketStore.MarketInfo?.["market.condition"]}
        paging={this.MarketStore.Paging!}
        getList={this.getList}
      />
    );
  }
}

export default withCookies(withRouter(DealContainer));
