import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import items from './items/slice';
import types from './types/slice';
import cart from './cart/slice';

export const store = configureStore({
  reducer: {
    items,
    types,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
