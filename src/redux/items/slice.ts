import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from './asyncActions';
import { ItemSliceState, Status, Items } from './types';

const initialState: ItemSliceState = {
  items: [],
  page: 1,
  pageCount: 1,
  limit: 6,
  type: '',
  typeName: '',
  status: Status.LOADING, // LOADING | SUCCESS | ERROR
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setTypeName(state, action) {
      state.typeName = action.payload;
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
      if (state.pageCount < state.page) {
        state.page = 1;
      }
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setPage, setType, setTypeName } = itemSlice.actions;

export default itemSlice.reducer;
