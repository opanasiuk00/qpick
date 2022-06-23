import { CartItem, CartSliceState } from './type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: CartSliceState = {
  cartItems: [],
  totalPrice: 0,
  cartLength: 0,
};

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
  },
});

const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => Number(obj.price.replace(/\s/g, '')) * obj.count + sum, 0);
};
export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
