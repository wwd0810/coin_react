import React, { Suspense } from "react";
import { Switch, withRouter, RouteComponentProps, RouteProps, Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withCookies, ReactCookieProps } from "react-cookie";
import { Helmet } from "react-helmet";
import { inject, observer } from "mobx-react";

import Loading from "components/common/loading";
import KeypadPage from "pages/keypad/KeypadPage";
import DealSendPage from "pages/deal/DealSendPage";
import CallbackPage from "pages/user/CalllbackPage";

import UserStore from "stores/users";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<{}>;
  role: string[] | string;
}

const HomePage = React.lazy(() => import("pages/home/HomePage"));
const DealPage = React.lazy(() => import("pages/deal/DealPage"));
const ListPage = React.lazy(() => import("pages/list/ListPage"));
const DealApplyPage = React.lazy(() => import("pages/deal/DealApplyPage"));
const PointChargePage = React.lazy(() => import("pages/point/PointChargePage"));
const PointHistoryPage = React.lazy(() => import("pages/point/PointHistoryPage"));
const MyPage = React.lazy(() => import("pages/mypage/MyPagePage"));
const NoticePage = React.lazy(() => import("pages/center/notice/NoticePage"));
const FAQPage = React.lazy(() => import("pages/center/fqa/FAQPage"));
const ServicePage = React.lazy(() => import("pages/center/service/ServicePage"));

@inject("userStore")
@observer
class App extends React.Component<Props> {
  private UserStore = this.props.userStore! as UserStore;
  PrivateRoute = ({ component: Component, ...other }: PrivateRouteProps) => {
    return (
      <Route
        {...other}
        render={(props: any) => {
          // if (this.state.isLoading) return null;
          if (!this.UserStore.IsLoggedIn) {
            alert("로그인이 필요합니다.");
            return <Redirect to="/" />;
          }

          return <Component {...props} />;
        }}
      />
    );
  };
  render() {
    return (
      <Router>
        <Helmet>
          <title>CASH LINK</title>
        </Helmet>
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* ====================================================================== */}
            {/* 로그인 필요 없음 */}
            {/* ====================================================================== */}
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/callback" component={CallbackPage} />
            <Route exact path="/mypage" component={MyPage} />
            <Route exact path="/center/notice" component={NoticePage} />
            <Route exact path="/center/faq" component={FAQPage} />
            {/* ====================================================================== */}
            {/* 로그인 필요함 */}
            {/* ====================================================================== */}
            <this.PrivateRoute exact path="/deal" role="Login" component={DealPage} />
            <this.PrivateRoute exact path="/deal/send" role="Login" component={DealSendPage} />
            <this.PrivateRoute exact path="/deal/apply" role="Login" component={DealApplyPage} />
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
            <this.PrivateRoute exact path="/keypad/:title" role="Login" component={KeypadPage} />
            <this.PrivateRoute exact path="/center/service" role="Login" component={ServicePage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default withCookies(withRouter(App));
