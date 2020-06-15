import qs from "query-string";

import auth from "lib/auth";
import client from "lib/client";

class UserService {
  public AccessTokenAPI(code: string | string[]) {
    return auth.post(
      `/oauth/token`,
      qs.stringify({
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_ENCRYPT_KEY}`,
        grant_type: `${process.env.REACT_APP_GRANT_TYPE}`,
        code: code,
        redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
      }),
    );
  }

  public RefreshTokenAPI(code: string | string[]) {
    return auth.post(
      `/oauth/token`,
      qs.stringify({
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_ENCRYPT_KEY}`,
        grant_type: `${process.env.REACT_APP_REFRESH_GRANT_TYPE}`,
        refresh_token: code,
        scope: "read write",
        // redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}`,
      }),
    );
  }

  public GetUserAPI() {
    return client.get(`/api/users/me`);
  }

  public GetUserSyncAPI() {
    return client.get(`/api/users/me/sync`);
  }

  public GetUserAccountAPI() {
    return client.get(`/api/users/me/account`);
  }

  public UpdateFcmTokenAPI(data: FormData) {
    return client.put(`/api/users/me/token`, data);
  }

  public GetUserPurchasesAPI(page: number) {
    return client.get(`/api/users/me/purchases`, { params: { page: page } });
  }

  public GetUserActivityAPI() {
    return client.get(`/api/users/me/market`);
  }

  public GetSearchAPI(type: string, query: string) {
    return client.get(`/api/users/search`, { params: { type, query } });
  }

  public PostSendAPI(from: string, to: string, type: string, amount: string, password: number) {
    return client.post(`/api/users/me/account/remit`, {
      from: from,
      to: to,
      type: type,
      amount: amount,
      password,
    });
  }

  public PostLikeAPI(idx: number) {
    return client.post(`/api/markets/${idx}/like`);
  }

  public GetCPListAPI(code: string, page?: number, query?: string, status?: string) {
    return client.get(`/api/users/me/account/${code}/tx`, {
      params: { page, duration: query, status },
    });
  }

  //  Pin
  public DuplicatePin(password: string) {
    return client.get(`/api/users/me/pin/duplicate`, { params: { password } });
  }

  public PatchPin(password: string) {
    return client.patch(`/api/users/me/pin`, qs.stringify({ password }));
  }
}

export default new UserService();
