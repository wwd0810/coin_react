import React from "react";
import NoticeStore from "stores/notice";
import { inject, observer } from "mobx-react";
import FaqDetail from "components/center/faq/detail";

interface Props {
  noticeStore?: NoticeStore;
  title: string;
}

@inject("noticeStore")
@observer
class FQADetailContainer extends React.Component<Props> {
  private NoticeStore = this.props.noticeStore! as NoticeStore;

  async componentDidMount() {
    await this.NoticeStore.GetTerm(this.props.title);
  }

  render() {
    return <FaqDetail data={this.NoticeStore.Term} />;
  }
}

export default FQADetailContainer;
