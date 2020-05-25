import { observable, flow, computed, action } from "mobx";

import BaseStore from "stores/BaseStore";
import RootStore from "stores";
import client from "lib/client";

import { User, Account } from "./types";
import UserService from "services/users/UserService";

class UserStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @observable
  private _isLoggedIn = false;

  @observable
  private _userToken?: string;

  @observable
  private _user?: { user: User; account: Account };

  @observable _userAccount?: Account;

  @computed
  get IsLoggedIn() {
    return this._isLoggedIn;
  }

  @computed
  get UserToken() {
    return this._userToken;
  }

  @computed
  get User() {
    return this._user;
  }

  @action
  public logout() {
    this._isLoggedIn = false;
    this._user = undefined;
    this._userToken = undefined;

    delete client.defaults.headers.common["Authorization"];
  }

  GetUserToken = flow(function* (this: UserStore, code: string | string[]) {
    this._init("GET_USER_TOKEN");
    try {
      const {
        data: res,
      }: {
        data: {
          access_token: string;
          token_type: string;
          expires_in: number;
          scope: string;
          jti: string;
        };
      } = yield UserService.AccessTokenAPI(code);

      const { access_token } = res;

      client.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      this._userToken = access_token;
      this._isLoggedIn = true;

      this._success["GET_USER_TOKEN"] = true;
    } catch (e) {
      this._failure["GET_USER_TOKEN"] = [true, e];
    } finally {
      this._pending["GET_USER_TOKEN"] = false;
    }
  });
}

export default UserStore;
