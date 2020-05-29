import { observable, flow, computed } from "mobx";

import BaseStore from "stores/BaseStore";
import RootStore from "stores";

import MarketService from "services/market/MarkerService";

import { Dealing, Paging } from "./types";

class MarketStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }
  @observable
  private _averageCondition?: string;

  @observable
  private _paging?: Paging;

  @observable
  private _dealingList: Dealing[] = [];

  @observable
  private _product?: Dealing;

  @observable
  private _mySell: Dealing[] = [];

  @computed
  get AverageCondition() {
    return this._averageCondition;
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

  GetAverageCondition = flow(function* (this: MarketStore) {
    this._init("GET_AVERAGE_CONDITION");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ "market.condition": string }>;
      } = yield MarketService.GetAverageAPI();

      const data = res.data;

      this._averageCondition = data["market.condition"];

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

  PostSell = flow(function* (this: MarketStore, quantity: number, price: number) {
    this._init("POST_SELL");
    try {
      const form = new FormData();
      form.set("quantity", quantity.toString());
      form.set("price", price.toString());

      yield MarketService.PostSellAPI(form);

      this._success["POST_SELL"] = true;
    } catch (e) {
      this._failure["POST_SELL"] = [true, e];
    } finally {
      this._pending["POST_SELL"] = false;
    }
  });

  GetMySell = flow(function* (this: MarketStore, page: number) {
    this._init("GET_MY_SELL");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<Dealing[]>;
      } = yield MarketService.GetMySellAPI(page);

      const data = res.data;

      this._mySell = data;
      this._success["GET_MY_SELL"] = true;
    } catch (e) {
      this._failure["GET_MY_SELL"] = [true, e];
    } finally {
      this._pending["GET_MY_SELL"] = false;
    }
  });

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
}

export default MarketStore;
