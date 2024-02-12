import { createSlice } from '@reduxjs/toolkit';
import asyncGetMypage from '../services/mypage/asyncGetMypage';

const mypageSlice = createSlice({
  name: 'mypageSlice',
  initialState: {
    // getMypage()호출로 불러와지는 mypage데이터
    mypageGetData: {},
    // asyncGetMypage() thunk함수에 대한 로딩상태
    mypageGetStatus: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    //asynceGetMypage 비동기 함수로 /user/mypage/usercode로 요청
    builder.addCase(asyncGetMypage.pending, (state, payload) => {
      state.mypageGetStatus = '받는중';
    });
    builder.addCase(asyncGetMypage.fulfilled, (state, { payload }) => {
      state.mypageGetData = payload;
      state.mypageGetStatus = '받아옴';
    });
    builder.addCase(asyncGetMypage.rejected, (state, payload) => {
      state.mypageGetStatus = '실패함';
    });
  },
});
export const { getMypage } = mypageSlice.actions;
export default mypageSlice;
