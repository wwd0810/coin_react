import { observable, flow, computed, action } from "mobx";

import BaseStore from "stores/BaseStore";
import RootStore from "stores";
import client from "lib/client";

import { User, Account, UserActivity, PointType, OtherType } from "./types";
import UserService from "services/users/UserService";
import { Paging } from "stores/market/types";

class UserStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @observable
  private _checkPin: boolean = false;

  @observable
  private _openModal: boolean = false;

  @observable _modalType: string = "";

  @observable
  private _isLoggedIn = false;

  @observable
  private _userToken?: string;

  @observable
  private _refreshToken?: string;

  @observable
  private _user?: { user: User; account: Account[]; other: OtherType };

  @observable
  private _userAccount: Account[] = [];

  @observable
  private _userActivity?: UserActivity;

  @observable
  private _searchUser: Account[] = [];

  @observable
  private _cpList: PointType[] = [];

  @observable
  private _page?: Paging;

  @computed
  get IsLoggedIn() {
    return this._isLoggedIn;
  }

  @computed
  get UserToken() {
    return this._userToken;
  }

  @computed
  get RefreshToken() {
    return this._refreshToken;
  }

  @computed
  get User() {
    return this._user;
  }

  @computed
  get UserAccount() {
    return this._userAccount;
  }

  @computed
  get UserActivity() {
    return this._userActivity;
  }

  @computed
  get CheckPin() {
    return this._checkPin;
  }

  @computed
  get SearchUser() {
    return this._searchUser;
  }

  @computed
  get ModalType() {
    return this._modalType;
  }

  @computed
  get OpenModal() {
    return this._openModal;
  }

  @computed
  get CPList() {
    return this._cpList;
  }

  @computed
  get Page() {
    return this._page;
  }

  @action
  public setModal(type: string) {
    this._openModal = true;
    this._modalType = type;
  }

  @action
  public closeModal() {
    this._modalType = "";
    this._openModal = false;
  }

  @action
  public logout() {
    this._isLoggedIn = false;
    this._user = undefined;
    this._userToken = undefined;

    delete client.defaults.headers.common["Authorization"];
  }

  duplicatePin = flow(function* (this: UserStore, pw: string) {
    this._init("DUPLICATE_PIN");
    try {
      yield UserService.DuplicatePin(pw);

      this._checkPin = true;

      this._success["DUPLICATE_PIN"] = true;
    } catch (e) {
      this._failure["DUPLICATE_PIN"] = [true, e];
    } finally {
      this._pending["DUPLICATE_PIN"] = false;
    }
  });

  PatchPin = flow(function* (this: UserStore, pw: string) {
    this._init("PATCH_PIN");

    try {
      yield UserService.PatchPin(pw);

      this._checkPin = false;

      this._success["PATCH_PIN"] = true;
    } catch (e) {
      this._failure["PATCH_PIN"] = [true, e];
    } finally {
      this._pending["PATCH_PIN"] = false;
    }
  });

  GetSearch = flow(function* (this: UserStore, type: string, query: string) {
    this._init("GET_SEARCH");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ list: Account[] }>;
      } = yield UserService.GetSearchAPI(type, query);

      const { list } = res.data;

      this._searchUser = list;

      this._success["GET_SEARCH"] = true;
    } catch (e) {
      this._failure["GET_SEARCH"] = [true, e];
    } finally {
      this._pending["GET_SEARCH"] = false;
    }
  });

  GetUserToken = flow(function* (this: UserStore, code: string | string[]) {
    this._init("GET_USER_TOKEN");
    try {
      const {
        data: res,
      }: {
        data: {
          access_token: string;
          token_type: string;
          refresh_token: string;
          expires_in: number;
          scope: string;
          jti: string;
        };
      } = yield UserService.AccessTokenAPI(code);

      const { access_token, refresh_token } = res;

      client.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      this._userToken = access_token;
      this._isLoggedIn = true;
      this._refreshToken = refresh_token;

      this._success["GET_USER_TOKEN"] = true;
    } catch (e) {
      this._failure["GET_USER_TOKEN"] = [true, e];
    } finally {
      this._pending["GET_USER_TOKEN"] = false;
    }
  });

  GetUserRefreshToken = flow(function* (this: UserStore, code: string | string[]) {
    this._init("GET_USER_REFRESH_TOKEN");
    try {
      const {
        data: res,
      }: {
        data: {
          access_token: string;
          token_type: string;
          refresh_token: string;
          expires_in: number;
          scope: string;
          jti: string;
        };
      } = yield UserService.RefreshTokenAPI(code);

      const { access_token, refresh_token } = res;

      client.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      this._userToken = access_token;
      this._isLoggedIn = true;
      this._refreshToken = refresh_token;

      this._success["GET_USER_REFRESH_TOKEN"] = true;
    } catch (e) {
      this._failure["GET_USER_REFRESH_TOKEN"] = [true, e];
    } finally {
      this._pending["GET_USER_REFRESH_TOKEN"] = false;
    }
  });

  GetUser = flow(function* (this: UserStore) {
    this._init("GET_USER");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ user: User; account: Account[]; other: OtherType }>;
      } = yield UserService.GetUserAPI();

      const { user, account, other } = res.data;

      this._user = { user, account, other };
      this._isLoggedIn = true;
      this._success["GET_USER"] = true;
    } catch (e) {
      this._failure["GET_USER"] = [true, e];
    } finally {
      this._pending["GET_USER"] = false;
    }
  });

  GetUserActivity = flow(function* (this: UserStore) {
    this._init("GET_USER_ACTIVITY");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<UserActivity>;
      } = yield UserService.GetUserActivityAPI();

      this._userActivity = res.data;

      this._success["GET_USER_ACTIVITY"] = true;
    } catch (e) {
      this._failure["GET_USER_ACTIVITY"] = [true, e];
    } finally {
      this._pending["GET_USER_ACTIVITY"] = false;
    }
  });

  GetUserAccount = flow(function* (this: UserStore) {
    this._init("GET_USER_ACCOUNT");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ account: Account[] }>;
      } = yield UserService.GetUserAccountAPI();

      const { account } = res.data;

      this._userAccount = account;
      this._success["GET_USER_ACCOUNT"] = true;
    } catch (e) {
      this._failure["GET_USER_ACCOUNT"] = [true, e];
    } finally {
      this._pending["GET_USER_ACCOUNT"] = false;
    }
  });

  UpdateFcmToken = flow(function* (this: UserStore, token: string) {
    this._init("UPDATE_FCM_TOKEN");
    try {
      const form = new FormData();
      form.set("token", token);
      yield UserService.UpdateFcmTokenAPI(form);
      this._success["UPDATE_FCM_TOKEN"] = true;
    } catch (e) {
      this._failure["UPDATE_FCM_TOKEN"] = [true, e];
    } finally {
      this._pending["UPDATE_FCM_TOKEN"] = false;
    }
  });

  PostLike = flow(function* (this: UserStore, idx: number) {
    this._init("POST_LIKE");

    try {
      yield UserService.PostLikeAPI(idx);

      this._success["POST_LIST"] = true;
    } catch (e) {
      this._failure["POST_LIST"] = [true, e];
    } finally {
      this._pending["POST_LIST"] = false;
    }
  });

  PostSend = flow(function* (
    this: UserStore,
    from: string,
    to: string,
    type: string,
    amount: string,
    password: number,
  ) {
    this._init("POST_SEND");

    try {
      yield UserService.PostSendAPI(from, to, type, amount, password);

      this._searchUser = [];

      this._success["POST_SEND"] = true;
    } catch (e) {
      this._failure["POST_SEND"] = [true, e];
    } finally {
      this._pending["POST_SEND"] = false;
    }
  });

  GetPointList = flow(function* (
    this: UserStore,
    code: string,
    page?: number,
    query?: string,
    status?: string,
  ) {
    this._init("GET_POINT_LIST");

    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ paging: Paging; list: PointType[] }>;
      } = yield UserService.GetCPListAPI(code, page, query, status);

      const { list, paging } = res.data;

      this._page = paging;
      if (page) {
        this._cpList = this._cpList.concat(list);
      } else {
        this._cpList = list;
      }

      this._success["GET_POINT_LIST"] = true;
    } catch (e) {
      this._failure["GET_POINT_LIST"] = [true, e];
    } finally {
      this._pending["GET_POINT_LIST"] = false;
    }
  });
}

export default UserStore;
