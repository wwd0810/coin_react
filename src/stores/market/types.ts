import { User } from "stores/users/types";

export type Paging = {
  page: number;
  limit: number;
  count: number;
  offset: number;
};

export type Purchase = {
  id: number;
  status: string;
  reason?: string;
  canceled_at?: Date;
  approved_at?: Date;
  created_at?: Date;
  updated_at: Date;
  buyer: User;
};

export type Dealing = {
  id: number;
  quantity: number;
  price: number;
  fees: number;
  status: string;
  isLike: boolean;
  cancled_at: Date;
  approved_at: Date;
  created_at: Date;
  updated_at?: Date;
  seller: User;
  purchase?: Purchase;
};

// 안쓰는거

export type MarketStatus = {
  "market.condition": string;
  "market.buy.user_apply_limit": string;
  "market.condition_lower": string;
  "market.condition_upper": string;
  "market.fees": string;
  "market.sale.step": string;
  "market.sale.min": string;
  "market.sale.user_apply_limit": string;
  "market.sale.max": string;
};
