import React from "react";
import styled from "styled-components";
import { withCookies, ReactCookieProps } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router";

import Header from "components/common/header";
import Footer from "components/common/footer";
import WebHeader from "components/common/header/web";

interface Props extends ReactCookieProps, RouteComponentProps {
  children?: React.ReactNode;
  seletedItem: string;
  main?: boolean;
  title?: string;
}

class BaseTemplate extends React.Component<Props> {
  render() {
    return (
      <Wrap>
        <Header main={this.props.main} title={this.props.title} />
        <WebHeader title={this.props.title} />
        <Section>
          <div className="content">{this.props.children}</div>
        </Section>
        <Footer seletedItem={this.props.seletedItem} />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      position: absolute;
      top: 52px;
      bottom: 52px;
      left: 16px;
      right: 16px;

      & > .content {
        width: 100%;
        max-width: 720px;

        margin-bottom: 52px;
      }
    ${({ theme }) => theme.media.mobile`
      
    `}
    ${({ theme }) => theme.media.tablet`

    `}
    ${({ theme }) => theme.media.desktop`
        top: 70px;
        bottom: 0px;
    `}
`;

export default withCookies(withRouter(BaseTemplate));
