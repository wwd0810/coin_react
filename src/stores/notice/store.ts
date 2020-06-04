import { observable, flow, computed } from "mobx";

import BaseStore from "stores/BaseStore";
import RootStore from "stores";

import NoticeService from "services/notice/NoticeService";

import { NoticeType, FAQType, InquiryType } from "./types";
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
  private _noticeList: NoticeType[] = [];

  @observable
  private _faqList: FAQType[] = [];

  // private _notices: Notice[] = [];

  @observable
  private _term: string = "";

  @observable
  private _inquiries: InquiryType[] = [];

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
  get NoticeList() {
    return this._noticeList;
  }

  @computed
  get FAQList() {
    return this._faqList;
  }

  @computed
  get Term() {
    return this._term;
  }

  @computed
  get Inquiries() {
    return this._inquiries;
  }

  @computed
  get Page() {
    return this._paging;
  }

  GetNoticeList = flow(function* (this: NoticeStore) {
    this._init("GET_NOTICE_LIST");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ list: NoticeType[] }>;
      } = yield NoticeService.GetNoticeListAPI();

      const { list } = res.data;

      this._noticeList = list;

      this._success["GET_NOTICE_LIST"] = true;
    } catch (e) {
      this._failure["GET_NOTICE_LIST"] = [true, e];
    } finally {
      this._pending["GET_NOTICE_LIST"] = false;
    }
  });

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

  // GetNotice = flow(function* (
  //   this: NoticeStore,
  //   page: number,
  //   type?: "TRADE" | "WALLET" | "GIFT" | "ETC",
  // ) {
  //   this._init("GET_NOTICE");
  //   try {
  //     const {
  //       data: res,
  //     }: {
  //       data: ApiResult<{ noti: Notice[]; paging: Paging }>;
  //     } = yield NoticeService.GetNoticeAPI(page, type);

  //     const { noti, paging } = res.data;

  //     if (page === 0) {
  //       this._notices = noti;
  //     } else {
  //       noti.forEach((data) => {
  //         this._notices.push(data);
  //       });
  //     }

  //     this._paging = paging;

  //     this._success["GET_NOTICE"] = true;
  //   } catch (e) {
  //     this._failure["GET_NOTICE"] = [true, e];
  //   } finally {
  //     this._pending["GET_NOTICE"] = false;
  //   }
  // });

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

  GetFAQ = flow(function* (this: NoticeStore) {
    this._init("GET_FAQ");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ list: FAQType[] }>;
      } = yield NoticeService.GetFAQListAPI();

      const { list } = res.data;

      this._faqList = list;

      this._success["GET_FAQ"] = true;
    } catch (e) {
      this._failure["GET_FAQ"] = [true, e];
    } finally {
      this._pending["GET_FAQ"] = false;
    }
  });

  GetTerm = flow(function* (this: NoticeStore, title: string) {
    this._init("GET_TERM");

    this._term = "";

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ data: string }>;
      } = yield NoticeService.GetTermAPI(title);

      const { data } = res.data;

      this._term = data;

      this._success["GET_TERM"] = true;
    } catch (e) {
      this._failure["GET_TERM"] = [true, e];
    } finally {
      this._pending["GET_TERM"] = false;
    }
  });

  GetInquiries = flow(function* (this: NoticeStore) {
    this._init("GET_INQUIRIES");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ list: InquiryType[] }>;
      } = yield NoticeService.GetInquiriesAPI();

      const { list } = res.data;

      this._inquiries = list;

      this._success["GET_INQUIRIES"] = true;
    } catch (e) {
      this._failure["GET_INQUIRIES"] = [true, e];
    } finally {
      this._pending["GET_INQUIRIES"] = false;
    }
  });

  PostInquiry = flow(function* (this: NoticeStore, title: string, contents: string) {
    this._init("POST_INQUIRY");

    try {
      yield NoticeService.PostInquiryAPI(title, contents);

      this._success["POST_INQUIRY"] = true;
    } catch (e) {
      this._failure["POST_INQUIRY"] = [true, e];
    } finally {
      this._pending["POST_INQUIRY"] = false;
    }
  });
}

export default NoticeStore;
