import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { typeItemParams, Items } from './types';

export const fetchItems = createAsyncThunk<Items, typeItemParams>(
  'item/fetchItemStatus',
  async (params) => {
    const { page, type = '' } = params;
    const { data } = await axios.get<Items>(
      `https://62a9f7673b314385543f63b0.mockapi.io/qpick?page=${page}&limit=6&type=${type}`,
    );
    return data;
  },
);
