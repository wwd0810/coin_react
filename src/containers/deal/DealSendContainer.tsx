import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import DealSend from "components/deal/send";
import UserStore from "stores/users";
import { inject, observer } from "mobx-react";

import parse from "lib/parse";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

interface State {
  open: boolean;
}

@inject("userStore")
@observer
class DealSendContainer extends React.Component<Props, State> {
  private UserStore = this.props.userStore! as UserStore;

  state: State = {
    open: false,
  };

  async componentDidMount() {
    await this.UserStore.GetUser();

    if (this.UserStore.User) {
      if (!this.UserStore.User?.other.check_pin) {
        alert("PIN 비밀번호 설정이 필요합니다.");

        this.props.history.push("/mypage");
      }
    }
  }

  findUser = async (type: string, query: string) => {
    await this.UserStore.GetSearch(type, query);

    if (this.UserStore.failure["GET_SEARCH"][0]) {
      alert("유저없음");
    }
  };

  post = async (to: string, type: string, amount: string, password: number) => {
    const res = this.UserStore.User?.account.filter((data) => data.type === "DILLING")[0].id;

    if (res) {
      await this.UserStore.PostSend(res, to, type, amount, password);

      if (this.UserStore.success["POST_SEND"]) {
        this.setState({ open: true });
        // this.props.history.push("/");
      } else {
        if (this.UserStore.failure["POST_SEND"][0]) {
          const code = parse(this.UserStore.failure["POST_SEND"][1]);
          alert(code);
        }
      }
    }
  };

  duplicatePin = async (pw: string) => {
    await this.UserStore.duplicatePin(pw);
  };

  handleClose = () => {
    this.setState({ open: false });

    this.props.history.push("/");
  };

  goback = () => {
    this.setState({ open: false });
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <DealSend
          goback={this.goback}
          modalOpen={this.state.open}
          close={this.handleClose}
          check={this.UserStore.CheckPin}
          duplicate={this.duplicatePin}
          accounts={this.UserStore.User?.account}
          findUser={this.findUser}
          findAccounts={this.UserStore.SearchUser}
          post={this.post}
        />
      </>
    );
  }
}

export default withCookies(withRouter(DealSendContainer));
