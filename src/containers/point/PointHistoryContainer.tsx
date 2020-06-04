import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import PointHistory from "components/point/history";
import UserStore from "stores/users";
import { inject, observer } from "mobx-react";
import parse from "lib/parse";

interface Props extends ReactCookieProps, RouteComponentProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class PointHistoryContainer extends React.Component<Props> {
  private UserStore = this.props.userStore! as UserStore;

  async componentDidMount() {
    if (this.UserStore.User?.account.filter((data) => data.type === "COIN_POINT")) {
      const code = this.UserStore.User?.account.filter((data) => data.type === "COIN_POINT")[0].id;
      await this.UserStore.GetPointList(code);
    }
    if (this.UserStore.failure["GET_POINT_LIST"][0]) {
      const code = parse(this.UserStore.failure["GET_POINT_LIST"][1]);
      alert(code);
    }
  }

  moreGet = async (page: number) => {
    if (this.UserStore.User?.account.filter((data) => data.type === "COIN_POINT")) {
      const code = this.UserStore.User?.account.filter((data) => data.type === "COIN_POINT")[0].id;
      await this.UserStore.GetPointList(code, page);
    }

    if (this.UserStore.failure["GET_POINT_LIST"][0]) {
      const code = parse(this.UserStore.failure["GET_POINT_LIST"][1]);
      alert(code);
    }
  };

  render() {
    return (
      <PointHistory
        cpList={this.UserStore.CPList}
        more={this.moreGet}
        paging={this.UserStore.Page}
      />
    );
  }
}

export default withCookies(withRouter(PointHistoryContainer));
