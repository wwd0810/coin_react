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
}

export default new UserService();
