export type CartItem = {
  id: string;
  img: string;
  typeName: string;
  title: string;
  price: string;
  count: number;
};

export interface CartSliceState {
  cartItems: CartItem[];
  totalPrice: number;
  cartLength: number;
}
