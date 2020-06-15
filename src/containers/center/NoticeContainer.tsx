import React from "react";
import Notice from "components/center/notice";
import NoticeStore from "stores/notice";
import { inject, observer } from "mobx-react";
import parse from "lib/parse";

interface Props {
  noticeStore?: NoticeStore;
}

@inject("noticeStore")
@observer
class NoticeContainer extends React.Component<Props> {
  private NoticeStore = this.props.noticeStore! as NoticeStore;

  // async componentDidMount() {
  //   await this.NoticeStore.GetNoticeList();

  //   if (this.NoticeStore.failure["GET_NOTICE_LIST"][0]) {
  //     const code = parse(this.NoticeStore.failure["GET_NOTICE_LIST"][1]);
  //     alert(code);
  //   }
  // }

  get = async (page: number) => {
    await this.NoticeStore.GetNoticeList(page);

    if (this.NoticeStore.failure["GET_NOTICE_LIST"][0]) {
      const code = parse(this.NoticeStore.failure["GET_NOTICE_LIST"][1]);
      alert(code);
    }
  };

  render() {
    return (
      <Notice notices={this.NoticeStore.NoticeList} paging={this.NoticeStore.Page} get={this.get} />
    );
  }
}

export default NoticeContainer;
