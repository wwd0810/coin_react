import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import List from "components/list";
import MarketStore from "stores/market";
import { inject, observer } from "mobx-react";
import parse from "lib/parse";
import UserStore from "stores/users";

interface Props extends RouteComponentProps, ReactCookieProps {
  marketStore?: MarketStore;
  userStore?: UserStore;
}

@inject("marketStore", "userStore")
@observer
class ListContainer extends React.Component<Props> {
  private MarketStore = this.props.marketStore! as MarketStore;
  private UserStore = this.props.userStore! as UserStore;

  async componentDidMount() {
    console.log(1);
  }

  // ======================================================================
  // 판매 내약
  // ======================================================================

  // 판매내역 리스트
  getList = async (page: number, status: string, duration: string, more?: boolean) => {
    await this.MarketStore.GetMySell(page, status, duration, more);

    if (this.MarketStore.failure["GET_MY_SELL"][0]) {
      const code = parse(this.MarketStore.failure["GET_MY_SELL"][1]);
      alert(code);
    }
  };

  // 판매 취소
  delete = async (idx: number) => {
    await this.MarketStore.DeleteMarket(idx);

    if (this.MarketStore.success["DELETE_MARKET"]) {
      await this.MarketStore.GetMySell(0, "");
    } else {
      if (this.MarketStore.failure["DELETE_MARKET"][0]) {
        const code = parse(this.MarketStore.failure["DELETE_MARKET"][1]);
        alert(code);
      }
    }
  };

  // 구매 요청 거부
  deny = async (id: number, purId: number, reason: string) => {
    await this.MarketStore.PostPurchaseDeny(id, purId, reason);

    if (this.MarketStore.success["POST_PURCHASE_DENY"]) {
      await this.MarketStore.GetMySell(0, "");
    } else {
      if (this.MarketStore.failure["POST_PURCHASE_DENY"][0]) {
        const code = parse(this.MarketStore.failure["POST_PURCHASE_DENY"][1]);
        alert(code);
      }
    }
  };

  // 구매 요청 승인
  accept = async (id: number, purId: number) => {
    await this.MarketStore.PostPurchaseAccept(id, purId);

    if (this.MarketStore.success["POST_PURCHASE_ACCEPT"]) {
      await this.MarketStore.GetMySell(0, "");
    } else {
      if (this.MarketStore.failure["POST_PURCHASE_ACCEPT"][0]) {
        const code = parse(this.MarketStore.failure["POST_PURCHASE_ACCEPT"][1]);
        alert(code);
      }
    }
  };

  // 가래 완료 처리
  done = async (id: number, purId: number) => {
    await this.MarketStore.PostPurchaseDone(id, purId);

    if (this.MarketStore.success["POST_PURCHASE_DONE"]) {
      await this.MarketStore.GetMySell(0, "");
    } else {
      if (this.MarketStore.failure["POST_PURCHASE_DONE"][0]) {
        const code = parse(this.MarketStore.failure["POST_PURCHASE_DONE"][1]);
        alert(code);
      }
    }
  };

  // 구매자 신고
  buyerReport = async (id: number, purId: number, reason: string) => {
    await this.MarketStore.PostBuyReport(id, purId, reason);

    if (this.MarketStore.failure["POST_BUY_REPORT"][0]) {
      const code = parse(this.MarketStore.failure["POST_BUY_REPORT"][1]);
      alert(code);
    }
  };

  // ======================================================================
  // 구매 내역
  // ======================================================================

  // 구매 내역
  getBuyList = async (page: number, status: string, duration: string, more?: boolean) => {
    await this.MarketStore.GetPurchases(page, status, duration, more);

    if (this.MarketStore.failure["GET_PURCHASES"][0]) {
      const code = parse(this.MarketStore.failure["GET_PURCHASES"][1]);
      alert(code);
    }
  };

  cancleBuy = async (id: number, purId: number) => {
    await this.MarketStore.DeleteBuyCancle(id, purId);

    if (this.MarketStore.success["DELETE_BUY_CANCLE"]) {
      await this.MarketStore.GetPurchases(0, "");
    } else {
      if (this.MarketStore.failure["DELETE_BUY_CANCLE"][0]) {
        const code = parse(this.MarketStore.failure["DELETE_BUY_CANCLE"][1]);
        alert(code);
      }
    }
  };

  // 입금 완료
  deposit = async (id: number, purId: number) => {
    await this.MarketStore.PostPurchaseDeposit(id, purId);

    if (this.MarketStore.success["POST_PURCHASE_DEPOSIT"]) {
      await this.MarketStore.GetPurchases(0, "");
    } else {
      if (this.MarketStore.failure["POST_PURCHASE_DEPOSIT"][0]) {
        const code = parse(this.MarketStore.failure["POST_PURCHASE_DEPOSIT"][1]);
        alert(code);
      }
    }
  };

  // 판매자 신고
  selletReport = async (id: number, purId: number, reason: string) => {
    await this.MarketStore.PostSelletReport(id, purId, reason);

    if (this.MarketStore.failure["POST_SELLER_REPORT"][0]) {
      const code = parse(this.MarketStore.failure["POST_SELLER_REPORT"][1]);
      alert(code);
    }
  };

  // ======================================================================
  // 전송 내역
  // ======================================================================

  // 전송 내역 리스트
  getSendList = async (page: number) => {
    if (this.UserStore.User?.account.filter((data) => data.type === "DILLING")) {
      const code = this.UserStore.User?.account.filter((data) => data.type === "DILLING")[0].id;

      console.log(code);
      await this.UserStore.GetPointList(code, page);
    }

    if (this.UserStore.failure["GET_POINT_LIST"][0]) {
      const code = parse(this.UserStore.failure["GET_POINT_LIST"][1]);
      alert(code);
    }
  };

  render() {
    return (
      <List
        // 공통
        account={this.UserStore.User?.account.filter((data) => data.type === "DILLING")[0]}
        pointList={this.UserStore.CPList}
        histories={this.MarketStore.MySell}
        paging={this.MarketStore.Paging}
        //판매 내역 관련
        getList={this.getList}
        del={this.delete}
        deny={this.deny}
        accept={this.accept}
        done={this.done}
        buyerReport={this.buyerReport}
        //구매 내역 관련
        buyList={this.MarketStore.DealingList}
        getBuyList={this.getBuyList}
        deposit={this.deposit}
        sellerRepost={this.selletReport}
        cancle={this.cancleBuy}
        //전송 내역 관련
        getSendList={this.getSendList}
        pointPaging={this.UserStore.Page}
      />
    );
  }
}

export default withCookies(withRouter(ListContainer));
