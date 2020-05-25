import React from "react";
import qs from "query-string";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { inject, observer } from "mobx-react";

import Loading from "components/common/loading";

import UserStore from "stores/users";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class CallbackContainer extends React.Component<Props> {
  private UserStore = this.props.userStore! as UserStore;

  async componentDidMount() {
    const location = this.props.location;

    if (location.search === "" || !location.search) {
      alert("로그인 정보가 올바르지않습니다.\n다시로그인해주세요");
      window.location.replace("/");
      return;
    }

    const query = qs.parse(location.search);

    if (!query["code"]) {
      alert("로그인 정보가 올바르지않습니다.\n다시로그인해주세요");
      window.location.replace("/");
      return;
    }

    const code = query["code"];

    await this.UserStore.GetUserToken(code);

    if (this.UserStore.success["GET_USER_TOKEN"]) {
      const LoginData = this.UserStore.UserToken;
      // await this.UserStore.GetUser();
      window.ReactNativeWebView?.postMessage("getToken|");
      window.localStorage.setItem("auth", LoginData!);
      this.props.history.push("/");
    } else {
      if (this.UserStore.failure["GET_USER_TOKEN"][0]) {
        alert("로그인 실패");
      }
    }
  }
  render() {
    return <Loading />;
  }
}

export default withCookies(withRouter(CallbackContainer));
