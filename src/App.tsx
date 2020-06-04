import React, { Suspense } from "react";
import { Switch, withRouter, RouteComponentProps, RouteProps, Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withCookies, ReactCookieProps } from "react-cookie";
import { Helmet } from "react-helmet";
import { inject, observer } from "mobx-react";

import Loading from "components/common/loading";
import DealSendPage from "pages/deal/DealSendPage";
import CallbackPage from "pages/user/CalllbackPage";
import TermPage from "pages/center/term/TermPage";

import UserStore from "stores/users";
import client from "lib/client";
import ErrorPage from "pages/error/ErrorPage";
import parse from "lib/parse";
import checkRequests from "HOC/CheckRequest";
import MarketStore from "stores/market";
import BusinessPage from "pages/center/term/BusinessPage";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
  marketStore?: MarketStore;
}

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<{}>;
  role: string[] | string;
}

interface State {
  isLoading: boolean;
}

const HomePage = React.lazy(() => import("pages/home/HomePage"));
const DealPage = React.lazy(() => import("pages/deal/DealPage"));
const ListPage = React.lazy(() => import("pages/list/ListPage"));
const DealApplyPage = React.lazy(() => import("pages/deal/DealApplyPage"));
const DealModifyPage = React.lazy(() => import("pages/deal/DealModifyPage"));
const PointChargePage = React.lazy(() => import("pages/point/PointChargePage"));
const PointHistoryPage = React.lazy(() => import("pages/point/PointHistoryPage"));
const MyPage = React.lazy(() => import("pages/mypage/MyPagePage"));
const ModifyUserPage = React.lazy(() => import("pages/mypage/ModifyUserPage"));
const NoticePage = React.lazy(() => import("pages/center/notice/NoticePage"));
const FAQPage = React.lazy(() => import("pages/center/fqa/FAQPage"));
const FaqDetailPage = React.lazy(() => import("pages/center/fqa/FaqDetailPage"));
const ServicePage = React.lazy(() => import("pages/center/service/ServicePage"));

@inject("userStore", "marketStore")
@observer
class App extends React.Component<Props, State> {
  private UserStore = this.props.userStore! as UserStore;
  private MarketStore = this.props.marketStore! as MarketStore;

  state = {
    isLoading: true,
  };

  async componentDidMount() {
    // ================================================================================
    //  자동로그인 및 토큰 설정
    // ================================================================================

    const auth = window.localStorage.getItem("auth");
    if (auth) {
      const LoginData: string = auth;
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      await this.UserStore.GetUser();

      if (this.UserStore.failure["GET_USER"][0]) {
        const error = this.UserStore.failure["GET_USER"][1];

        const code = parse(error);

        if (code === "인증이 유요하지 않습니다.") {
          const RT = window.localStorage.getItem("refresh");
          if (RT) {
            await this.UserStore.GetUserRefreshToken(RT);

            if (this.UserStore.failure["GET_USER_REFRESH_TOKEN"][0]) {
              const code = parse(this.UserStore.failure["GET_USER_REFRESH_TOKEN"][1]);
            }
          }
        }
      }
    }

    // ================================================================================
    // 브라우저 검증
    // ================================================================================
    const agent = navigator.userAgent.toLowerCase();
    if (
      (navigator.appName === "Netscape" && navigator.userAgent.search("Trident") !== -1) ||
      agent.indexOf("msie") !== -1
    ) {
      alert(
        "Microsoft Internet Explore를 지원하지 않습니다.\nChrome, Edge, Safari, Firefox 등의 브라우저를 이용해주세요.",
      );
    }

    // ================================================================================
    //  FCM
    // ================================================================================
    window.receiveToken = (str: string) => {
      this.UserStore.UpdateFcmToken(str);
    };

    // ================================================================================
    //  결제
    // ================================================================================

    window.receivePayResponse = (res: any) => {
      if (res) {
        const { payData } = JSON.parse(res);

        if (payData) {
          this.chargePoint(Number(payData.amount));
        } else {
          alert("결제 실패");
        }
      } else {
        alert("결제 실패");
      }
    };

    this.setState({ isLoading: false });
  }

  chargePoint = async (amount: number) => {
    await this.MarketStore.PostPoint(amount);

    if (this.MarketStore.success["POST_POINT"]) {
      this.props.history.push("/point/history");
    } else {
      if (this.MarketStore.failure["POST_POINT"][0]) {
        const code = parse(this.MarketStore.failure["POST_POINT"][1]);
        alert(code);
      }
    }
  };

  PrivateRoute = ({ component: Component, ...other }: PrivateRouteProps) => {
    return (
      <Route
        {...other}
        render={(props: any) => {
          if (this.state.isLoading) return null;
          if (!this.UserStore.IsLoggedIn) {
            alert("로그인이 필요합니다.");
            return <Redirect to="/mypage" />;
          }

          return <Component {...props} />;
        }}
      />
    );
  };
  render() {
    return (
      <Router>
        <Helmet title="cashlink">
          <title>cashlink</title>
          <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
        </Helmet>
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* ====================================================================== */}
            {/* 로그인 필요 없음 */}
            {/* ====================================================================== */}
            <Route exact path="/error/503" component={ErrorPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/callback" component={CallbackPage} />
            <Route exact path="/term" component={TermPage} />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/business-info" component={BusinessPage} />
            <Route exact path="/center/notice" component={NoticePage} />
            <Route exact path="/center/faq" component={FAQPage} />
            <Route exact path="/center/faq/:title" component={FaqDetailPage} />
            {/* ====================================================================== */}
            {/* 로그인 필요함 */}
            {/* ====================================================================== */}
            <this.PrivateRoute exact path="/deal" role="Login" component={DealPage} />
            <this.PrivateRoute exact path="/deal/send" role="Login" component={DealSendPage} />
            <this.PrivateRoute exact path="/deal/apply" role="Login" component={DealApplyPage} />
            <this.PrivateRoute
              exact
              path="/deal/modify/:idx"
              role="Login"
              component={DealModifyPage}
            />
            <this.PrivateRoute exact path="/list" role="Login" component={ListPage} />
            <this.PrivateRoute
              exact
              path="/point/charge"
              role="Login"
              component={PointChargePage}
            />
            <this.PrivateRoute
              exact
              path="/point/history"
              role="Login"
              component={PointHistoryPage}
            />
            <this.PrivateRoute exact path="/center/service" role="Login" component={ServicePage} />
            <this.PrivateRoute
              exact
              path="/mypage/modify"
              role="Login"
              component={ModifyUserPage}
            />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default withCookies(withRouter(checkRequests(App)));
