import React from "react";
import Service from "components/center/service/Service";
import NoticeStore from "stores/notice";
import { inject, observer } from "mobx-react";

interface Props {
  noticeStore?: NoticeStore;
}

@inject("noticeStore")
@observer
class ServiceContainer extends React.Component<Props> {
  private NoticeStore = this.props.noticeStore! as NoticeStore;

  async componentDidMount() {
    await this.NoticeStore.GetInquiries();
  }

  post = async (title: string, contents: string) => {
    await this.NoticeStore.PostInquiry(title, contents);

    if (this.NoticeStore.success["POST_INQUIRY"]) {
      await this.NoticeStore.GetInquiries();
    }
  };

  render() {
    return <Service data={this.NoticeStore.Inquiries} post={this.post} />;
  }
}

export default ServiceContainer;
