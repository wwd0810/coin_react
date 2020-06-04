import client from "lib/client";

class NoticeService {
  public GetNoticeListAPI() {
    return client.get(`/api/notices`);
  }

  // status 'NOT_READ', 'READ' 이거 꼭보내야하는지 나중에 판단
  public GetNoticeAPI(page: number, type?: "TRADE" | "WALLET" | "GIFT" | "ETC") {
    return client.get(`/api/users/me/noti`, { params: { page, type } });
  }

  public PostReadAllAPI() {
    return client.post(`/api/users/me/noti/all`);
  }

  public PostReadAPI(id: number) {
    return client.post(`/api/users/me/noti/${id}`);
  }

  public GetUnReadAPI() {
    return client.get(`/api/users/me/noti/unread`);
  }

  public GetFAQListAPI() {
    return client.get(`/api/faq`);
  }

  public GetTermAPI(title: string) {
    return client.get(`/api/infos/terms/${title}`);
  }

  public GetInquiriesAPI() {
    return client.get(`/api/inquiries`);
  }

  public PostInquiryAPI(title: string, contents: string) {
    return client.post(`/api/inquiries`, {
      title: title,
      contents: contents,
    });
  }
}

export default new NoticeService();
