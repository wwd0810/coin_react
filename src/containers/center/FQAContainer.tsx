import React from "react";
import FQA from "components/center/faq";
import NoticeStore from "stores/notice";
import { inject, observer } from "mobx-react";

interface Props {
  noticeStore?: NoticeStore;
}

@inject("noticeStore")
@observer
class FQAContainer extends React.Component<Props> {
  private NoticeStore = this.props.noticeStore! as NoticeStore;

  async componentDidMount() {
    await this.NoticeStore.GetFAQ();
  }

  render() {
    return <FQA list={this.NoticeStore.FAQList} />;
  }
}

export default FQAContainer;
