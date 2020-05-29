import { observable, flow, computed, action } from "mobx";

import BaseStore from "stores/BaseStore";
import RootStore from "stores";
import client from "lib/client";
import NoticeService from "services/notice/NoticeService";

import { Notice } from "./types";
import { Paging } from "stores/market/types";

class NoticeStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @observable
  private _unRead?: boolean;

  @observable
  private _notices: Notice[] = [];

  @observable
  private _paging?: Paging;

  @computed
  get UnRead() {
    return this._unRead;
  }

  @computed
  get paging() {
    return this._paging;
  }

  @computed
  get Notices() {
    return this._notices;
  }

  @computed
  get Page() {
    return this._paging;
  }

  GetUnRead = flow(function* (this: NoticeStore) {
    this._init("GET_UNREAD");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ exists: boolean }>;
      } = yield NoticeService.GetUnReadAPI();

      const { exists } = res.data;

      this._unRead = exists;
      this._success["GET_UNREAD"] = true;
    } catch (e) {
      this._failure["GET_UNREAD"] = [true, e];
    } finally {
      this._pending["GET_UNREAD"] = false;
    }
  });

  GetNotice = flow(function* (
    this: NoticeStore,
    page: number,
    type?: "TRADE" | "WALLET" | "GIFT" | "ETC",
  ) {
    this._init("GET_NOTICE");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ noti: Notice[]; paging: Paging }>;
      } = yield NoticeService.GetNoticeAPI(page, type);

      const { noti, paging } = res.data;

      if (page === 0) {
        this._notices = noti;
      } else {
        noti.forEach((data) => {
          this._notices.push(data);
        });
      }

      this._paging = paging;

      this._success["GET_NOTICE"] = true;
    } catch (e) {
      this._failure["GET_NOTICE"] = [true, e];
    } finally {
      this._pending["GET_NOTICE"] = false;
    }
  });

  PostNoticeRead = flow(function* (this: NoticeStore, id: number) {
    this._init("POST_NOTICE_READ");
    try {
      yield NoticeService.PostReadAPI(id);
      this._success["POST_NOTICE_READ"] = true;
    } catch (e) {
      this.failure["POST_NOTICE_READ"] = [true, e];
    } finally {
      this._pending["POST_NOTICE_READ"] = false;
    }
  });
}

export default NoticeStore;
