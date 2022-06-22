import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import items from './items/slice';

export const store = configureStore({
  reducer: {
    items,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
