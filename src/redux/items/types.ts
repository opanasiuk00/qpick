export type Item = {
  id: string;
  title: string;
  img: string;
  price: number;
  type: string;
};
export type Items = {
  items: Item[];
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'sucess',
  ERROR = 'error',
}

export interface ItemSliceState {
  items: Item[];
  status: Status;
  page: number;
  type: string;
  limit: number;
  pageCount: number;
}

export type typeItemParams = {
  type: string;
  page: number;
};
