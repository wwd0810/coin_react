export type User = {
  id: number;
  username: string;
  name: string;
  phone: string;
  birth: Date;
  sex: string;
  created_at: Date;
  updated_at?: Date;
};

export enum AccountType {
  COIN_POINT = "COIN_POINT",
  DILLING = "DILLING",
  DILLING_COIN = "DILLING_COIN",
}

export type Account = {
  id: string;
  type: AccountType;
  quantity: number;
  created_at: Date;
  updated_at?: Date;
};

export type UserActivity = {
  like: number;
  sell: number;
  buy: number;
};

export type PointType = {
  id: number;
  title: string;
  description: string;
  amount: string;
  to?: Account;
  from?: Account;
  from_user?: User;
  to_user?: User;
  created_at: Date;
  updated_at?: Date;
};

export type OtherType = {
  unread_noti: boolean;
  check_pin: boolean;
};
