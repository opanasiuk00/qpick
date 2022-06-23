export type Type = {
  name: string;
  type: string;
};

export interface ItemSliceState {
  types: Type[];
  type: string;
  typeName: string;
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'sucess',
  ERROR = 'error',
}
