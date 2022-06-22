import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from './asyncActions';
import { ItemSliceState, Status, Item, Items } from './types';

const initialState: ItemSliceState = {
  items: [],
  page: 1,
  pageCount: 1,
  limit: 6,
  type: '',
  status: Status.LOADING, // LOADING | SUCCESS | ERROR
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Items>) {
      state.items = action.payload.items;
      state.pageCount = action.payload.count;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.pageCount = Math.ceil(action.payload.count / state.limit);
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems, setPage, setType } = itemSlice.actions;

export default itemSlice.reducer;
