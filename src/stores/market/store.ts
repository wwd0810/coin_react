import { observable, flow, computed, action } from "mobx";

import BaseStore from "stores/BaseStore";
import RootStore from "stores";

import MarketService from "services/market/MarkerService";

import { Dealing, Paging } from "./types";
import { User } from "stores/users/types";

class MarketStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }
  @observable
  private _marketInfo?: {
    "market.condition": string;
    "market.buy.user_apply_limit": string;
    "market.condition_lower": string;
    "market.condition_upper": string;
    "market.fees": string;
    "market.sale.step": string;
    "market.sale.min": string;
    "market.sale.user_apply_limit": string;
    "market.sale.max": string;
  };

  @observable
  private _paging?: Paging;

  @observable
  private _dealingList: Dealing[] = [];

  @observable
  private _product?: Dealing;

  @observable
  private _mySell: Dealing[] = [];

  @computed
  get MarketInfo() {
    return this._marketInfo;
  }

  @computed
  get Paging() {
    return this._paging;
  }

  @computed
  get DealingList() {
    return this._dealingList;
  }

  @computed
  get Product() {
    return this._product;
  }

  @computed
  get MySell() {
    return this._mySell;
  }

  @action
  public reset() {
    this._product = undefined;
  }

  GetMarketCondition = flow(function* (this: MarketStore) {
    this._init("GET_AVERAGE_CONDITION");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{
          "market.condition": string;
          "market.buy.user_apply_limit": string;
          "market.condition_lower": string;
          "market.condition_upper": string;
          "market.fees": string;
          "market.sale.step": string;
          "market.sale.min": string;
          "market.sale.user_apply_limit": string;
          "market.sale.max": string;
        }>;
      } = yield MarketService.GetAverageAPI();

      const data = res.data;

      this._marketInfo = data;

      this._success["GET_AVERAGE_CONDITION"] = true;
    } catch (e) {
      this._failure["GET_AVERAGE_CONDITION"] = [true, e];
    } finally {
      this.pending["GET_AVERAGE_CONDITION"] = false;
    }
  });

  GetDealingList = flow(function* (
    this: MarketStore,
    page: number,
    order: string,
    query?: string,
    more?: boolean,
  ) {
    this._init("GET_DEALING_LIST");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{
          content: Dealing[];
          paging: Paging;
          // pageable: Pageable;
          // totalPages: number;
          // totalElements: number;
          // last: boolean;
          // size: number;
          // sort: Sort;
          // numberOfElements: number;
          // first: boolean;
          // empty: boolean;
        }>;
      } = yield MarketService.GetDlListAPI(page, order, query);

      const { content, paging } = res.data;

      this._paging = paging;
      // more 을 보내면 추가 안보내면 10개 기본 ex) 처음에는 more 안보내랑
      if (more) {
        content.forEach((data) => {
          this._dealingList.push(data);
        });
      } else {
        this._dealingList = [];

        this._dealingList = content;
      }

      this._success["GET_DEALING_LIST"] = true;
    } catch (e) {
      this._failure["GET_DEALING_LIST"] = [true, e];
    } finally {
      this._pending["GET_DEALING_LIST"] = false;
    }
  });

  GetProductDetail = flow(function* (this: MarketStore, idx: string) {
    this._product = undefined;
    this._init("GET_PRODUCT_DETAIL");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ market: Dealing }>;
      } = yield MarketService.GetProductDetailAPI(idx);
      const { market } = res.data;

      this._product = market;
      this._success["GET_PRODUCT_DETAIL"] = true;
    } catch (e) {
      this._failure["GET_PRODUCT_DETAIL"] = [true, e];
    } finally {
      this._pending["GET_PRODUCT_DETAIL"] = false;
    }
  });

  PostPoint = flow(function* (this: MarketStore, amount: number) {
    this._init("POST_POINT");

    try {
      const data = new FormData();

      data.set("amount", amount.toString());

      yield MarketService.PostPointAPI(data);
      this._success["POST_POINT"] = true;
    } catch (e) {
      this._failure["POST_POINT"] = [true, e];
    } finally {
      this._pending["POST_POINT"] = false;
    }
  });

  PostAccept = flow(function* (this: MarketStore, idx: number) {
    this._init("POST_ACCEPT");

    try {
      yield MarketService.PostAcceptAPI(idx);

      this._success["POST_ACCEPT"] = true;
    } catch (e) {
      this._failure["POST_ACCEPT"] = [true, e];
    } finally {
      this._pending["POST_ACCEPT"] = false;
    }
  });

  // ======================================================================
  // 판매
  // ======================================================================

  GetMySell = flow(function* (
    this: MarketStore,
    page: number,
    status?: string,
    duration?: string,
    more?: boolean,
    query?: string,
  ) {
    this._init("GET_MY_SELL");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ markets: Dealing[]; paging: Paging }>;
      } = yield MarketService.GetMySellAPI(page, status, duration, query);

      const { markets, paging } = res.data;

      if (more) {
        this._mySell = this._mySell.concat(markets);
      } else {
        this._mySell = markets;
      }

      this._paging = paging;

      this._success["GET_MY_SELL"] = true;
    } catch (e) {
      this._failure["GET_MY_SELL"] = [true, e];
    } finally {
      this._pending["GET_MY_SELL"] = false;
    }
  });

  PostSell = flow(function* (this: MarketStore, quantity: number, price: number, password: string) {
    this._init("POST_SELL");
    try {
      const form = new FormData();
      form.set("quantity", quantity.toString());
      form.set("price", price.toString());

      yield MarketService.PostSellAPI("DILLING", quantity, price, password);

      this._success["POST_SELL"] = true;
    } catch (e) {
      this._failure["POST_SELL"] = [true, e];
    } finally {
      this._pending["POST_SELL"] = false;
    }
  });

  PatchSell = flow(function* (
    this: MarketStore,
    idx: number,
    amount: number,
    price: number,
    password: string,
  ) {
    this._init("PATCH_SELL");

    try {
      yield MarketService.PatchSellAPI(idx, "DILLING", amount, price, password);

      this._success["PATCH_SELL"] = true;
    } catch (e) {
      this._failure["PATCH_SELL"] = [true, e];
    } finally {
      this._pending["PATCH_SELL"] = false;
    }
  });

  GetBuyer = flow(function* (this: MarketStore, id: number, purId: number) {
    this._init("GET_BUYER");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ user: User }>;
      } = yield MarketService.GetBuyerAPI(id, purId);

      const { user } = res.data;

      this._success["GET_BUYER"] = true;
    } catch (e) {
      this._failure["GET_BUYER"] = [true, e];
    } finally {
      this._pending["GET_BUYER"] = false;
    }
  });

  PostPurchaseAccept = flow(function* (this: MarketStore, id: number, purId: number) {
    this._init("POST_PURCHASE_ACCEPT");

    try {
      yield MarketService.PostPurchaseAcceptAPI(id, purId);

      this._success["POST_PURCHASE_ACCEPT"] = true;
    } catch (e) {
      this._failure["POST_PURCHASE_ACCEPT"] = [true, e];
    } finally {
      this._pending["POST_PURCHASE_ACCEPT"] = false;
    }
  });

  PostPurchaseDeny = flow(function* (this: MarketStore, id: number, purId: number, reason: string) {
    this._init("POST_PURCHASE_DENY");

    try {
      yield MarketService.PostPurchaseDenyAPI(id, purId, reason);

      this._success["POST_PURCHASE_DENY"] = true;
    } catch (e) {
      this._failure["POST_PURCHASE_DENY"] = [true, e];
    } finally {
      this._pending["POST_PURCHASE_DENY"] = false;
    }
  });

  PostPurchaseDone = flow(function* (this: MarketStore, id: number, purId: number) {
    this._init("POST_PURCHASE_DONE");

    try {
      yield MarketService.PostPurchaseDoneAPI(id, purId);

      this._success["POST_PURCHASE_DONE"] = true;
    } catch (e) {
      this._failure["POST_PURCHASE_DONE"] = [true, e];
    } finally {
      this._pending["POST_PURCHASE_DONE"] = false;
    }
  });

  PostBuyReport = flow(function* (this: MarketStore, id: number, purId: number, reason: string) {
    this._init("POST_BUY_REPORT");

    try {
      yield MarketService.PostBuyReportAPI(id, purId, reason);

      this._success["POST_BUY_REPORT"] = true;
    } catch (e) {
      this._failure["POST_BUY_REPORT"] = [true, e];
    } finally {
      this._pending["POST_BUY_REPORT"] = false;
    }
  });

  DeleteMarket = flow(function* (this: MarketStore, idx: number) {
    this._init("DELETE_MARKET");

    try {
      yield MarketService.DeleteMarketAPI(idx);

      this._success["DELETE_MARKET"] = true;
    } catch (e) {
      this._failure["DELETE_MARKET"] = [true, e];
    } finally {
      this._pending["DELETE_MARKET"] = false;
    }
  });

  // ======================================================================
  // 구매
  // ======================================================================

  // 구매내역
  GetPurchases = flow(function* (
    this: MarketStore,
    page: number,
    status: string,
    duration?: string,
    query?: string,
    more?: boolean,
  ) {
    this._init("GET_PURCHASES");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ list: Dealing[]; paging: Paging }>;
      } = yield MarketService.GetpurchasesAPI(page, status, duration, query);

      const { list, paging } = res.data;

      if (more) {
        this._dealingList = this._mySell.concat(list);
      } else {
        console.log(list);
        this._dealingList = list;
      }

      this._paging = paging;

      this._success["GET_PURCHASES"] = true;
    } catch (e) {
      this._failure["GET_PURCHASES"] = [true, e];
    } finally {
      this._pending["GET_PURCHASES"] = false;
    }
  });

  // 구매 요청 등록
  DeleteBuyCancle = flow(function* (this: MarketStore, id: number, purId: number) {
    this._init("DELETE_BUY_CANCLE");
    try {
      yield MarketService.DeleteBuyCancleAPI(id, purId);
      this._success["DELETE_BUY_CANCLE"] = true;
    } catch (e) {
      this._failure["DELETE_BUY_CANCLE"] = [true, e];
    } finally {
      this._pending["DELETE_BUY_CANCLE"] = false;
    }
  });

  // 구매 요청 등록
  PostBuyApply = flow(function* (this: MarketStore, id: number) {
    this._init("POST_BUY_APPLY");
    try {
      yield MarketService.PostBuyApplyAPI(id);
      this._success["POST_BUY_APPLY"] = true;
    } catch (e) {
      this._failure["POST_BUY_APPLY"] = [true, e];
    } finally {
      this._pending["POST_BUY_APPLY"] = false;
    }
  });

  // 입금 완료
  PostPurchaseDeposit = flow(function* (this: MarketStore, id: number, purId: number) {
    this._init("POST_PURCHASE_DEPOSIT");

    try {
      yield MarketService.PostPurchaseDepositAPI(id, purId);

      this._success["POST_PURCHASE_DEPOSIT"] = true;
    } catch (e) {
      this._failure["POST_PURCHASE_DEPOSIT"] = [true, e];
    } finally {
      this._pending["POST_PURCHASE_DEPOSIT"] = false;
    }
  });

  // 판매자 신고
  PostSelletReport = flow(function* (this: MarketStore, id: number, purId: number, reason: string) {
    this._init("POST_SELLER_REPORT");

    try {
      yield MarketService.PostSelletReportAPI(id, purId, reason);

      this._success["POST_SELLER_REPORT"] = true;
    } catch (e) {
      this._failure["POST_SELLER_REPORT"] = [true, e];
    } finally {
      this._pending["POST_SELLER_REPORT"] = false;
    }
  });

  // ======================================================================
  // 전송
  // ======================================================================
}

export default MarketStore;
