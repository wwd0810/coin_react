import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { inject, observer } from "mobx-react";

import parse from "lib/parse";
import MarketStore from "stores/market";

import Deal from "components/deal";

interface Props extends RouteComponentProps, ReactCookieProps {
  marketStore?: MarketStore;
}

@inject("marketStore")
@observer
class DealContainer extends React.Component<Props> {
  private MarketStore = this.props.marketStore! as MarketStore;

  async componentDidMount() {
    // 기본값으로 처름에는 페이지 : 0 정렬 : RECENT
    await this.MarketStore.GetDealingList(0, "RECENT|DESC");
    if (this.MarketStore.failure["GET_DEALING_LIST"][0]) {
      const code = parse(this.MarketStore.failure["GET_DEALING_LIST"][1]);
      alert(code);
    }
    this.MarketStore.GetAverageCondition();
    if (this.MarketStore.failure["GET_AVERAGE_CONDITION"][0]) {
      const code = parse(this.MarketStore.failure["GET_AVERAGE_CONDITION"][1]);
      alert(code);
    }
  }

  getList = async (page: number, order: string, query?: string, more?: boolean) => {
    if (more) {
      this.MarketStore.GetDealingList(page, order, query, more);
      if (this.MarketStore.failure["GET_DEALING_LIST"][0]) {
        const code = parse(this.MarketStore.failure["GET_DEALING_LIST"][1]);
        alert(code);
      }
    } else {
      this.MarketStore.GetDealingList(page, order, query);
      if (this.MarketStore.failure["GET_DEALING_LIST"][0]) {
        const code = parse(this.MarketStore.failure["GET_DEALING_LIST"][1]);
        alert(code);
      }
    }
  };

  render() {
    return (
      <Deal
        deal={this.MarketStore.DealingList}
        info={this.MarketStore.AverageCondition!}
        paging={this.MarketStore.Paging!}
        getList={this.getList}
      />
    );
  }
}

export default withCookies(withRouter(DealContainer));
