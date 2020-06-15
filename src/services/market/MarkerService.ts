import qs from "query-string";
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

  public PostPointAPI(data: FormData) {
    return client.post(`/api/markets/charge/cp`, data);
  }

  public PostAcceptAPI(idx: number) {
    return client.post(`/api/markets/${idx}/accept`);
  }

  public GetPurchasesAPI(page: number, status?: string, duration?: string) {
    return client.get(`/api/markets/purchases`, { params: { page, status, duration } });
  }

  // ======================================================================
  // 판매
  // ======================================================================

  // 판매 등록
  public PostSellAPI(type: string, amount: number, price: number, password: string) {
    return client.post(`/api/markets/sell`, {
      type: type,
      amount: amount,
      price: price,
      password,
    });
  }

  public PatchSellAPI(idx: number, type: string, amount: number, price: number, password: string) {
    return client.patch(`/api/markets/${idx}`, {
      type: type,
      amount: amount,
      price: price,
      password,
    });
  }

  // 판매내역
  public GetMySellAPI(page: number, status?: string, duration?: string, query?: string) {
    return client.get(`/api/markets/sell`, { params: { page, status, duration, query } });
  }

  // 구매자 확인
  public GetBuyerAPI(id: number, purId: number) {
    return client.get(`/api/markets/${id}/purchases/${purId}`);
  }

  // 구매 요청 승인
  public PostPurchaseAcceptAPI(id: number, purId: number) {
    return client.post(`/api/markets/${id}/purchases/${purId}/accept`);
  }

  // 판매 취소
  public DeleteMarketAPI(idx: number) {
    return client.delete(`/api/markets/${idx}`);
  }
  // 구매 요펑 거부
  public PostPurchaseDenyAPI(id: number, purId: number, reason: string) {
    return client.post(`/api/markets/${id}/purchases/${purId}/deny`, qs.stringify({ reason }));
  }
  // 거래 완료 처리
  public PostPurchaseDoneAPI(id: number, purId: number) {
    return client.post(`/api/markets/${id}/purchases/${purId}/done`);
  }
  // 구매자 신고
  public PostBuyReportAPI(id: number, purId: number, reason: string) {
    return client.post(`/api/markets/${id}/purchases/${purId}/report`, qs.stringify({ reason }));
  }

  // ======================================================================
  // 구매
  // ======================================================================

  // 구매 내역
  public GetpurchasesAPI(page?: number, status?: string, duration?: string, query?: string) {
    return client.get(`/api/markets/purchases`, {
      params: {
        page,
        status,
        duration,
        query,
      },
    });
  }

  // 구매 요청 취소
  public DeleteBuyCancleAPI(id: number, purId: number) {
    return client.delete(`/api/markets/${id}/purchases/${purId}`);
  }

  // 구매 요청 등록
  public PostBuyApplyAPI(id: number) {
    return client.post(`/api/markets/${id}/buy`);
  }

  // 입금 완료
  public PostPurchaseDepositAPI(id: number, purId: number) {
    return client.post(`/api/markets/${id}/purchases/${purId}/deposit`);
  }
  // 판매자 신고
  public PostSelletReportAPI(id: number, purId: number, reason: string) {
    return client.post(`/api/markets/${id}/purchases/${purId}/report`, qs.stringify({ reason }));
  }
}

export default new MarketService();
