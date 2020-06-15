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
  idx?: string;
}

interface State {
  open: boolean;
}

@inject("marketStore", "userStore")
@observer
class DealApplyContainer extends React.Component<Props, State> {
  private MarketStore = this.props.marketStore! as MarketStore;
  private UserStore = this.props.userStore! as UserStore;

  state: State = {
    open: false,
  };

  async componentDidMount() {
    await this.MarketStore.GetMarketCondition();

    if (this.props.idx) {
      await this.MarketStore.GetProductDetail(this.props.idx);
    }

    if (this.MarketStore.failure["GET_AVERAGE_CONDITION"][0]) {
      const code = parse(this.MarketStore.failure["GET_AVERAGE_CONDITION"][1]);
      alert(code);
    }

    await this.UserStore.GetUser();

    if (this.UserStore.User) {
      if (!this.UserStore.User.other.check_pin) {
        alert("PIN 비밀번호 설정이 필요합니다.");
        this.props.history.push("/mypage");
      }
    }
  }

  postSell = async (quantity: number, price: number, password: string) => {
    await this.MarketStore.PostSell(quantity, price, password);
    if (this.MarketStore.success["POST_SELL"]) {
      this.setState({ open: true });
    } else {
      if (this.MarketStore.failure["POST_SELL"][0]) {
        const code = parse(this.MarketStore.failure["POST_SELL"][1]);
        alert(code);
      }
    }
  };

  patch = async (idx: number, amount: number, price: number, password: string) => {
    await this.MarketStore.PatchSell(idx, amount, price, password);

    if (this.MarketStore.success["PATCH_SELL"]) {
      this.setState({ open: true });
    } else {
      if (this.MarketStore.failure["PATCH_SELL"][0]) {
        const code = parse(this.MarketStore.failure["PATCH_SELL"][1]);
        alert(code);
      }
    }
  };

  duplicatePin = async (pw: string) => {
    await this.UserStore.duplicatePin(pw);
  };

  handleClose = () => {
    this.setState({ open: false });

    this.props.history.push("/");
  };

  render() {
    return (
      <DealApply
        open={this.state.open}
        close={this.handleClose}
        check={this.UserStore.CheckPin}
        duplicate={this.duplicatePin}
        user={this.UserStore.User!}
        postSell={this.postSell}
        high={this.MarketStore.MarketInfo?.["market.condition_upper"]}
        low={this.MarketStore.MarketInfo?.["market.sale.min"]}
        product={this.props.idx ? this.MarketStore.Product : undefined}
        update={this.patch}
      />
    );
  }
}

export default withCookies(withRouter(DealApplyContainer));
