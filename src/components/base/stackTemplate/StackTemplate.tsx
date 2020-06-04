import React from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import StackHeader from "components/common/header/stack";
import WebHeader from "components/common/header/web";

interface Props extends RouteComponentProps, ReactCookieProps {
  title: String;
  children: React.ReactNode;
  inquiry?: boolean;
}

class StackTemplate extends React.Component<Props> {
  onPrevClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.props.history.goBack();
  };

  render() {
    return (
      <Wrap>
        <StackHeader
          title={this.props.title}
          onPrev={this.onPrevClick}
          inquiry={this.props.inquiry}
        />
        <WebHeader title={this.props.title} />
        <div className="content">{this.props.children}</div>
      </Wrap>
    );
  }
}

const Wrap = styled.div`

width: 100%;
display: flex;
justify-content: center;




& > .content {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 52px;
}
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`
& > .content {
  
  padding-top: 70px;
}
`}
`;

export default withCookies(withRouter(StackTemplate));
