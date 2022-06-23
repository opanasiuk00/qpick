import { createSlice } from '@reduxjs/toolkit';
import { fetchType } from './asyncAction';
import { ItemSliceState, Status } from './types';

const initialState: ItemSliceState = {
  types: [],
  type: '',
  typeName: '',
  status: Status.LOADING,
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setType(state, action) {
      state.type = action.payload;
    },
    setTypeName(state, action) {
      state.typeName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchType.pending, (state) => {
      state.status = Status.LOADING;
      state.types = [];
    });
    builder.addCase(fetchType.fulfilled, (state, action) => {
      state.types = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchType.rejected, (state) => {
      state.status = Status.ERROR;
      state.types = [];
    });
  },
});

export const { setType, setTypeName } = typeSlice.actions;

export default typeSlice.reducer;
