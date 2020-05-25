export type User = {
  id: number;
  username: string;
  name: string;
  phone: string;
  birth: Date;
  sex: string;
  createdDate: Date;
  modifiedDate: Date;
};

export type Account = {
  id: string;
  user_id: number;
  // balance: number;
  dl: number;
  cp: number;
  createdDate: Date;
  modifiedDate: Date;
};
