import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../config';
import axios from 'axios';
const asyncGetMypage = createAsyncThunk(
  'mypageSlice/asyncGetMypage',
  async () => {
    const { data } = await axios.get(API.MYPAGE_GET + 'usercode');
    return data;
  },
);

export default asyncGetMypage;
