import client from "lib/client";

class MarketService {
  public GetDlListAPI(page: number, order: string, query?: string) {
    return client.get(`/api/markets`, { params: { page, order, query } });
  }

  public GetAverageAPI() {
    return client.get(`/api/markets/info`);
  }

  public GetProductDetailAPI(idx: string) {
    return client.get(`/api/markets/${idx}`);
  }

  public PostSellAPI(data: FormData) {
    return client.post(`/api/markets/sell`, data);
  }

  public GetMySellAPI(page: number) {
    return client.get(`/api/markets/sell`, { params: { page } });
  }

  public PostBuyApplyAPI(id: number) {
    return client.post(`/api/markets/${id}/buy`);
  }
}

export default new MarketService();
