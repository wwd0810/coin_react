import UserStore from "./users/";
import MarketStore from "./market";
import NoticeStore from "./notice/";

class RootStore {
  userStore: UserStore;
  marketStore: MarketStore;
  noticeStore: NoticeStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.marketStore = new MarketStore(this);
    this.noticeStore = new NoticeStore(this);
  }
}

export default RootStore;
