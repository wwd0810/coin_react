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
}

export default new UserService();
