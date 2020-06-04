import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import { observer, inject } from "mobx-react";

import MyPage from "components/mypage";
import UserStore from "stores/users";
import parse from "lib/parse";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class MyPageContainer extends React.Component<Props> {
  private userStore = this.props.userStore! as UserStore;

  async componentDidMount() {
    const auth = window.localStorage.getItem("auth");
    if (auth) {
      await this.userStore.GetUserActivity();

      if (this.userStore.failure["GET_USER_ACTIVITY"][0]) {
        const code = parse(this.userStore.failure["GET_USER_ACTIVITY"][1]);
        if (code === "인증이 유요하지 않습니다.") {
          const RT = window.localStorage.getItem("refresh");
          if (RT) {
            await this.userStore.GetUserRefreshToken(RT);

            if (this.userStore.failure["GET_USER_REFRESH_TOKEN"][0]) {
              const code = parse(this.userStore.failure["GET_USER_REFRESH_TOKEN"][1]);

              alert(code);
            }
          }
        }
      }
    }
  }

  logout = async () => {
    this.userStore.logout();
    this.props.cookies!.remove("auth", { path: "/" });
    this.props.history.push("/");
  };

  render() {
    return (
      <MyPage
        isLoggined={this.userStore.IsLoggedIn}
        userAct={this.userStore.UserActivity}
        user={this.userStore.User?.user}
        logout={this.logout}
      />
    );
  }
}

export default withCookies(withRouter(MyPageContainer));
