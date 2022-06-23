import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Type } from './types';

export const fetchType = createAsyncThunk<Type[]>('type/fetchType', async () => {
  const { data } = await axios.get<Type[]>(
    `https://62a9f7673b314385543f63b0.mockapi.io/qpicktypes`,
  );
  return data;
});
