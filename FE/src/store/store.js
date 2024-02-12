import { configureStore, createSlice } from '@reduxjs/toolkit';

const userCode = createSlice({
  name: 'userCode',
  initialState: 0,
  reducers: {
    changeCode(state, a) {
      return a.payload;
    },
  },
});

export const { changeCode } = userCode.actions;

export default configureStore({
  reducer: {
    userCode: userCode.reducer,
  },
});
