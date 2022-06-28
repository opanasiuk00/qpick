import { CartItem, CartSliceState } from './type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => Number(obj.price.replace(/\s/g, '')) * obj.count + sum, 0);
};

const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  return {
    cartItems: items as CartItem[],
    totalPrice,
    cartLength: totalCount || 0,
  };
};

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
        state.cartLength++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
        state.cartLength++;
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    minusCount(state, action: PayloadAction<string>) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.cartLength--;
      }
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.cartItems);
      state.cartLength--;
    },
  },
});

export const { addItem, minusCount, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
