import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { inject, observer } from "mobx-react";

import Home from "components/home";
import UserStore from "stores/users";
import parse from "lib/parse";
import MarketStore from "stores/market";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
  marketStore?: MarketStore;
}

@inject("userStore", "marketStore")
@observer
class HomeContainer extends React.Component<Props> {
  private userStore = this.props.userStore! as UserStore;
  private MarketStore = this.props.marketStore! as MarketStore;

  async componentDidMount() {
    const auth = window.localStorage.getItem("auth");

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("goBack|true");
    }

    if (auth) {
      await this.userStore.GetUser();

      if (this.userStore.failure["GET_USER"][0]) {
        const code = parse(this.userStore.failure["GET_USER"][1]);

        if (code === "인증이 유요하지 않습니다.") {
          const RT = window.localStorage.getItem("refresh");
          if (RT) {
            await this.userStore.GetUserRefreshToken(RT);

            if (this.userStore.failure["GET_USER_REFRESH_TOKEN"][0]) {
              const code = parse(this.userStore.failure["GET_USER_REFRESH_TOKEN"][1]);

              alert(code);
            }
          }
        }
      }
    }
  }

  // chargePoint = async (amount: number) => {
  //   await this.MarketStore.PostPoint(amount);
  //   alert("12312");
  //   if (this.MarketStore.success["POST_POINT"]) {
  //     this.props.history.push("/point/history");
  //   } else {
  //     if (this.MarketStore.failure["POST_POINT"][0]) {
  //       const code = parse(this.MarketStore.failure["POST_POINT"][1]);
  //       alert(code);
  //     }
  //   }
  // };

  render() {
    return (
      <Home
        // chargePoint={this.chargePoint}
        account={this.userStore.User?.account}
        point={
          this.userStore.User?.account.filter((data) => data.type === "COIN_POINT")[0].quantity
        }
        openModal={this.userStore.OpenModal}
        modalType={this.userStore.ModalType}
      />
    );
  }
}

export default withCookies(withRouter(HomeContainer));
