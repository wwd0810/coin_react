import client from "lib/client";

class NoticeService {
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
}

export default new NoticeService();
